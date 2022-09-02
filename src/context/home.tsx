import { getAuth, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { TDataResponseUserDB } from '../pages/api/user/profile/[uid]';

export enum NavButtons {
  Home,
  Galery,
  Notifications,
  AddCharacter,
  AddObject,
  AddAblity,
  AddSheet,
  Session,
  Book,
}

type THomeContext = {
  loading: boolean;
  user: User | null;
  navOpen: boolean;
  navSelected: NavButtons;
  userDataBase: TDataResponseUserDB | null;
  setNavOpen: (value: boolean) => void;
  setNavSelected: (value: NavButtons) => void;
};

export const HomeContext = createContext<THomeContext>({} as THomeContext);

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [userDataBase, setUserDataBase] = useState<TDataResponseUserDB | null>(null);
  const [navOpen, setNavOpen] = useState(true);
  const [navSelected, setNavSelected] = useState(NavButtons.AddCharacter);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          router.push('/');
        } else {
          setUser(user);
          if (!user.displayName) router.push('/profile');
          fetch('/api/user/profile/' + user.uid, { method: 'GET' })
            .then((r) =>
              r.json().then((response) => {
                setUserDataBase(response.data as TDataResponseUserDB);
                if (!response.data) router.push('/profile');
              })
            )
            .finally(() => {
              setLoading(false);
            });
        }
      });
    }
  }, [router, loading]);

  useEffect(() => {
    if (window.innerWidth <= 700) setNavOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      user,
      navOpen,
      navSelected,
      userDataBase,
      setUser,
      setNavOpen,
      setNavSelected,
    }),
    [loading, user, navOpen, navSelected, userDataBase]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
