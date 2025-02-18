export function groupBy<T>(input: T[], keyGetter: (item: T) => string) {
  return input.reduce<Record<string, T[]>>((acc, curr) => {
    const key = keyGetter(curr);
    const group = acc[key] || [];
    group.push(curr);
    return { ...acc, [key]: group };
  }, {});
}
