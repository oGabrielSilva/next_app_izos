import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AddCharacterContext } from '../../context/addCharacter';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import CharacterDetail from '../../Model/CharacterDetail';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';
import Text from '../Text';
import Title from '../Title';

type TAddCharacterProps = {
  colors: TColors;
};

type TItemDetailProps = {
  detail: CharacterDetail;
  colors: TColors;
  isMobile: boolean;
  position: number;
  onChangeDetail: (value: string, key: string, position: number) => void;
  onChangeValue: (value: string, key: string, position: number) => void;
  onDelete: (key: string) => void;
};

const px = Pixels.getInstance();

const ItemDetail = ({
  colors,
  detail,
  isMobile,
  position,
  onChangeDetail,
  onChangeValue,
  onDelete,
}: TItemDetailProps) => {
  return (
    <label
      style={{
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: px.p0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ minWidth: 60 }}>
        <input
          type="text"
          value={detail.getDetail()}
          style={{ background: colors.bg, width: '90%', color: colors.text }}
          onChange={({ target }) => onChangeDetail(target.value, detail.getKey(), position)}
        />
      </div>
      <input
        value={detail.getValue()}
        type="text"
        style={{
          background: colors.bg,
          width: isMobile ? '60%' : '50%',
          marginLeft: px.p1,
          color: colors.text,
        }}
        placeholder={detail.getValue()}
        onChange={({ target }) => onChangeValue(target.value, detail.getKey(), position)}
      />
      <button style={{ background: colors.bgLight }} onClick={() => onDelete(detail.getKey())}>
        <span
          style={{ color: colors.variant, marginLeft: px.p0 }}
          className="material-symbols-outlined"
        >
          delete
        </span>
      </button>
    </label>
  );
};

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
    personTitle,
    personPresentation,
    personOrigin,
    personDetails,
    setPersonDetails,
    setPersonOrigin,
    setPersonGender,
    setPersonImage,
    setPersonName,
    setPersonTitle,
    setPersonPresentation,
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
        padding: px.p1,
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
          personDetails.map((detail, index) => (
            <ItemDetail
              colors={colors}
              detail={detail}
              position={index}
              isMobile={isMobile}
              key={detail.getKey()}
              onChangeDetail={(text: string, key: string, position: number) => {
                const detail = personDetails.find((value) => value.getKey() === key);
                if (detail !== undefined) {
                  const list = personDetails.filter((value) => value.getKey() !== key);
                  detail.setDetail(text);
                  const newList = CharacterDetail.insert(list, position, detail);
                  setPersonDetails([...newList]);
                }
              }}
              onChangeValue={(text: string, key: string, position: number) => {
                const detail = personDetails.find((value) => value.getKey() === key);
                if (detail !== undefined) {
                  const list = personDetails.filter((value) => value.getKey() !== key);
                  detail.setValue(text);
                  const newList = CharacterDetail.insert(list, position, detail);
                  setPersonDetails([...newList]);
                }
              }}
              onDelete={(key: string) => {
                const newList = personDetails.filter((value) => value.getKey() !== key);
                setPersonDetails([...newList]);
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: px.p0 }}>
        <button
          onClick={() => {
            setPersonDetails([...personDetails, new CharacterDetail(strings.detail, '')]);
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
    </div>
  );
};

export default AddCharacter;
