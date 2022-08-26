import Image from 'next/image';
import { useContext } from 'react';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';

const pixels = Pixels.getInstance();
const strings = getStrings();

const NavMenu = () => {
  const { isMobile, colors, setThemeMode } = useContext(GlobalContext);
  const { navOpen } = useContext(HomeContext);

  return (
    <div>
      <nav
        style={{
          position: 'sticky',
          marginRight: navOpen ? pixels.p1 : 0,
          background: colors.bgLight,
          padding: navOpen ? pixels.p2 : 0,
          borderTop: '5px solid ' + colors.bg,
          borderBottom: '5px solid ' + colors.bg,
          height: `calc(100vh - ${pixels.hHeader}px)`,
          ...(isMobile
            ? {
                width: navOpen ? pixels.wNav.mobile : 0,
              }
            : {
                width: navOpen ? pixels.wNav.default : 0,
                maxWidth: pixels.wNav.max,
              }),
        }}
      >
        <div style={{ display: 'flex' }}>
          <button
            style={{
              cursor: 'pointer',
              background: colors.bgLight,
              marginRight: pixels.p1,
            }}
            onClick={setThemeMode}
          >
            <Image
              src={colors.mode === 'light' ? '/images/svg/moon.svg' : '/images/svg/sunny.svg'}
              width={30}
              height={30}
              alt=""
            />
          </button>
          <input
            type="search"
            placeholder={strings.search}
            style={{ background: colors.bg, color: colors.text }}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
