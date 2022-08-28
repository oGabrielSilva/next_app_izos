import { createContext, ReactNode, useMemo, useState } from 'react';

type TAddCharacterProps = {
  children: ReactNode;
};

type TGender = 'M' | 'F' | 'O';

type TAddCharacterContext = {
  personImage: Blob | null;
  personName: string;
  personTitle: string;
  personGender: TGender;
  personRace: string;
  personAge: number;
  setPersonImage: (value: Blob | null) => void;
  setPersonName: (value: string) => void;
  setPersonTitle: (value: string) => void;
  setPersonGender: (value: TGender) => void;
  setPersonRace: (value: string) => void;
  setPersonAge: (value: number) => void;
};

export const AddCharacterContext = createContext<TAddCharacterContext>({} as TAddCharacterContext);

const AddCharacterContextProvider = ({ children }: TAddCharacterProps) => {
  const [personImage, setPersonImage] = useState<Blob | null>(null);
  const [personName, setPersonName] = useState<string>('');
  const [personTitle, setPersonTitle] = useState<string>('');
  const [personGender, setPersonGender] = useState<TGender>('F');
  const [personRace, setPersonRace] = useState<string>('');
  const [personAge, setPersonAge] = useState<number>(0);

  const value = useMemo(
    () => ({
      personImage,
      personName,
      personTitle,
      personRace,
      personGender,
      personAge,
      setPersonAge,
      setPersonGender,
      setPersonName,
      setPersonImage,
      setPersonRace,
      setPersonTitle,
    }),
    [personAge, personGender, personImage, personName, personRace, personTitle]
  );

  return <AddCharacterContext.Provider value={value}>{children}</AddCharacterContext.Provider>;
};

export default AddCharacterContextProvider;
