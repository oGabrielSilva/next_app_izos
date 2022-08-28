import Image from 'next/image';
import { ReactNode, useContext } from 'react';
import { GlobalContext } from '../../context/global';
import { HomeContext, NavButtons } from '../../context/home';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';
import getStrings from '../../resources/strings';
import DivisionTitle from '../DivisionTitle';
import Text from '../Text';

const pixels = Pixels.getInstance();
const strings = getStrings();

type TButtonNavProps = { colors: TColors; type: NavButtons; children?: ReactNode };

const ButtonNav = ({ colors, type, children }: TButtonNavProps) => {
  const { navSelected, setNavSelected, navOpen } = useContext(HomeContext);

  return (
    <button
      onClick={() => setNavSelected(type)}
      id="nav-menu-button"
      style={{
        background: type === navSelected ? colors.bg : colors.bgLight,
        width: '100%',
        padding: pixels.p0,
        paddingLeft: type === navSelected ? pixels.p1 : pixels.p0,
        transition: '0.2s linear',
        borderRadius: pixels.r3,
        display: navOpen ? 'inline-block' : 'none',
      }}
    >
      {children}
    </button>
  );
};

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
        {navOpen ? <DivisionTitle /> : null}
        <div style={{ marginTop: pixels.p0 }}>
          <ButtonNav type={NavButtons.Home} colors={colors}>
            <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined">auto_awesome_mosaic</span>
              <span style={{ marginLeft: pixels.p0 }}>{strings.home}</span>
            </Text>
          </ButtonNav>
        </div>
        <div style={{ marginTop: pixels.p0 }}>
          <ButtonNav type={NavButtons.Galery} colors={colors}>
            <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined">folder_open</span>
              <span style={{ marginLeft: pixels.p0 }}>{strings.galery}</span>
            </Text>
          </ButtonNav>
        </div>
        <div style={{ marginTop: pixels.p0 }}>
          <ButtonNav type={NavButtons.Notifications} colors={colors}>
            <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined">notifications</span>
              <span style={{ marginLeft: pixels.p0 }}>{strings.notifications}</span>
            </Text>
          </ButtonNav>
        </div>
        <div>
          <div>{navOpen ? <DivisionTitle>{strings.lore}</DivisionTitle> : null}</div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.AddCharacter} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">add</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.character}</span>
              </Text>
            </ButtonNav>
          </div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.AddObject} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">add</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.object}</span>
              </Text>
            </ButtonNav>
          </div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.AddAblity} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">add</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.ability}</span>
              </Text>
            </ButtonNav>
          </div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.AddSheet} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">add</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.sheet}</span>
              </Text>
            </ButtonNav>
          </div>
        </div>
        <div>
          <div>{navOpen ? <DivisionTitle>{strings.advanced}</DivisionTitle> : null}</div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.Session} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">casino</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.session}</span>
              </Text>
            </ButtonNav>
          </div>
          <div style={{ marginTop: pixels.p0 }}>
            <ButtonNav type={NavButtons.Book} colors={colors}>
              <Text containerStyle={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">book</span>
                <span style={{ marginLeft: pixels.p0 }}>{strings.book}</span>
              </Text>
            </ButtonNav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
