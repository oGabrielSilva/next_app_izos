import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';

interface IContainerProps {
  children: ReactNode;
}

const Container = ({ children }: IContainerProps) => {
  const { colors } = useContext(GlobalContext);

  return (
    <section
      style={{
        background: colors.bg,
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      {children}
    </section>
  );
};

export default Container;
