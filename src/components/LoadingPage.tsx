import { useContext } from 'react';
import { GlobalContext } from '../context/global';
import Pixels from '../resources/Pixels';
import getStrings from '../resources/strings';
import ProgressBar from './ProgressBar';
import Text from './Text';

const LoadingPage = () => {
  const { colors } = useContext(GlobalContext);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: colors.bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ProgressBar />
      <div style={{ marginTop: Pixels.getInstance().p3 }}>
        <Text center>{getStrings().waitAMinute}</Text>
      </div>
    </div>
  );
};

export default LoadingPage;
