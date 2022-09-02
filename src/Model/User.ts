import { TGender } from '../context/addCharacter';

class User {
  private profile: string;
  private gender: TGender;
  private username: string;
  private name: string;
  private lastname: string;
  private email: string;
  private birthday: Date;

  constructor(
    private readonly uid: string,
    profile?: string | null,
    gender?: TGender | null,
    username?: string | null,
    name?: string | null,
    lastname?: string | null,
    email?: string | null,
    birthday?: Date | null
  ) {
    if (profile) this.profile = profile;
    else this.profile = '';

    if (gender) this.gender = gender;
    else this.gender = 'O';

    if (username) this.username = username;
    else this.username = '';

    if (name) this.name = name;
    else this.name = '';

    if (lastname) this.lastname = lastname;
    else this.lastname = '';

    if (email) this.email = email;
    else this.email = '';

    if (birthday) this.birthday = birthday;
    else this.birthday = new Date();
  }

  public getUid(): string {
    return this.uid;
  }

  public getProfile(): string {
    return this.profile;
  }

  public setProfile(profile: string) {
    this.profile = profile;
  }

  public getGender(): TGender {
    return this.gender;
  }

  public setGender(gender: TGender) {
    this.gender = gender;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public setLastname(lastname: string) {
    this.lastname = lastname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getBirthday(): Date {
    return this.birthday;
  }

  public setBirthday(birthday: Date) {
    this.birthday = birthday;
  }

  public getStorageDataServer() {
    return {
      uid: this.uid,
      username: this.username,
      birthday: this.birthday,
      lastname: this.lastname,
      gender: this.gender,
    };
  }

  public validation(server?: boolean): boolean {
    return !server
      ? !!this.username && !!this.name && !!this.email && !!this.birthday
      : !!this.username && !!this.birthday && !!this.gender;
  }
}

export default User;
