import CharacterData from '../../Model/CharacterData';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';

type TItemDetailProps = {
  detail: CharacterData;
  colors: TColors;
  isMobile: boolean;
  position: number;
  details: CharacterData[];
  onChangeDetail: (
    value: string,
    key: string,
    position: number,
    details: CharacterData[],
    set: (value: CharacterData[]) => void
  ) => void;
  onChangeValue: (
    value: string,
    key: string,
    position: number,
    details: CharacterData[],
    set: (value: CharacterData[]) => void
  ) => void;
  onDelete: (key: string, details: CharacterData[], set: (value: CharacterData[]) => void) => void;
  set: (value: CharacterData[]) => void;
};

const px = Pixels.getInstance();

const ItemDetail = ({
  colors,
  detail,
  isMobile,
  position,
  details,
  onChangeDetail,
  onChangeValue,
  onDelete,
  set,
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
          onChange={({ target }) =>
            onChangeDetail(target.value, detail.getKey(), position, details, set)
          }
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
        onChange={({ target }) =>
          onChangeValue(target.value, detail.getKey(), position, details, set)
        }
      />
      <button
        style={{ background: colors.bgLight }}
        onClick={() => onDelete(detail.getKey(), details, set)}
      >
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

export default ItemDetail;
