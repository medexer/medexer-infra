export function toLowerCaseTransformer(value: string): string {
  return value ? value.toLowerCase() : value;
}

export function trimTransformer(value: string): string {
  return value ? value.trim() : value;
}

export function capitalizeTransformer(value: string): string {
  return trimTransformer(value)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
