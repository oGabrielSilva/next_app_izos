import Image from 'next/image';
import { useContext } from 'react';
import { GlobalContext } from '../../context/global';
import { HomeContext } from '../../context/home';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';
import DivisionTitle from '../DivisionTitle';

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
          borderRadius: pixels.r2,
          marginRight: navOpen ? pixels.p1 : 0,
          background: colors.bgLight,
          padding: navOpen ? pixels.p2 : 0,
          borderTop: '5px solid ' + colors.bg,
          borderBottom: '5px solid ' + colors.bg,
          height: `calc(100vh - ${pixels.hHeader}px)`,
          maxHeight: 740,
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
              marginRight: navOpen ? pixels.p1 : 0,
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
            style={{
              background: colors.bg,
              color: colors.text,
              display: navOpen ? 'inline-block' : 'none',
            }}
          />
        </div>
        <div>
          <div>
            <DivisionTitle>{strings.lore}</DivisionTitle>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
