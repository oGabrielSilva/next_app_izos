import Constants from '../utils/Constants';

export type TColors = {
  bg: string;
  bgLight: string;
  textTitle: string;
  textOnVariant: string;
  text: string;
  variant: string;

  mode: 'light' | 'dark';
};

class Colors {
  private light: TColors = {
    bg: '#e8e8e8',
    bgLight: '#fcfcfc',
    textTitle: '#0a0a0a',
    textOnVariant: '#fcfcfc',
    text: '#2e2e2e',
    variant: '#ff0000',

    mode: 'light',
  };

  private dark: TColors = {
    bg: '#0c0e17',
    bgLight: '#111524',
    textTitle: '#fcfcfc',
    textOnVariant: '#fcfcfc',
    text: '#bdbdbd',
    variant: '#ff0000',

    mode: 'dark',
  };

  public getLight() {
    return this.light;
  }

  public getDark() {
    return this.dark;
  }

  public static getInstance() {
    const theme = localStorage.getItem(Constants.getThemeId());
    if (theme === null) {
      localStorage.setItem(Constants.getThemeId(), Constants.getThemeLightId());
      return new Colors().getLight();
    } else if (theme === Constants.getThemeLightId()) return new Colors().getLight();
    return new Colors().getDark();
  }
}

export default Colors;
