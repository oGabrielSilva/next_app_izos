import { v4 as uuid } from 'uuid';

class CharacterDetail {
  constructor(
    private detail: string,
    private value: string,
    private readonly key: string = uuid()
  ) {}

  public getKey(): string {
    return this.key;
  }

  public getDetail(): string {
    return this.detail;
  }

  public setDetail(detail: string) {
    this.detail = detail;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public static insert(arr: CharacterDetail[], index: number, newItem: CharacterDetail) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
  }
}

export default CharacterDetail;
