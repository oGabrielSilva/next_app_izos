import { useContext } from 'react';
import { GlobalContext } from '../context/global';

const ProgressBar = () => {
  const { colors } = useContext(GlobalContext);

  return (
    <div
      style={{
        width: 50,
        background: 'transparent',
        borderRadius: '100%',
        height: 50,
        borderTop: '3px solid ' + colors.variant,
        borderLeft: '3px solid ' + colors.variant,
        borderRight: '3px solid ' + colors.variant,
        borderBottom: '3px solid transparent',
        margin: '0 auto',
      }}
      id="progressBar"
    />
  );
};

export default ProgressBar;
