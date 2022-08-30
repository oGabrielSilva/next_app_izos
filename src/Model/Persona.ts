import { v4 as uuid } from 'uuid';
import type { TGender } from '../context/addCharacter';
import CharacterData from './CharacterData';

class Persona {
  private readonly id: string;
  private readonly userUid: string | null;

  constructor(
    private profile: string | ArrayBuffer | Blob | null,
    private name: string,
    private title: string,
    private gender: TGender,
    private presentation: string,
    private origin: string,
    private details: CharacterData[],
    private history: CharacterData[],
    id: string | null,
    userUid?: string
  ) {
    if (id) this.id = id;
    else this.id = uuid();
    this.userUid = userUid || null;
  }

  public getProfile(): string | ArrayBuffer | Blob | null {
    return this.profile;
  }

  public setProfile(profile: Blob): void {
    this.profile = profile;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getGender(): TGender {
    return this.gender;
  }

  public setGender(gender: TGender): void {
    this.gender = gender;
  }

  public getPresentation(): string {
    return this.presentation;
  }

  public setPresentation(presentation: string): void {
    this.presentation = presentation;
  }

  public getOrigin(): string {
    return this.origin;
  }

  public setOrigin(origin: string): void {
    this.origin = origin;
  }

  public getDetails(): CharacterData[] {
    return this.details;
  }

  public setDetails(details: CharacterData[]): void {
    this.details = details;
  }

  public getHistory(): CharacterData[] {
    return this.history;
  }

  public setHistory(history: CharacterData[]): void {
    this.history = history;
  }

  public getId(): string {
    return this.id;
  }

  public getUserUid(): string | null {
    return this.userUid;
  }

  public validation() {
    return !this.profile
      ? false
      : typeof this.name !== 'string'
      ? false
      : typeof this.title !== 'string'
      ? false
      : !['F', 'M', 'O'].includes(this.gender)
      ? false
      : typeof this.presentation !== 'string'
      ? false
      : typeof origin !== 'string'
      ? false
      : this.details.constructor.name !== 'Array'
      ? false
      : this.history.constructor.name !== 'Array'
      ? false
      : typeof this.id !== 'string'
      ? false
      : typeof this.userUid !== 'string'
      ? false
      : true;
  }
}

export default Persona;
