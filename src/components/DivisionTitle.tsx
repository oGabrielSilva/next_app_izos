import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';
import Pixels from '../resources/Pixels';

type TDivisionTitleProps = {
  children: ReactNode;
};

const pixels = Pixels.getInstance();

const DivisionTitle = ({ children }: TDivisionTitleProps) => {
  const { colors } = useContext(GlobalContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: pixels.p1,
      }}
    >
      <div style={{ width: '100%', background: colors.text, height: 1 }} />
      <h3 style={{ fontSize: '0.8rem', color: colors.textTitle, margin: '0 ' + pixels.p0 }}>
        {children}
      </h3>
      <div style={{ width: '100%', background: colors.text, height: 1 }} />
    </div>
  );
};

export default DivisionTitle;
