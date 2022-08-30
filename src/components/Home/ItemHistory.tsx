import CharacterData from '../../Model/CharacterData';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';

type TItemHistoryProps = {
  history: CharacterData;
  colors: TColors;
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

const ItemHistory = ({
  colors,
  history,
  position,
  details,
  onChangeDetail,
  onChangeValue,
  onDelete,
  set,
}: TItemHistoryProps) => {
  return (
    <div
      key={history.getKey()}
      style={{
        width: '100%',
        marginTop: px.p2,
      }}
    >
      <div style={{ display: 'flex' }}>
        <input
          style={{ background: colors.bg, color: colors.textTitle, fontWeight: 700 }}
          type="text"
          value={history.getDetail()}
          onChange={({ target }) =>
            onChangeDetail(target.value, history.getKey(), position, details, set)
          }
        />
        <button
          style={{ background: colors.bgLight }}
          onClick={() => onDelete(history.getKey(), details, set)}
        >
          <span
            style={{ color: colors.variant, marginLeft: px.p0 }}
            className="material-symbols-outlined"
          >
            delete
          </span>
        </button>
      </div>
      <div style={{ width: '100%', marginTop: px.p1, marginRight: '10%' }}>
        <textarea
          value={history.getValue()}
          onChange={({ target }) =>
            onChangeValue(target.value, history.getKey(), position, details, set)
          }
          style={{ background: colors.bg, color: colors.text }}
        />
      </div>
    </div>
  );
};

export default ItemHistory;
