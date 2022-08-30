class Constants {
  private themeId = '@theme_key';
  private themeLightId = 'light';
  private themeDarkId = 'dark';
  private personaDraftId = '@id_persona_draft';

  private constructor() {}

  public getThemeId() {
    return this.themeId;
  }

  public getThemeLightId() {
    return this.themeLightId;
  }

  public getThemeDarkId() {
    return this.themeDarkId;
  }

  public static getInstance() {
    return new Constants();
  }

  public getPersonDraftId() {
    return this.personaDraftId;
  }
}

export default Constants.getInstance();
