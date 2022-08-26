import { createContext, ReactNode, useLayoutEffect, useMemo, useState } from 'react';

type THomeContext = {
  navOpen: boolean;
  setNavOpen: (value: boolean) => void;
};

export const HomeContext = createContext<THomeContext>({} as THomeContext);

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [navOpen, setNavOpen] = useState(true);

  useLayoutEffect(() => {
    if (window.innerWidth <= 700) setNavOpen(false);
  }, []);

  const value = useMemo(() => ({ navOpen, setNavOpen }), [navOpen]);

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
