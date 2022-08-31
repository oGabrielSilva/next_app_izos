import { getAuth } from 'firebase/auth';
import { NextPage } from 'next';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/Home/Main';
import NavMenu from '../components/Home/NavMenu';
import UpdateProfile from '../components/UpdateProfile';
import HomeContextProvider from '../context/home';
import Firebase from '../firebase/Firebase';

const Home: NextPage = () => {
  Firebase.app;
  const auth = getAuth();

  return (
    <>
      <UpdateProfile />
      {/* <div>
        <HomeContextProvider>
          <div>
            <Header signOut={() => auth.signOut()} />
            <Container minHeight="header">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100vw', maxWidth: 1250, display: 'flex' }}>
                  <NavMenu />
                  <Main />
                </div>
              </div>
            </Container>
          </div>
        </HomeContextProvider>
      </div> */}
    </>
  );
};

export default Home;
