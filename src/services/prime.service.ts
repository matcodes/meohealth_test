export const isPrime = (numStr: string): boolean => {
  const num = BigInt(numStr);
  if (num <= 1n) return false;
  if (num === 2n) return true;
  if (num % 2n === 0n) return false;

  const limit = BigInt(Math.sqrt(Number(num))) + 1n;
  for (let i = 3n; i <= limit; i += 2n) {
    if (num % i === 0n) return false;
  }
  return true;
};
