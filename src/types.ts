export type OptionalPick<T, K extends keyof T> = Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Partial<T> &
  Required<OptionalPick<T, K>>;
