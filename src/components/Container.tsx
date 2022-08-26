import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../context/global';
import Pixels from '../resources/Pixels';

const pixels = Pixels.getInstance();

interface IContainerProps {
  minHeight?: 'header';
  children: ReactNode;
}

const Container = ({ minHeight, children }: IContainerProps) => {
  const { colors } = useContext(GlobalContext);

  return (
    <section
      style={{
        background: colors.bg,
        minWidth: '100vw',
        ...(minHeight
          ? {
              minHeight: `calc(100vh - ${pixels.hHeader}px)`,
              marginTop: pixels.hHeader,
            }
          : { height: '100vh' }),
      }}
    >
      {children}
    </section>
  );
};

export default Container;
