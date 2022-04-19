class MyURLSearchParams {
  public urlSearchParams = new Map();

  constructor(input: string) {
    this.init(input);
  }

  init(searchBody: string) {
    const { urlSearchParams } = this;
    searchBody = searchBody.startsWith('?') ? searchBody.slice(1) : searchBody;

    const searchItems = searchBody.split('&');

    for (let item of searchItems) {
      const [key, value] = item.split('=');

      if (!urlSearchParams.has(key)) {
        urlSearchParams.set(key, []);
      }

      urlSearchParams.get(key).push(value);
    }
  }

  get(key: string) {
    if (this.urlSearchParams.has(key)) {
      return this.urlSearchParams.get(key)[0];
    }
    return null;
  }

  getAll(key: string) {
    return this.urlSearchParams.get(key) || [];
  }

  append(key: string, value: number | string) {
    const stringifyValue = `${value}`;

    if (this.urlSearchParams.has(key)) {
      this.urlSearchParams.get(key).push(stringifyValue);
    } else {
      this.urlSearchParams.set(key, [stringifyValue]);
    }
  }

  toString() {
    let result = [];

    for (let [key, values] of this.urlSearchParams.entries()) {
      for (let value of values) {
        result.push(`${key}=${value}`);
      }
    }

    return result.join('&');
  }

  delete(key: string) {
    this.urlSearchParams.delete(key);
  }

  entries() {
    let result = [];
    for (let [key, values] of this.urlSearchParams.entries()) {
      values.forEach(value => result.push([key, value]));
    }
    return createIteratorFromArray(result);
  }

  forEach(fn) {
    for (let [k, v] of this.urlSearchParams.entries()) {
      v.forEach(singleV => fn(singleV, k));
    }
  }

  has(key: string) {
    return this.urlSearchParams.has(key);
  }

  keys() {
    return this.urlSearchParams.keys();
  }

  set(key: string, value: string) {
    this.urlSearchParams.set(key, [`${value}`]);
  }

  sort() {
    this.urlSearchParams = new Map([...this.urlSearchParams].sort());
  }

  values() {
    return [...this.urlSearchParams.values()].reduce((acc, cur) => [
      ...acc,
      ...cur,
    ]);
  }
}

function* createIteratorFromArray<T = any>(arr: Array<T>): Iterator<T> {
  for (let v of arr) {
    yield v;
  }
}
