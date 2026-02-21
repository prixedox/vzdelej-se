export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  if (count === 1) return one;
  if (count >= 2 && count <= 4) return few;
  return many;
}

// Example: pluralizeLessons(1) => "1 lekce", pluralizeLessons(3) => "3 lekce", pluralizeLessons(5) => "5 lekcí"
export function pluralizeLessons(count: number): string {
  return `${count} ${pluralize(count, "lekce", "lekce", "lekcí")}`;
}

export function pluralizeDays(count: number): string {
  return `${count} ${pluralize(count, "den", "dny", "dní")}`;
}

export function pluralizePoints(count: number): string {
  return `${count} ${pluralize(count, "bod", "body", "bodů")}`;
}
