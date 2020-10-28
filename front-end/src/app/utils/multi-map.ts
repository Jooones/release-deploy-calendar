export interface MultiMapKey {
  toString(): string;
}

export class MultiMap<K extends MultiMapKey, V> {

  private readonly keyParser: (keyAsString: string) => K;
  private readonly valuesByKey: Map<string, V[]> = new Map<string, V[]>();

  constructor(keyParser: (keyAsString: string) => K) {
    this.keyParser = keyParser;
  }

  add(key: K, value: V): void {
    const keyAsString = key.toString();
    if (!this.valuesByKey.has(keyAsString)) {
      this.valuesByKey.set(keyAsString, []);
    }
    this.valuesByKey.get(keyAsString).push(value);
  }

  get(key: K): V[] {
    const keyAsString = key.toString();
    return this.valuesByKey.get(keyAsString) || [];
  }

  forEach(consumer: (key: K, value: V[]) => void): void {
    return this.valuesByKey.forEach((value: V[], keyAsString: string) => {
      const key = this.keyParser(keyAsString);
      consumer(key, value);
    });
  }
}
