import crypto from "crypto";

/**
 * Performs modular exponentiation.
 * Returns (base^exponent) % modulus.
 */
function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  return result;
}

/**
 * Generates a random BigInt in the inclusive range [min, max].
 */
function randomBigIntBetween(min: bigint, max: bigint): bigint {
  const range = max - min + 1n;
  const bits = range.toString(2).length;
  const bytes = Math.ceil(bits / 8);
  let random: bigint;
  do {
    const buf = crypto.randomBytes(bytes);
    random = BigInt("0x" + buf.toString("hex"));
  } while (random >= range);
  return min + random;
}

/**
 * Checks whether the given BigInt n is prime using the Miller–Rabin algorithm.
 * @param n - The number to test for primality.
 * @param k - The number of testing rounds (default is 5).
 * @returns true if n is probably prime, false otherwise.
 */
export function isPrime(n: bigint, k: number = 5): boolean {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  // Write n - 1 as 2^r * d.
  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  // Miller–Rabin witness loop.
  witnessLoop: for (let i = 0; i < k; i++) {
    const a = randomBigIntBetween(2n, n - 2n);
    let x = modPow(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    for (let j = 0n; j < r - 1n; j++) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) continue witnessLoop;
    }
    return false;
  }
  return true;
}
