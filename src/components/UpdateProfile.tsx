import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { TGender } from '../context/addCharacter';
import { GlobalContext } from '../context/global';
import Pixels from '../resources/Pixels';
import getStrings from '../resources/strings';
import Container from './Container';
import Text from './Text';
import Title from './Title';

const strings = getStrings();
const pixels = Pixels.getInstance();

const UpdateProfile = () => {
  const { colors, isMobile } = useContext(GlobalContext);

  const [gender, setGender] = useState<TGender>('F');

  return (
    <div>
      <Head>
        <title>IzanamiOS - {strings.profile}</title>
      </Head>
      <Container>
        <div
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
            <Image
              src={
                colors.mode === 'dark' ? '/images/svg/profile-dark.svg' : '/images/svg/profile.svg'
              }
              width={150}
              height={150}
              alt=""
            />
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
                type={'text'}
                placeholder={strings.firstName}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.lastName}</Text>
              </div>
              <input type={'text'} style={{ background: colors.bg, color: colors.text }} />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.email}</Text>
              </div>
              <input type={'text'} style={{ background: colors.bg, color: colors.text }} />
            </label>
            <label style={{ marginTop: pixels.p1 }}>
              <div style={{ paddingBottom: pixels.p0 }}>
                <Text>{strings.birthday}</Text>
              </div>
              <input
                type={'date'}
                onChange={(e) => console.log(e.target.value)}
                style={{ background: colors.bg, color: colors.text }}
              />
            </label>
          </div>
          <div style={{ marginTop: pixels.p2, ...(isMobile ? { display: 'grid' } : {}) }}>
            <button
              style={{
                background: colors.variant,
                padding: `${pixels.p0} ${pixels.p3}`,
                borderRadius: pixels.r1,
              }}
            >
              <Text center={isMobile} bold>
                {strings.save}
              </Text>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProfile;
