import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AddCharacterContext } from '../../context/addCharacter';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import CharacterData from '../../Model/CharacterData';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';
import Alert from '../Alert';
import Text from '../Text';
import Title from '../Title';
import ItemDetail from './ItemDetail';
import ItemHistory from './ItemHistory';

type TAddCharacterProps = { colors: TColors };

const px = Pixels.getInstance();

const AddCharacter = ({ colors }: TAddCharacterProps) => {
  const { navOpen } = useContext(HomeContext);
  const { isMobile } = useContext(GlobalContext);

  const strings = getStrings();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState(strings.waitAMinute);
  const [alertButton, setAlertButton] = useState(false);
  const [belowThousand, setBelowThousand] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const {
    personGender,
    personImage,
    personName,
    personTitle,
    personPresentation,
    personOrigin,
    personDetails,
    personHistory,
    setPersonHistory,
    setPersonDetails,
    setPersonOrigin,
    setPersonGender,
    setPersonImage,
    setPersonName,
    setPersonTitle,
    setPersonPresentation,
    savePersona,
    draftPersona,
  } = useContext(AddCharacterContext);

  useEffect(() => {
    if (personImage) {
      const objectUrl = URL.createObjectURL(personImage);
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
    <div />
  ) : (
    <div
      style={{
        minHeight: '100%',
        width: '100%',
        background: colors.bgLight,
        borderRadius: px.r1,
        padding: px.p1,
      }}
    >
      <Alert
        body={alertTitle === strings.waitAMinute ? '' : '...'}
        onConfirmClick={() => {
          setAlertTitle(strings.waitAMinute);
          setAlertButton(false);
        }}
        setVisible={() => setAlertVisible(!alertVisible)}
        title={alertTitle}
        isVisible={alertVisible}
        buttonConfirm={alertButton}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ background: colors.bgLight, marginLeft: 'auto' }}>
          <span style={{ color: colors.variant }} className="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
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
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <input
            value={personName}
            type="text"
            style={{
              background: colors.bg,
              width: belowThousand ? '100%' : '90%',
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
              width: belowThousand ? '100%' : '90%',
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
              width: belowThousand ? '100%' : '90%',
            }}
          >
            <button onClick={() => setPersonGender('M')} style={{ background: colors.bgLight }}>
              <div style={{ minWidth: 65 }}>
                <Text
                  color={personGender === 'M' ? colors.variant : null}
                  bold={personGender === 'M'}
                >
                  {strings.male}
                </Text>
              </div>
            </button>
            <button onClick={() => setPersonGender('F')} style={{ background: colors.bgLight }}>
              <div style={{ minWidth: 65 }}>
                <Text
                  color={personGender === 'F' ? colors.variant : null}
                  bold={personGender === 'F'}
                >
                  {strings.female}
                </Text>
              </div>
            </button>
            <button onClick={() => setPersonGender('O')} style={{ background: colors.bgLight }}>
              <div style={{ minWidth: 65 }}>
                <Text
                  color={personGender === 'O' ? colors.variant : null}
                  bold={personGender === 'O'}
                >
                  {strings.other}
                </Text>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          marginTop: px.p1,
        }}
      >
        <div style={{ marginBottom: px.p1, marginTop: px.p1 }}>
          <Title sub>{strings.details}</Title>
        </div>
        {!personDetails.length ? (
          <div>
            <Title sub center>
              {strings.noDetails}
            </Title>
          </div>
        ) : (
          personDetails.map((detail, index) => {
            return (
              <ItemDetail
                colors={colors}
                detail={detail}
                position={index}
                isMobile={isMobile}
                key={detail.getKey()}
                onChangeDetail={CharacterData.onChangeDetail}
                onChangeValue={CharacterData.onChangeValue}
                details={personDetails}
                set={setPersonDetails}
                onDelete={CharacterData.onDelete}
              />
            );
          })
        )}
      </div>
      <div style={{ marginTop: px.p0 }}>
        <button
          onClick={() => {
            setPersonDetails([...personDetails, new CharacterData(strings.detail, '')]);
          }}
          style={{ background: colors.bgLight, padding: px.p0 }}
        >
          <span
            style={{ fontSize: '1.8rem', color: colors.variant }}
            className="material-symbols-outlined"
          >
            add_circle
          </span>
        </button>
      </div>
      <div
        style={{
          width: '100%',
          marginTop: px.p2,
        }}
      >
        <Title sub>{strings.presentation}</Title>
        <div style={{ width: '100%', marginTop: px.p1, marginRight: '10%' }}>
          <textarea
            value={personPresentation}
            onChange={({ target }) => setPersonPresentation(target.value)}
            style={{ background: colors.bg, color: colors.text, height: 140 }}
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          marginTop: px.p1,
        }}
      >
        <Title sub>{strings.origin}</Title>
        <div style={{ width: '100%', marginTop: px.p1, marginRight: '10%' }}>
          <textarea
            value={personOrigin}
            onChange={({ target }) => setPersonOrigin(target.value)}
            style={{ background: colors.bg, color: colors.text }}
          />
        </div>
      </div>
      {!personHistory.length ? (
        <div />
      ) : (
        personHistory.map((value, index) => (
          <ItemHistory
            details={personHistory}
            onChangeDetail={CharacterData.onChangeDetail}
            onChangeValue={CharacterData.onChangeValue}
            onDelete={CharacterData.onDelete}
            set={setPersonHistory}
            colors={colors}
            history={value}
            position={index}
            key={value.getKey()}
          />
        ))
      )}
      <div style={{ marginTop: px.p0 }}>
        <button
          onClick={() => {
            setPersonHistory([...personHistory, new CharacterData(strings.detail, '')]);
          }}
          style={{ background: colors.bgLight, padding: px.p0 }}
        >
          <span
            style={{ fontSize: '1.8rem', color: colors.variant }}
            className="material-symbols-outlined"
          >
            add_circle
          </span>
        </button>
      </div>
      <div
        style={{
          marginTop: px.p2,
          marginBottom: px.p1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <button
          onClick={savePersona}
          style={{
            background: colors.variant,
            margin: '0 ' + px.p1,
            padding: `${px.p0} ${px.p3}`,
            borderRadius: px.r1,
          }}
        >
          <Text center color={colors.textOnVariant}>
            {strings.save}
          </Text>
        </button>
        <button
          onClick={() => {
            setAlertVisible(true);
            draftPersona().then((message) => {
              setAlertButton(true);
              setAlertTitle(message);
            });
          }}
          style={{
            background: colors.bg,
            margin: '0 ' + px.p1,
            padding: `${px.p0} ${px.p3}`,
            borderRadius: px.r1,
          }}
        >
          <Text center>{strings.draft}</Text>
        </button>
      </div>
    </div>
  );
};

export default AddCharacter;
