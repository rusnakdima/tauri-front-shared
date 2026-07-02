export type CompareFn<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function quickSort<T>(arr: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  if (arr.length <= 1) {
    return arr.slice();
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => compareFn(x, pivot) < 0);
  const middle = arr.filter((x) => compareFn(x, pivot) === 0);
  const right = arr.filter((x) => compareFn(x, pivot) > 0);
  return [...quickSort(left, compareFn), ...middle, ...quickSort(right, compareFn)];
}

export function mergeSort<T>(arr: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  if (arr.length <= 1) {
    return arr.slice();
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);
  return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn: CompareFn<T>): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}

export function bubbleSort<T>(arr: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  const result = arr.slice();
  const n = result.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compareFn(result[j], result[j + 1]) > 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  return result;
}

export function insertionSort<T>(arr: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  const result = arr.slice();
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i;
    while (j > 0 && compareFn(result[j - 1], key) > 0) {
      result[j] = result[j - 1];
      j--;
    }
    result[j] = key;
  }
  return result;
}
