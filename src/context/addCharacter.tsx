import { createContext, ReactNode, useMemo, useState } from 'react';
import CharacterDetail from '../Model/CharacterDetail';
import getStrings from '../resources/strings';

const strings = getStrings();

type TAddCharacterProps = {
  children: ReactNode;
};

type TGender = 'M' | 'F' | 'O';

type TAddCharacterContext = {
  personImage: Blob | null;
  personName: string;
  personTitle: string;
  personGender: TGender;
  personPresentation: string;
  personOrigin: string;
  personDetails: CharacterDetail[];
  setPersonDetails: (value: CharacterDetail[]) => void;
  setPersonImage: (value: Blob | null) => void;
  setPersonName: (value: string) => void;
  setPersonTitle: (value: string) => void;
  setPersonGender: (value: TGender) => void;
  setPersonPresentation: (value: string) => void;
  setPersonOrigin: (value: string) => void;
};

export const AddCharacterContext = createContext<TAddCharacterContext>({} as TAddCharacterContext);

const AddCharacterContextProvider = ({ children }: TAddCharacterProps) => {
  const [personImage, setPersonImage] = useState<Blob | null>(null);
  const [personName, setPersonName] = useState<string>('');
  const [personTitle, setPersonTitle] = useState<string>('');
  const [personGender, setPersonGender] = useState<TGender>('F');
  const [personPresentation, setPersonPresentation] = useState<string>('');
  const [personOrigin, setPersonOrigin] = useState<string>('');
  const [personDetails, setPersonDetails] = useState<CharacterDetail[]>([
    new CharacterDetail(strings.species, ''),
    new CharacterDetail(strings.race, ''),
    new CharacterDetail(strings.age, ''),
  ]);

  const value = useMemo(
    () => ({
      personImage,
      personName,
      personTitle,
      personGender,
      personOrigin,
      personPresentation,
      personDetails,
      setPersonDetails,
      setPersonPresentation,
      setPersonGender,
      setPersonName,
      setPersonImage,
      setPersonTitle,
      setPersonOrigin,
    }),
    [
      personDetails,
      personGender,
      personImage,
      personName,
      personOrigin,
      personPresentation,
      personTitle,
    ]
  );

  return <AddCharacterContext.Provider value={value}>{children}</AddCharacterContext.Provider>;
};

export default AddCharacterContextProvider;
