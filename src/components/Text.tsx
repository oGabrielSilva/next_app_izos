import { CSSProperties, ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';

type TTextProps = {
  center?: boolean;
  centerFlex?: boolean;
  bold?: boolean;
  color?: string | null;
  containerStyle?: CSSProperties;
  children: ReactNode;
};

const Text = ({ containerStyle, center, centerFlex, bold, color, children }: TTextProps) => {
  const { colors } = useContext(GlobalContext);

  return (
    <div>
      <p
        style={{
          textAlign: center || centerFlex ? 'center' : 'start',
          color: color ? color : colors.text,
          fontWeight: bold ? 700 : 400,
          transition: '0.5s ease',
          ...(centerFlex
            ? { display: 'flex', justifyContent: 'center', alignItems: 'center' }
            : {}),
          ...(containerStyle !== undefined ? containerStyle : {}),
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default Text;
