import { useContext } from 'react';

import { GlobalContext } from '../context/global';
import Pixels from '../resources/Pixels';
import ProgressBar from './ProgressBar';
import Text from './Text';
import Title from './Title';

type TAlertProps = {
  title: string;
  body?: string;
  buttonsText?: string[];

  buttonConfirm?: boolean;
  isVisible: boolean;

  onConfirmClick?: () => void;
  setVisible: () => void;
};

const pixels = Pixels.getInstance();

const Alert = ({
  isVisible,
  title,
  body,
  buttonConfirm,
  buttonsText,
  onConfirmClick,
  setVisible,
}: TAlertProps) => {
  const { colors, isMobile } = useContext(GlobalContext);

  return (
    <div>
      <section
        style={{
          position: 'fixed',
          top: 0,
          left: isVisible ? 0 : '-100%',
          height: '100vh',
          width: '100vw',
          background: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minHeight: 100,
            width: isMobile ? '80vw' : 650,
            background: colors.bgLight,
            borderRadius: pixels.r1,
            padding: `${pixels.p1} 0`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ margin: `0 ${pixels.p3}` }}>
            <Title center sub>
              {title.length ? title : 'Lorem ipsum dolor, sit amet!'}
            </Title>
          </div>
          <div style={{ margin: `${pixels.p1} 0 0`, width: '100%', padding: `0 ${pixels.p3}` }}>
            {!body ? <ProgressBar /> : <Text center>{body}</Text>}
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {buttonConfirm ? (
              <button
                onClick={() => {
                  setVisible();
                  if (onConfirmClick !== undefined) setTimeout(() => onConfirmClick(), 1000);
                }}
                id="btnAlert"
                style={{
                  background: colors.bgLight,
                  padding: `${pixels.p0} 0`,
                  marginTop: pixels.p1,
                  width: '50%',
                }}
              >
                <Text bold center>
                  {buttonsText && buttonsText[0] ? buttonsText[0] : 'OK'}
                </Text>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alert;
