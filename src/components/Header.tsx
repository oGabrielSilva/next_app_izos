import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { GlobalContext } from '../context/global';
import { HomeContext } from '../context/home';
import Pixels from '../resources/Pixels';
import getStrings from '../resources/strings';

type THeaderProps = {
  signOut: () => void;
};

const pixels = Pixels.getInstance();

const Header = ({ signOut }: THeaderProps) => {
  const { navOpen, setNavOpen, user } = useContext(HomeContext);
  const strings = getStrings();
  const { colors } = useContext(GlobalContext);

  return (
    <header
      style={{
        height: pixels.hHeader,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        background: colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 ' + pixels.p2,
      }}
    >
      <div>
        <button style={{ background: colors.bg }} onClick={() => setNavOpen(!navOpen)}>
          <Image
            src={colors.mode === 'dark' ? '/images/svg/menu-dark.svg' : '/images/svg/menu.svg'}
            width={35}
            height={35}
            alt={strings.profile}
            style={{ transition: '0.5s ease', ...(navOpen ? { transform: 'rotate(180deg)' } : {}) }}
          />
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginRight: pixels.p1 }}>
          <button style={{ background: colors.bg }}>
            <Link href="/profile">
              <Image
                src={
                  user && user.photoURL
                    ? user.photoURL
                    : colors.mode === 'dark'
                    ? '/images/svg/profile-dark.svg'
                    : '/images/svg/profile.svg'
                }
                width={35}
                height={35}
                alt={strings.profile}
                style={{ borderRadius: pixels.rM }}
              />
            </Link>
          </button>
        </div>
        <button onClick={signOut} style={{ background: colors.bg }}>
          <Image src="/images/svg/shutdown.svg" width={20} height={20} alt={strings.shutdown} />
        </button>
      </div>
    </header>
  );
};

export default Header;
