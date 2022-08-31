import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useCallback, useContext, useEffect, useState } from 'react';
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

const pixels = Pixels.getInstance();
const strings = getStrings();

const SignUp = () => {
  Firebase.app;
  const router = useRouter();
  const { isMobile, colors, setThemeMode } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState(strings.waitAMinute);
  const [alertBody, setAlertBody] = useState('');
  const [alertButtonConfirm, setAlertButtonConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(strings.emailRequired);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(strings.passwordRequired);

  const emailValidation = useCallback((mail: string) => {
    if (!mail.length) setEmailError(strings.emailRequired);
    else {
      const isValid = Validation.isEmail(mail);
      setEmailError(isValid ? '' : strings.emailInvalid);
      setEmail(isValid ? mail : '');
    }
  }, []);

  const validationForm = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.type === 'email') emailValidation(target.value);
      else {
        const pass = !target.value.length
          ? strings.passwordRequired
          : target.value.length < 8
          ? strings.passwordInvalid
          : '';
        setPasswordError(pass);
        setPassword(pass.length ? '' : target.value);
      }
    },
    [emailValidation]
  );

  const submitForm = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (password && password.length >= 8 && email && Validation.isEmail(email)) {
        setAlertVisible(true);
        Firebase.createUser(email, password)
          .then(({ error, user }) => {
            if (error && error.message) {
              setAlertTitle(strings.createUserErrorTitle);
              setAlertBody(strings.emailMayBeInvalid);
              setAlertButtonConfirm(true);
            }
          })
          .catch((error) => {
            if (error && error.message) setAlertBody(error.message);
            setAlertTitle(strings.createUserErrorTitle);
            setAlertButtonConfirm(true);
          });
      }
    },
    [email, password]
  );

  const onConfirmClickAlert = useCallback(() => {
    setAlertTitle(strings.waitAMinute);
    setAlertBody('');
    setAlertButtonConfirm(false);
  }, []);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (!user) setLoading(false);
      else router.push('/home');
    });
  }, [router]);

  return (
    <div>
      <Container>
        <Head>
          <title>IzanamiOS - {strings.signUp}</title>
        </Head>
        <main
          style={{
            visibility: loading ? 'hidden' : 'visible',
            width: isMobile ? '90vw' : '60vw',
            maxWidth: '900px',
            minHeight: '30vh',
            background: colors.bgLight,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: pixels.p2,
            borderRadius: pixels.r1,
            boxShadow: '-1px 3px 10px -2px #000000',
          }}
        >
          <form>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: pixels.p0 }}>
              <Image
                width={100}
                draggable={false}
                height={100}
                src={colors.mode === 'light' ? '/images/svg/icon-dark.svg' : '/images/svg/icon.svg'}
                alt=""
              />
            </div>
            <Title center>
              {strings.appName}
              <span style={{ color: colors.variant }}>{strings.appSubName}</span>
            </Title>
            <div
              style={{
                marginTop: pixels.p0,
                ...(!isMobile ? { marginLeft: pixels.p3, marginRight: pixels.p3 } : {}),
              }}
            >
              <Text center>{strings.loginSubtitle}</Text>
              <Text center>{strings.loginSubtitleAbove}</Text>
            </div>
            <div
              style={{ width: isMobile ? '90%' : '60%', margin: '0 auto', marginTop: pixels.p2 }}
            >
              <div>
                <label>
                  <input
                    type="email"
                    placeholder={strings.email}
                    onChange={validationForm}
                    style={{ background: colors.bg, color: colors.text }}
                  />
                  <small
                    style={{ display: 'block', paddingTop: pixels.p0, paddingBottom: pixels.p0 }}
                  >
                    <span style={{ color: colors.variant, paddingLeft: pixels.p1 }}>
                      {emailError}
                    </span>
                  </small>
                </label>
              </div>
              <div>
                <label>
                  <input
                    onChange={validationForm}
                    type="password"
                    placeholder={strings.password}
                    style={{ background: colors.bg, color: colors.text }}
                  />
                  <small
                    style={{ display: 'block', paddingTop: pixels.p0, paddingBottom: pixels.p0 }}
                  >
                    <span style={{ color: colors.variant, paddingLeft: pixels.p1 }}>
                      {passwordError}
                    </span>
                  </small>
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: '#000000',
                  width: isMobile ? '90%' : '60%',
                  marginTop: pixels.p2,
                  borderRadius: pixels.r3,
                }}
              >
                <button
                  onClick={submitForm}
                  type={'submit'}
                  disabled={!(email.length && password.length)}
                  style={{
                    width: '100%',
                    padding: `${pixels.p0} ${pixels.p1}`,
                    borderRadius: pixels.r3,
                    background: colors.variant,
                    margin: '0 auto',
                  }}
                >
                  <span style={{ color: colors.textOnVariant }}>{strings.signUp}</span>
                </button>
              </div>
            </div>
          </form>
          <div>
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: pixels.p2,
                background: colors.bgLight,
              }}
            >
              <Text>{strings.alreadyHaveAccount}</Text>
            </button>
          </div>
          <button
            style={{
              position: 'absolute',
              right: pixels.p2,
              top: pixels.p2,
              cursor: 'pointer',
              background: colors.bgLight,
            }}
            onClick={setThemeMode}
          >
            <Image
              src={colors.mode === 'light' ? '/images/svg/moon.svg' : '/images/svg/sunny.svg'}
              width={26}
              height={26}
              alt=""
            />
          </button>
        </main>
        <Alert
          title={alertTitle}
          isVisible={alertVisible}
          body={alertBody}
          buttonConfirm={alertButtonConfirm}
          onConfirmClick={onConfirmClickAlert}
          setVisible={() => setAlertVisible((v) => !v)}
        />
      </Container>
      {loading ? <LoadingPage /> : <div title="loading" />}
    </div>
  );
};

export default SignUp;
