class Constants {
  private themeId = '@theme_key';
  private themeLightId = 'light';
  private themeDarkId = 'dark';

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
}

export default Constants.getInstance();
