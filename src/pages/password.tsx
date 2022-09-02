import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Alert from '../components/Alert';
import Container from '../components/Container';
import LoadingPage from '../components/LoadingPage';
import Text from '../components/Text';
import Title from '../components/Title';
import { GlobalContext } from '../context/global';
import Firebase from '../firebase/Firebase';
import Pixels from '../resources/Pixels';
import getStrings from '../resources/strings';
import Validation from '../utils/Validation';

const strings = getStrings();
const pixels = Pixels.getInstance();

const Password: NextPage = () => {
  Firebase.app;
  const { isMobile, colors } = useContext(GlobalContext);

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertButtonConfirm, setAlertButtonConfirm] = useState(false);
  const [alertTitle, setAlertTitle] = useState(strings.waitAMinute);
  const [alertBody, setAlertBody] = useState('');

  const onConfirmClick = () => {
    if (alertBody === strings.emailDontExists || alertBody !== strings.emailInvalid)
      router.push('/');
    else {
      setAlertTitle(strings.waitAMinute);
      setAlertBody('');
      setAlertButtonConfirm(false);
      setAlertVisible(false);
    }
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (!!user) router.push('/home');
      else setLoading(false);
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title>
          {strings.appName} - {strings.password}
        </title>
      </Head>
      <Container>
        <div
          style={{
            width: isMobile ? '95vw' : '100vw',
            maxWidth: 699,
            background: colors.bgLight,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: `${pixels.p1} ${pixels.p2} ${pixels.p3}`,
            borderRadius: pixels.r1,
            overflow: 'auto',
            maxHeight: `calc(100vh - ${pixels.p2})`,
          }}
        >
          <div style={{ marginTop: pixels.p1 }}>
            <Title center>{strings.forgotPassword}</Title>
          </div>
          <div style={{ marginTop: pixels.p2 }}>
            <label htmlFor="input">
              <Text center bold>
                {strings.email}
              </Text>
              <input
                onChange={({ target }) => setEmail(target.value)}
                id="input"
                type="email"
                style={{ background: colors.bg, textAlign: 'center', marginTop: pixels.p0 }}
                placeholder="email.dev@izanami.os"
              />
            </label>
          </div>
          <div
            onClick={() => {
              setAlertVisible(true);
              if (Validation.isEmail(email)) {
                const auth = getAuth();
                sendPasswordResetEmail(auth, email).catch(() => {
                  setAlertVisible(true);
                  setAlertBody(strings.emailDontExists);
                  setAlertTitle(strings.emailInvalid);
                  setAlertButtonConfirm(true);
                });
                setAlertTitle(strings.success);
                setAlertBody(strings.sendEmailPassword);
                setAlertButtonConfirm(true);
              } else {
                setAlertTitle(strings.unexpected);
                setAlertBody(strings.emailInvalid);
                setAlertButtonConfirm(true);
              }
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <button
              style={{
                marginTop: pixels.p2,
                background: colors.variant,
                padding: `${pixels.p0} ${pixels.p3}`,
                borderRadius: pixels.r2,
              }}
            >
              <Text color={colors.textOnVariant}>{strings.send}</Text>
            </button>
          </div>
        </div>
      </Container>
      {loading ? <LoadingPage /> : <div title="loading" />}
      <Alert
        isVisible={alertVisible}
        setVisible={() => setAlertVisible(false)}
        title={alertTitle}
        body={alertBody}
        buttonConfirm={alertButtonConfirm}
        onConfirmClick={onConfirmClick}
      />
    </div>
  );
};

export default Password;
