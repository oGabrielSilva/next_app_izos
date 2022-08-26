import type { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import { GlobalContext } from '../context/global';
import HomeContextProvider from '../context/home';
import Firebase from '../firebase/Firebase';
import Pixels from '../resources/Pixels';

const pixels = Pixels.getInstance();

const Home: NextPage = () => {
  Firebase.app;

  const router = useRouter();
  const auth = getAuth();

  const { colors } = useContext(GlobalContext);

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      getAuth().onAuthStateChanged((user) => {
        if (user === null) {
          router.push('/');
        } else {
          setUser(user);
          setLoading(false);
        }
      });
    }
  }, [router, loading]);

  return (
    <div>
      <HomeContextProvider>
        <div>
          <Header signOut={() => auth.signOut()} />
          <Container minHeight="header">{}</Container>
        </div>
      </HomeContextProvider>
    </div>
  );
};

export default Home;
