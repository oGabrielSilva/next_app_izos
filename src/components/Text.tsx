import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';

type TTextProps = {
  center?: boolean;
  bold?: boolean;
  children: ReactNode;
};

const Text = ({ center, bold, children }: TTextProps) => {
  const { colors } = useContext(GlobalContext);

  return (
    <div>
      <p
        style={{
          textAlign: center ? 'center' : 'start',
          color: colors.text,
          fontWeight: bold ? 700 : 400,
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default Text;
