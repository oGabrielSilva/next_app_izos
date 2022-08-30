import { v4 as uuid } from 'uuid';

class CharacterData {
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

  public static onChangeDetail(
    text: string,
    key: string,
    position: number,
    details: CharacterData[],
    set: (value: CharacterData[]) => void
  ) {
    const detail = details.find((value) => value.getKey() === key);
    if (detail !== undefined) {
      const list = details.filter((value) => value.getKey() !== key);
      detail.setDetail(text);
      const newList = CharacterData.insert(list, position, detail);
      set([...newList]);
    }
  }

  public static onChangeValue(
    text: string,
    key: string,
    position: number,
    details: CharacterData[],
    set: (value: CharacterData[]) => void
  ) {
    const detail = details.find((value) => value.getKey() === key);
    if (detail !== undefined) {
      const list = details.filter((value) => value.getKey() !== key);
      detail.setValue(text);
      const newList = CharacterData.insert(list, position, detail);
      set([...newList]);
    }
  }

  public static onDelete(
    key: string,
    details: CharacterData[],
    set: (value: CharacterData[]) => void
  ) {
    const newList = details.filter((value) => value.getKey() !== key);
    set([...newList]);
  }

  public static insert(arr: CharacterData[], index: number, newItem: CharacterData) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
  }
}

export default CharacterData;
