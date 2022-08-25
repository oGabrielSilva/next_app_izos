import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';

type TTitle = {
  center?: boolean;
  sub?: boolean;
  children: ReactNode;
};

const Title = ({ center, sub, children }: TTitle) => {
  const { colors } = useContext(GlobalContext);

  return sub ? (
    <h3 style={{ color: colors.textTitle, textAlign: center ? 'center' : 'start' }}>{children}</h3>
  ) : (
    <h1 style={{ color: colors.textTitle, textAlign: center ? 'center' : 'start' }}>{children}</h1>
  );
};

export default Title;
