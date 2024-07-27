import { z } from "zod";

export const pageSizeDefaults = [10, 25, 50];

export const paginationDefaults = {
  page: 0,
  pageSize: pageSizeDefaults[0],
};

export const paginateSchema = z.object({
  page: z.number().int().min(0),
  pageSize: z.number().int().min(1),
});

export type Paginate = z.infer<typeof paginateSchema>;

export function paginateToLimitAndOffset(paginate: Paginate) {
  const limit = paginate.pageSize;
  const offset = paginate.page * paginate.pageSize;
  return { limit, offset };
}

export type Paginated<T> = {
  records: T[];
  total: number;
};
export function toPaginated<T>(records: T[], total: number): Paginated<T> {
  return {
    records: records,
    total: total,
  };
}
