let a: number = 2;
let b: number = 3;
let next: number = a + b;
var noFibonacciNumbers: Array<number> = new Array();

export const getNoFibonacciNumber = (n: number): number => {
  while (noFibonacciNumbers.length < n) {
    IsFibonacciNumber(next, b + 1);
    a = b;
    b = next;
    next = a + b;
  }

  return noFibonacciNumbers[n - 1];
};

function IsFibonacciNumber(next: number, verifier: number): void {
  while (next !== verifier) {
    noFibonacciNumbers.push(verifier);
    verifier++;
  }
}
