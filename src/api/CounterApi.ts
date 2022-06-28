export const fetchCount = (amount: number) => {
  return new Promise<number>((resolve) =>
    setTimeout(() => resolve(amount), 2000)
  );
};
