"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { getCurrentUserId } from "@/common/utils/auth";
import { db, DBTransaction } from "@/db/db";
import { transactionCategories, transactions, wallets } from "@/db/schemas/accounting";
import { TransactionCategoryCreateForm } from "@/modules/accounting/schemas/transaction-category-create-form-schema";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { TransactionUpdateForm } from "@/modules/accounting/schemas/transaction-update-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { WalletUpdateForm } from "@/modules/accounting/schemas/wallet-update-form-schema";
import { Decimal } from "decimal.js";
import { and, between, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { DateRange } from "react-day-picker";

export async function walletsCreate(wallet: WalletCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(wallets).values({
    userId,
    name: wallet.name,
    initialAmount: (wallet.initialAmount ?? 0).toString(),
    amount: (wallet.initialAmount ?? 0).toString(),
  });
}

export async function walletsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.wallets.findMany({
    where: eq(wallets.userId, userId),
    orderBy: [desc(wallets.amount)],
  });
}

export async function walletsGetById(id: string) {
  const userId = await getCurrentUserId();
  const record = await db.query.wallets.findFirst({
    where: and(eq(wallets.userId, userId), eq(wallets.id, id)),
  });

  if (!record) {
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  return record;
}

export async function walletsUpdate(wallet: WalletUpdateForm) {
  await db
    .update(wallets)
    .set({
      name: wallet.name,
    })
    .where(eq(wallets.id, wallet.id));
}

export async function walletsUpdateAmount(
  tx: DBTransaction,
  params: {
    walletId: string;
    add?: Decimal;
    sub?: Decimal;
  },
) {
  const wallet = await tx.query.wallets.findFirst({
    columns: {
      id: true,
      amount: true,
    },
    where: eq(wallets.id, params.walletId),
  });
  if (!wallet) {
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  const amount = new Decimal(wallet.amount)
    .add(params.add ?? 0)
    .sub(params.sub ?? 0)
    .toString();

  await tx.update(wallets).set({ amount }).where(eq(wallets.id, params.walletId));
}

export async function transactionCategoriesCreate(category: TransactionCategoryCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(transactionCategories).values({
    userId,
    name: category.name,
  });
}

export async function transactionCategoriesGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.transactionCategories.findMany({
    where: eq(transactionCategories.userId, userId),
    orderBy: [transactionCategories.name],
  });
}

export async function transactionCategoriesGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = await countTotalTransactionCategories(params);
  const records = await db.query.transactionCategories.findMany({
    where: and(
      eq(transactionCategories.userId, userId),
      params.searchFilter
        ? ilike(transactionCategories.name, `%${params.searchFilter}%`)
        : undefined,
    ),
    limit,
    offset,
    orderBy: [transactionCategories.name],
  });

  return toPaginated(records, total);
}

export async function transactionsCreate(transaction: TransactionCreateForm) {
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    await tx.insert(transactions).values({
      userId,
      datetime: transaction.datetime,
      fromWalletId: transaction.fromWalletId,
      toWalletId: transaction.toWalletId,
      categoryId: transaction.categoryId,
      placeId: transaction.placeId,
      amount: transaction.amount.toString(),
      description: transaction.description,
    });

    if (transaction.fromWalletId) {
      await walletsUpdateAmount(tx, {
        walletId: transaction.fromWalletId,
        sub: new Decimal(transaction.amount),
      });
    }

    if (transaction.toWalletId) {
      await walletsUpdateAmount(tx, {
        walletId: transaction.toWalletId,
        add: new Decimal(transaction.amount),
      });
    }
  });
}

