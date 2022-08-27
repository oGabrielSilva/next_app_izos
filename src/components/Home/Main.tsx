import { useContext } from 'react';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import Pixels from '../../resources/Pixels';
import Placeholder from './Placeholder';

const pixels = Pixels.getInstance();

const Main = () => {
  const { navOpen } = useContext(HomeContext);
  const { colors } = useContext(GlobalContext);

  return (
    <div
      style={{
        width: navOpen ? `calc(100vw - ${pixels.hHeader + 10}px)` : '100%',
        maxHeight: `calc(100vh - ${pixels.hHeader + 15}px)`,
        height: '100%',
        marginTop: 5,
        paddingRight: 10,
        paddingLeft: 10,
        overflow: 'auto',
      }}
    >
      <Placeholder />
    </div>
  );
};

export default Main;
