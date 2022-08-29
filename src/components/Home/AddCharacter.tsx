import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AddCharacterContext } from '../../context/addCharacter';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';
import Text from '../Text';
import Title from '../Title';

type TAddCharacterProps = {
  colors: TColors;
};

const px = Pixels.getInstance();

const AddCharacter = ({ colors }: TAddCharacterProps) => {
  const { navOpen } = useContext(HomeContext);
  const { isMobile } = useContext(GlobalContext);

  const strings = getStrings();
  const [belowThousand, setBelowThousand] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const {
    personGender,
    personImage,
    personName,
    personRace,
    personTitle,
    personAge,
    setPersonAge,
    setPersonGender,
    setPersonImage,
    setPersonName,
    setPersonRace,
    setPersonTitle,
  } = useContext(AddCharacterContext);

  useEffect(() => {
    if (personImage !== null) {
      const objectUrl = URL.createObjectURL(personImage!);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [personImage]);

  useEffect(() => {
    const resize = () => {
      setBelowThousand(window.innerWidth <= 1000);
    };

    resize();

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return navOpen && isMobile ? (
    <div></div>
  ) : (
    <div
      style={{
        minHeight: '100%',
        width: '100%',
        background: colors.bgLight,
        borderRadius: px.r1,
        padding: px.p2,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: belowThousand ? 'column' : 'row',
        }}
      >
        <button
          style={{
            background: colors.bgLight,
            padding: px.p0,
            border: '3px solid ' + colors.bg,
            borderRadius: px.r1,
          }}
        >
          <label
            style={{
              cursor: 'pointer',
            }}
          >
            <input
              accept="image/gif, image/jpeg, image/png"
              type={'file'}
              style={{ display: 'none' }}
              onChange={({ target }) => setPersonImage(target.files && target.files[0])}
            />
            {preview ? (
              <div>
                <Image
                  id="test"
                  src={preview}
                  width={150}
                  className="rounded-full"
                  height={150}
                  alt={strings.profile}
                />
              </div>
            ) : (
              <div
                style={{
                  height: 150,
                  width: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{ fontSize: 70, color: colors.bg }}
                  className="material-symbols-outlined"
                >
                  add_photo_alternate
                </span>
              </div>
            )}
          </label>
        </button>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <input
            value={personName}
            type="text"
            style={{
              background: colors.bg,
              width: '100%',
              marginLeft: !isMobile ? px.p2 : 0,
              marginTop: px.p1,
              color: colors.text,
            }}
            placeholder={strings.name}
            onChange={({ target }) => setPersonName(target.value)}
          />
          <input
            value={personTitle}
            type="text"
            style={{
              background: colors.bg,
              width: '100%',
              marginLeft: !isMobile ? px.p2 : 0,
              marginTop: px.p1,
              color: colors.text,
            }}
            placeholder={strings.title}
            onChange={({ target }) => setPersonTitle(target.value)}
          />
          <div
            style={{
              marginTop: px.p1,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <button onClick={() => setPersonGender('M')} style={{ background: colors.bgLight }}>
              <span>
                <Text
                  color={personGender === 'M' ? colors.variant : null}
                  bold={personGender === 'M'}
                >
                  {strings.male}
                </Text>
              </span>
            </button>
            <button onClick={() => setPersonGender('F')} style={{ background: colors.bgLight }}>
              <span>
                <Text
                  color={personGender === 'F' ? colors.variant : null}
                  bold={personGender === 'F'}
                >
                  {strings.female}
                </Text>
              </span>
            </button>
            <button onClick={() => setPersonGender('O')} style={{ background: colors.bgLight }}>
              <span>
                <Text
                  color={personGender === 'O' ? colors.variant : null}
                  bold={personGender === 'O'}
                >
                  {strings.other}
                </Text>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          marginTop: px.p1,
          ...(!isMobile
            ? { display: 'grid', gridTemplateColumns: '1fr 1fr' }
            : { display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }),
        }}
      >
        <label
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: px.p1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text>{strings.race}</Text>
          <input
            value={personRace}
            type="text"
            style={{
              background: colors.bg,
              width: isMobile ? '100%' : '95%',
              marginLeft: px.p1,
              color: colors.text,
            }}
            placeholder={strings.race}
            onChange={({ target }) => setPersonRace(target.value)}
          />
        </label>
        <label
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: px.p1,
            display: 'flex',
            alignItems: 'center',
            marginLeft: isMobile ? 0 : px.p1,
          }}
        >
          <Text>{strings.age}</Text>
          <input
            value={personAge}
            type="number"
            style={{
              background: colors.bg,
              width: isMobile ? '100%' : '95%',
              marginLeft: px.p1,
              color: colors.text,
            }}
            placeholder={strings.age}
            onChange={({ target }) => {
              if (isNaN(parseFloat(target.value))) setPersonAge(0);
              else setPersonAge(parseFloat(target.value));
            }}
          />
        </label>
      </div>
      <div
        style={{
          width: '100%',
          marginTop: px.p2,
          paddingRight: '2.5%',
        }}
      >
        <Title sub>{strings.presentation}</Title>
      </div>
    </div>
  );
};

export default AddCharacter;