export async function transactionsGetAll(
  params: { walletId?: string; dateRange?: DateRange } = {},
) {
  const userId = await getCurrentUserId();
  return await db.query.transactions.findMany({
    with: {
      category: true,
      from: true,
      to: true,
      place: {
        with: {
          category: true,
        },
      },
      tags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(
      eq(transactions.userId, userId),
      params.walletId
        ? or(
            eq(transactions.fromWalletId, params.walletId),
            eq(transactions.toWalletId, params.walletId),
          )
        : undefined,
      params.dateRange?.from && params.dateRange.to
        ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
        : undefined,
    ),
    orderBy: [transactions.datetime],
  });
}

export async function transactionsGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
  dateRange?: DateRange;
  walletId?: string;
  placeId?: string;
  categoryId?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = await countTotalTransactions(params);
  const records = await db.query.transactions.findMany({
    with: {
      category: true,
      from: true,
      to: true,
      place: {
        with: {
          category: true,
        },
      },
      tags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(
      eq(transactions.userId, userId),
      params.searchFilter ? ilike(transactions.description, `%${params.searchFilter}%`) : undefined,
      params.dateRange?.from && params.dateRange.to
        ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
        : undefined,
      params.walletId
        ? or(
            eq(transactions.fromWalletId, params.walletId),
            eq(transactions.toWalletId, params.walletId),
          )
        : undefined,
      params.placeId ? eq(transactions.placeId, params.placeId) : undefined,
      params.categoryId ? eq(transactions.categoryId, params.categoryId) : undefined,
    ),
    limit,
    offset,
    orderBy: [desc(transactions.datetime)],
  });

  return toPaginated(records, total);
}

export async function transactionsGetById(id: string) {
  const userId = await getCurrentUserId();
  const record = await db.query.transactions.findFirst({
    with: {
      category: true,
      from: true,
      to: true,
      place: {
        with: {
          category: true,
        },
      },
      tags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(eq(transactions.userId, userId), eq(transactions.id, id)),
  });

  if (!record) {
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  return record;
}

export async function transactionsGetByIdsMap(ids: string[]) {
  const userId = await getCurrentUserId();
  const records = await db.query.transactions.findMany({
    with: {
      category: true,
      from: true,
      to: true,
      place: {
        with: {
          category: true,
        },
      },
      tags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(
      eq(transactions.userId, userId),
      ids.length ? inArray(transactions.id, ids) : undefined,
    ),
  });

  return new Map(records.map((record) => [record.id, record]));
}

export async function transactionsUpdate(transaction: TransactionUpdateForm) {
  const transactionId = transaction.id;
  const transactionAmount = new Decimal(transaction.amount);

  const existingTransaction = await transactionsGetById(transactionId);
  const existingTransactionAmount = new Decimal(existingTransaction.amount);

  await db.transaction(async (tx) => {
    await tx
      .update(transactions)
      .set({
        datetime: transaction.datetime,
        categoryId: transaction.categoryId,
        placeId: transaction.placeId,
        amount: transaction.amount.toString(),
        description: transaction.description,
      })
      .where(eq(transactions.id, transactionId));

    if (!existingTransactionAmount.equals(transactionAmount)) {
      if (existingTransaction.fromWalletId) {
        await walletsUpdateAmount(tx, {
          walletId: existingTransaction.fromWalletId,
          add: existingTransactionAmount,
          sub: transactionAmount,
        });
      }
      if (existingTransaction.toWalletId) {
        await walletsUpdateAmount(tx, {
          walletId: existingTransaction.toWalletId,
          add: transactionAmount,
          sub: existingTransactionAmount,
        });
      }
    }
  });
}

export async function transactionsDelete(id: string) {
  const transaction = await transactionsGetById(id);

  await db.transaction(async (tx) => {
    if (transaction.fromWalletId) {
      const wallet = await walletsGetById(transaction.fromWalletId);
      const walletAmount = new Decimal(wallet.amount);
      const amountToUpdate = walletAmount.add(transaction.amount);
      await tx
        .update(wallets)
        .set({ amount: amountToUpdate.toString() })
        .where(eq(wallets.id, wallet.id));
    }

    if (transaction.toWalletId) {
      const wallet = await walletsGetById(transaction.toWalletId);
      const walletAmount = new Decimal(wallet.amount);
      const amountToUpdate = walletAmount.sub(transaction.amount);
      await tx
        .update(wallets)
        .set({ amount: amountToUpdate.toString() })
        .where(eq(wallets.id, wallet.id));
    }

    await tx.delete(transactions).where(eq(transactions.id, id));
  });
}

async function countTotalTransactionCategories(params: { searchFilter?: string }) {
  const userId = await getCurrentUserId();
  return (
    await db
      .select({ id: transactionCategories.id })
      .from(transactionCategories)
      .where(
        and(
          eq(transactionCategories.userId, userId),
          params.searchFilter
            ? ilike(transactionCategories.name, `%${params.searchFilter}%`)
            : undefined,
        ),
      )
  ).length;
}

async function countTotalTransactions(params: {
  searchFilter?: string;
  dateRange?: DateRange;
  walletId?: string;
  placeId?: string;
  categoryId?: string;
}) {
  return (
    await db
      .select({ id: transactions.id })
      .from(transactions)
      .where(
        and(
          params.searchFilter
            ? ilike(transactions.description, `%${params.searchFilter}%`)
            : undefined,
          params.dateRange?.from && params.dateRange.to
            ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
            : undefined,
          params.walletId
            ? or(
                eq(transactions.fromWalletId, params.walletId),
                eq(transactions.toWalletId, params.walletId),
              )
            : undefined,
          params.placeId ? eq(transactions.placeId, params.placeId) : undefined,
          params.categoryId ? eq(transactions.categoryId, params.categoryId) : undefined,
        ),
      )
  ).length;
}
