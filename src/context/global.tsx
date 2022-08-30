import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Colors, { TColors } from '../resources/Colors';
import Pixels from '../resources/Pixels';
import Constants from '../utils/Constants';

type TContextGlobal = {
  colors: TColors;
  isMobile: boolean;

  setThemeMode: () => void;
};

export const GlobalContext = createContext<TContextGlobal>({} as TContextGlobal);

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<TColors>({} as TColors);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const setThemeMode = useCallback(() => {
    localStorage.setItem(
      Constants.getThemeId(),
      colors.mode === 'light' ? Constants.getThemeDarkId() : Constants.getThemeLightId()
    );
    setColors(Colors.getInstance());
  }, [colors]);

  useEffect(() => {
    const resize = () => setIsMobile(Pixels.isMobile());

    setIsMobile(Pixels.isMobile());
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    setColors(Colors.getInstance());
  }, []);

  const value = useMemo(
    () => ({ colors, isMobile, setThemeMode }),
    [colors, isMobile, setThemeMode]
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
