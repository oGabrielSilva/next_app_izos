import { useContext } from 'react';
import { GlobalContext } from '../../context/global';
import Pixels from '../../resources/Pixels';

const pixels = Pixels.getInstance();

const Placeholder = () => {
  const { colors } = useContext(GlobalContext);

  return (
    <>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
      <div
        style={{
          padding: pixels.p1,
          background: colors.bgLight,
          borderRadius: pixels.r1,
          marginBottom: pixels.p1,
        }}
      >
        <p style={{ background: colors.bgLight, padding: pixels.p1 }} />
      </div>
    </>
  );
};

export default Placeholder;
