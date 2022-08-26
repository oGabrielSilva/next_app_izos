export type TPixels = {};
type TWNav = { mobile: string; default: string; max: number };

class Pixels {
  public p0: string;
  public p1: string;
  public p2: string;
  public p3: string;

  public r1: string;
  public r2: string;
  public r3: string;
  public rM: string;

  public hHeader: number;
  public wNav: TWNav;

  private constructor() {
    this.p0 = '0.5rem';
    this.p1 = '1rem';
    this.p2 = '2rem';
    this.p3 = '3rem';

    this.r1 = '8px';
    this.r2 = '16px';
    this.r3 = '32px';
    this.rM = '100%';

    this.hHeader = 60;
    this.wNav = { default: '40vw', max: 500, mobile: '60vw' };
  }

  public static isMobile(): boolean {
    return window.innerWidth < 700;
  }

  public static getInstance() {
    return new Pixels();
  }
}

export default Pixels;
