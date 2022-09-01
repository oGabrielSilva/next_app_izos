import { updateProfile } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TGender } from '../context/addCharacter';
import { GlobalContext } from '../context/global';
import { HomeContext } from '../context/home';
import User from '../Model/User';
import { ProfileResponseData } from '../pages/api/uploads/images/profile';
import Pixels from '../resources/Pixels';
import getStrings from '../resources/strings';
import ImageController from '../utils/Image';
import Alert from './Alert';
import Container from './Container';
import Text from './Text';
import Title from './Title';

const strings = getStrings();
const pixels = Pixels.getInstance();

const UpdateProfile = () => {
  const { user } = useContext(HomeContext);
  const { colors, isMobile } = useContext(GlobalContext);

  const profileRef = useRef<HTMLInputElement>(null);

  const [gender, setGender] = useState<TGender>('F');
  const [profile, setProfile] = useState<Blob | null>(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState(strings.waitAMinute);
  const [alertBody, setAlertBody] = useState('');
  const [alertButton, setAlertButton] = useState(false);

  const [preview, setPreview] = useState<string>('');

  const submitForm = useCallback(() => {
    setAlertVisible(true);
    if (user) {
      const fn = (): Promise<string | null> => {
        const promise = new Promise<string | null>((resolve) => {
          if (profile) {
            const image = new FileReader();
            image.readAsDataURL(profile);
            image.onload = () => resolve(image.result as string);
          } else resolve(null);
        });
        return promise;
      };
      fn().then((userProfile) => {
        ImageController.resizeBase64(userProfile, 150).then((img) => {
          const userModel = new User(
            user.uid,
            img as string,
            gender,
            username,
            name,
            lastName,
            email,
            new Date(date)
          );
          if (!userModel.validation()) {
            setAlertBody(strings.updateProfileValidationError);
            setAlertButton(true);
            return;
          }
          if (userModel.getProfile().length) {
            fetch('/api/uploads/images/profile', {
              method: 'POST',
              body: JSON.stringify({ profile: userModel.getProfile(), uid: userModel.getUid() }),
            }).then((response) => {
              if (response.ok) {
                response.json().then((res) => {
                  if (res.error) {
                    setAlertBody(strings.updateProfileValidationError);
                    setAlertButton(true);
                    return;
                  }
                  updateProfile(user, { photoURL: res.url, displayName: `${userModel.getName()}` });
                });
              }
            });
          }
          fetch('/api/user/profile');
        });
      });
    }
  }, [date, email, gender, lastName, name, profile, user, username]);

  useEffect(() => {
    if (profile) {
      const objectURL = URL.createObjectURL(profile);
      setPreview(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [profile]);

  return (
    <div>
      <Head>
        <title>IzanamiOS - {strings.profile}</title>
      </Head>
      <Container>
        <form
          onSubmit={(event) => event.preventDefault()}
          style={{
            width: isMobile ? '95vw' : '100vw',
            maxWidth: 699,
            background: colors.bgLight,
            position: 'fixed',
            top: pixels.p1,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: `${pixels.p1} ${pixels.p2} ${pixels.p3}`,
            borderRadius: pixels.r1,
            overflow: 'auto',
            maxHeight: `calc(100vh - ${pixels.p2})`,
          }}
        >
          <div>
            <Title>{strings.updateProfile}</Title>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: pixels.p2 }}>
            <button
              onClick={() =>
                !!profileRef && !!profileRef.current ? profileRef.current.click() : null
              }
              style={{
                height: 150,
                width: 150,
                background: 'transparent',
                borderRadius: pixels.rM,
              }}
            >
              {!preview ? (
                <Image
                  src={
                    colors.mode === 'dark'
                      ? '/images/svg/profile-dark.svg'
                      : '/images/svg/profile.svg'
                  }
                  width={150}
                  height={150}
                  alt=""
                />
              ) : (
                <input
                  id="image"
                  type={'image'}
                  width={150}
                  height={150}
                  src={preview}
                  style={{ borderRadius: pixels.rM, padding: 0 }}
                />
              )}
              <input
                ref={profileRef}
                style={{ display: 'none' }}
                id="input"
                type={'file'}
                accept="image/jpeg, image/png, image/gif"
                onChange={({ target }) => setProfile(target.files ? target.files[0] : null)}
              />
            </button>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: pixels.p1 }}
          >
            <button
              onClick={() => (gender !== 'M' ? setGender('M') : null)}
              style={{ background: colors.bgLight, padding: pixels.p1 }}
            >
              <Text center bold={gender === 'M'} color={gender === 'M' ? colors.variant : null}>
                {strings.male}
              </Text>
            </button>
            <button
              onClick={() => (gender !== 'F' ? setGender('F') : null)}
              style={{ background: colors.bgLight, padding: pixels.p1 }}
            >
              <Text center bold={gender === 'F'} color={gender === 'F' ? colors.variant : null}>
                {strings.female}
              </Text>
            </button>
            <button
              onClick={() => (gender !== 'O' ? setGender('O') : null)}
              style={{ background: colors.bgLight, padding: pixels.p1 }}
            >
              <Text center bold={gender === 'O'} color={gender === 'O' ? colors.variant : null}>
                {strings.other}
              </Text>
            </button>
          </div>
          <div style={{ display: 'grid', marginTop: pixels.p1 }}>
            <label>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.username}</Text>
              </div>
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                type={'text'}
                style={{ background: colors.bg, color: colors.text }}
                placeholder={strings.nameForUsers}
              />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.name}</Text>
              </div>
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
                type={'text'}
                placeholder={strings.firstName}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.lastName}</Text>
              </div>
              <input
                value={lastName}
                onChange={({ target }) => setLastname(target.value)}
                type={'text'}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.email}</Text>
              </div>
              <input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                type={'text'}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.birthday}</Text>
              </div>
              <input
                value={date}
                type={'date'}
                onChange={({ target }) => setDate(target.value)}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
          </div>
          <div style={{ marginTop: pixels.p2, ...(isMobile ? { display: 'grid' } : {}) }}>
            <button
              onClick={submitForm}
              style={{
                background: colors.variant,
                padding: `${pixels.p0} ${pixels.p3}`,
                borderRadius: pixels.r1,
              }}
            >
              <Text color={colors.textOnVariant} center={isMobile} bold>
                {strings.save}
              </Text>
            </button>
          </div>
        </form>
      </Container>
      <Alert
        body={alertBody}
        onConfirmClick={() => {
          setAlertTitle(strings.waitAMinute);
          setAlertBody('');
          setAlertButton(false);
        }}
        setVisible={() => setAlertVisible(!alertVisible)}
        title={alertTitle}
        isVisible={alertVisible}
        buttonConfirm={alertButton}
      />
    </div>
  );
};

export default UpdateProfile;
