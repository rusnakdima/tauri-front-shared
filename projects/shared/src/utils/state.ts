import { BehaviorSubject, Observable, distinctUntilChanged, map } from "rxjs";

export type Signal<T> = {
  (): T;
  set(value: T): void;
  update(fn: (prev: T) => T): void;
};

export function createState<T>(initialValue: T): Signal<T> {
  const subject = new BehaviorSubject<T>(initialValue);
  const signalFn = (): T => subject.getValue();
  signalFn.set = (value: T): void => subject.next(value);
  signalFn.update = (fn: (prev: T) => T): void =>
    subject.next(fn(subject.getValue()));
  return signalFn as Signal<T>;
}

export function createStateSubject<T>(initialValue: T): {
  state$: Observable<T>;
  set: (value: T) => void;
  update: (fn: (prev: T) => T) => void;
} {
  const subject = new BehaviorSubject<T>(initialValue);
  return {
    state$: subject.asObservable(),
    set: (value: T) => subject.next(value),
    update: (fn: (prev: T) => T) => subject.next(fn(subject.getValue())),
  };
}

export function createDerivedState<T, R>(
  state$: Observable<T>,
  derive: (state: T) => R,
): Observable<R> {
  return state$.pipe(
    map((state) => derive(state)),
    distinctUntilChanged(),
  );
}
