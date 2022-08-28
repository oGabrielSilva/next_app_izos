import { useContext } from 'react';
import AddCharacterContextProvider from '../../context/addCharacter';
import { GlobalContext } from '../../context/global';
import { HomeContext, NavButtons } from '../../context/home';
import { TColors } from '../../resources/Colors';
import Pixels from '../../resources/Pixels';
import AddCharacter from './AddCharacter';
import Placeholder from './Placeholder';

type TItemProps = { colors: TColors; navSelected: NavButtons };

const pixels = Pixels.getInstance();

const Item = ({ navSelected, colors }: TItemProps) => {
  switch (navSelected) {
    case NavButtons.AddCharacter:
      return (
        <AddCharacterContextProvider>
          <AddCharacter colors={colors} />
        </AddCharacterContextProvider>
      );

    default:
      return <Placeholder />;
  }
};

const Main = () => {
  const { navOpen, navSelected, loading } = useContext(HomeContext);
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
      {loading ? <Placeholder /> : <Item colors={colors} navSelected={navSelected} />}
    </div>
  );
};

export default Main;
