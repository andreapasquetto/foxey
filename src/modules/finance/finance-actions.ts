"use server";

import { Decimal } from "decimal.js";
import { and, between, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { z } from "zod";
import {
  type Paginate,
  paginateToLimitAndOffset,
  toPaginated,
} from "@/common/pagination";
import {
  financeRoute,
  transactionCategoriesRoute,
  transactionsRoute,
} from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { type DBTransaction, db } from "@/db/db";
import {
  tags,
  transactionCategories,
  transactions,
  transactionTemplates,
  wallets,
} from "@/db/schemas/finance";
import type { CreateTransactionCategoryFormType } from "@/modules/finance/schemas/create-transaction-category-form-schema";
import type { CreateTransactionFormType } from "@/modules/finance/schemas/create-transaction-form-schema";
import type { CreateTransactionTemplateFormType } from "@/modules/finance/schemas/create-transaction-template-form-schema";
import type { CreateWalletFormType } from "@/modules/finance/schemas/create-wallet-form-schema";
import type { UpdateTransactionFormType } from "@/modules/finance/schemas/update-transaction-form-schema";
import type { UpdateWalletFormType } from "@/modules/finance/schemas/update-wallet-form-schema";

export async function walletsCreate(wallet: CreateWalletFormType) {
  const userId = await getCurrentUserId();
  await db.insert(wallets).values({
    userId,
    name: wallet.name,
    initialAmount: (wallet.initialAmount ?? 0).toString(),
    amount: (wallet.initialAmount ?? 0).toString(),
  });
  revalidatePath(financeRoute);
  redirect(financeRoute);
}

export async function walletsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.wallets.findMany({
    where: eq(wallets.userId, userId),
    orderBy: [wallets.isArchived, desc(wallets.amount)],
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

export async function walletsAarchive(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(wallets)
    .set({ isArchived: true })
    .where(and(eq(wallets.userId, userId), eq(wallets.id, id)));
  revalidatePath(financeRoute);
}

export async function walletsUnarchive(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(wallets)
    .set({ isArchived: false })
    .where(and(eq(wallets.userId, userId), eq(wallets.id, id)));
  revalidatePath(financeRoute);
}

export async function walletsUpdate(wallet: UpdateWalletFormType) {
  await db
    .update(wallets)
    .set({
      name: wallet.name,
      isArchived: wallet.isArchived,
    })
    .where(eq(wallets.id, wallet.id));
  revalidatePath(financeRoute);
  redirect(financeRoute);
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

  await tx
    .update(wallets)
    .set({ amount })
    .where(eq(wallets.id, params.walletId));
}

export async function transactionCategoriesCreate(
  category: CreateTransactionCategoryFormType,
) {
  const userId = await getCurrentUserId();
  await db.insert(transactionCategories).values({
    userId,
    name: category.name,
  });
  revalidatePath(transactionCategoriesRoute);
  redirect(transactionCategoriesRoute);
}

export async function transactionCategoriesGetPaginated(params: {
  paginate: Paginate;
  query?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = (
    await db
      .select({ id: transactionCategories.id })
      .from(transactionCategories)
      .where(
        and(
          eq(transactionCategories.userId, userId),
          params.query
            ? ilike(transactionCategories.name, `%${params.query}%`)
            : undefined,
        ),
      )
  ).length;
  const records = await db.query.transactionCategories.findMany({
    limit,
    offset,
    where: and(
      eq(transactionCategories.userId, userId),
      params.query
        ? ilike(transactionCategories.name, `%${params.query}%`)
        : undefined,
    ),
    orderBy: [transactionCategories.name],
  });
  return toPaginated(records, total);
}
export async function transactionCategoriesGetAll(
  params: { query?: string } = {},
) {
  const userId = await getCurrentUserId();
  return await db.query.transactionCategories.findMany({
    where: and(
      eq(transactionCategories.userId, userId),
      params.query
        ? ilike(transactionCategories.name, `%${params.query}%`)
        : undefined,
    ),
    orderBy: [transactionCategories.name],
  });
}

export async function transactionTemplatesCreate(
  template: CreateTransactionTemplateFormType,
) {
  const userId = await getCurrentUserId();
  await db.insert(transactionTemplates).values({
    userId,
    name: template.name,
    fromWalletId: template.fromWalletId,
    toWalletId: template.toWalletId,
    categoryId: template.categoryId,
    placeId: template.placeId,
    amount: template.amount?.toString(),
  });
  revalidatePath(transactionsRoute);
  redirect(transactionsRoute);
}

export async function transactionTemplatesGetPaginated(params: {
  paginate: Paginate;
  query?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = (
    await db
      .select({ id: transactionTemplates.id })
      .from(transactionTemplates)
      .where(
        and(
          eq(transactionTemplates.userId, userId),
          params.query
            ? ilike(transactionTemplates.name, `%${params.query}%`)
            : undefined,
        ),
      )
  ).length;
  const records = await db.query.transactionTemplates.findMany({
    limit,
    offset,
    columns: {
      categoryId: false,
      fromWalletId: false,
      toWalletId: false,
      placeId: false,
    },
    with: {
      category: true,
      from: true,
      place: {
        columns: {
          categoryId: false,
        },
        with: {
          category: true,
        },
      },
      to: true,
    },
    where: and(
      eq(transactionTemplates.userId, userId),
      params.query
        ? ilike(transactionTemplates.name, `%${params.query}%`)
        : undefined,
    ),
    orderBy: [transactionTemplates.name],
  });
  return toPaginated(records, total);
}

export async function transactionTemplatesGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.transactionTemplates.findMany({
    columns: {
      categoryId: false,
      fromWalletId: false,
      toWalletId: false,
      placeId: false,
    },
    with: {
      category: true,
      from: true,
      place: {
        columns: {
          categoryId: false,
        },
        with: {
          category: true,
        },
      },
      to: true,
    },
    where: and(eq(transactionCategories.userId, userId)),
    orderBy: [transactionTemplates.name],
  });
}

export async function tagsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.tags.findMany({
    with: {
      transactionTags: {
        with: {
          transaction: true,
        },
      },
    },
    where: eq(tags.userId, userId),
  });
}

export async function transactionsCreate(
  transaction: CreateTransactionFormType,
) {
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
  revalidatePath(financeRoute);
  redirect(financeRoute);
}

export async function transactionsGetLatest() {
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
    where: eq(transactions.userId, userId),
    orderBy: [desc(transactions.datetime)],
    limit: 5,
  });
}

export async function transactionsGetPaginated(params: {
  paginate: Paginate;
  query?: string;
  categoryId?: string;
  walletId?: string;
  placeId?: string;
  dateRange?: DateRange;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);

  const total = (
    await db
      .select({ id: transactions.id })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          params.query
            ? ilike(transactions.description, `%${params.query}%`)
            : undefined,
          params.categoryId
            ? eq(transactions.categoryId, params.categoryId)
            : undefined,
          params.walletId
            ? or(
                eq(transactions.fromWalletId, params.walletId),
                eq(transactions.toWalletId, params.walletId),
              )
            : undefined,
          params.placeId ? eq(transactions.placeId, params.placeId) : undefined,
          params.dateRange
            ? between(
                transactions.datetime,
                params.dateRange.from!,
                params.dateRange.to!,
              )
            : undefined,
        ),
      )
  ).length;

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
    limit,
    offset,
    where: and(
      eq(transactions.userId, userId),
      params.query
        ? ilike(transactions.description, `%${params.query}%`)
        : undefined,
      params.categoryId
        ? eq(transactions.categoryId, params.categoryId)
        : undefined,
      params.walletId
        ? or(
            eq(transactions.fromWalletId, params.walletId),
            eq(transactions.toWalletId, params.walletId),
          )
        : undefined,
      params.placeId ? eq(transactions.placeId, params.placeId) : undefined,
      params.dateRange
        ? between(
            transactions.datetime,
            params.dateRange.from!,
            params.dateRange.to!,
          )
        : undefined,
    ),
    orderBy: [desc(transactions.datetime)],
  });

  return toPaginated(records, total);
}

export async function transactionsGetAll(
  params: {
    query?: string;
    categoryId?: string;
    walletId?: string;
    placeId?: string;
  } = {},
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
      params.query
        ? ilike(transactions.description, `%${params.query}%`)
        : undefined,
      params.categoryId
        ? eq(transactions.categoryId, params.categoryId)
        : undefined,
      params.walletId
        ? or(
            eq(transactions.fromWalletId, params.walletId),
            eq(transactions.toWalletId, params.walletId),
          )
        : undefined,
      params.placeId ? eq(transactions.placeId, params.placeId) : undefined,
    ),
    orderBy: [transactions.datetime],
  });
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

export async function transactionsUpdate(
  transaction: UpdateTransactionFormType,
) {
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
  revalidatePath(financeRoute);
  revalidatePath(transactionsRoute);
  redirect(transactionsRoute);
}

export async function transactionsDelete(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
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
  revalidatePath(financeRoute);
}
