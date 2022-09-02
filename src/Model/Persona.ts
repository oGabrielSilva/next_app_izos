import { v4 as uuid } from 'uuid';
import type { TGender } from '../context/addCharacter';
import CharacterData from './CharacterData';

class Persona {
  private readonly id: string;
  private readonly userUid: string | null;

  constructor(
    private profile: string | null,
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

  public getProfile(): string | null {
    return this.profile;
  }

  public setProfile(profile: string): void {
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

  public onlyData() {
    const { name, title, details, gender, history, origin, presentation, id, userUid } = this;
    return { name, title, details, gender, history, origin, presentation, id, userUid };
  }

  public isValid() {
    return (
      !!this.profile &&
      !!this.profile &&
      !!this.name &&
      !!this.title &&
      ['F', 'M', 'O'].includes(this.gender) &&
      !!this.presentation &&
      !!this.origin &&
      !!this.details &&
      !!this.history &&
      !!this.id &&
      !!this.userUid
    );
  }
}

export default Persona;
