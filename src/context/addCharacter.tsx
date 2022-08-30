import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CharacterData from '../Model/CharacterData';
import Persona from '../Model/Persona';
import getStrings from '../resources/strings';
import Constants from '../utils/Constants';
import { HomeContext } from './home';

const strings = getStrings();

type TAddCharacterProps = {
  children: ReactNode;
};

export type TGender = 'M' | 'F' | 'O';

type TAddCharacterContext = {
  personImage: Blob | null;
  personName: string;
  personTitle: string;
  personGender: TGender;
  personPresentation: string;
  personOrigin: string;
  personDetails: CharacterData[];
  personHistory: CharacterData[];
  setPersonHistory: (value: CharacterData[]) => void;
  setPersonDetails: (value: CharacterData[]) => void;
  setPersonImage: (value: Blob | null) => void;
  setPersonName: (value: string) => void;
  setPersonTitle: (value: string) => void;
  setPersonGender: (value: TGender) => void;
  setPersonPresentation: (value: string) => void;
  setPersonOrigin: (value: string) => void;
  savePersona: () => void;
  draftPersona: () => Promise<string>;
};

export const AddCharacterContext = createContext<TAddCharacterContext>({} as TAddCharacterContext);

const AddCharacterContextProvider = ({ children }: TAddCharacterProps) => {
  const { user } = useContext(HomeContext);

  const [personImage, setPersonImage] = useState<Blob | null>(null);
  const [personName, setPersonName] = useState<string>('');
  const [personTitle, setPersonTitle] = useState<string>('');
  const [personGender, setPersonGender] = useState<TGender>('F');
  const [personPresentation, setPersonPresentation] = useState<string>('');
  const [personOrigin, setPersonOrigin] = useState<string>('');
  const [personHistory, setPersonHistory] = useState<CharacterData[]>([]);
  const [personDetails, setPersonDetails] = useState<CharacterData[]>([
    new CharacterData(strings.species, ''),
    new CharacterData(strings.race, ''),
    new CharacterData(strings.age, ''),
  ]);

  const getPersona = useCallback(() => {
    const p: Promise<Persona> = new Promise((resolve) => {
      const im = new FileReader();
      im.readAsDataURL(personImage!);
      if (user && user.uid) {
        im.onload = () =>
          resolve(
            new Persona(
              im.result,
              personName,
              personTitle,
              personGender,
              personPresentation,
              personOrigin,
              personDetails,
              personHistory,
              null,
              user.uid
            )
          );
      } else resolve({} as Persona);
    });
    return p;
  }, [
    personDetails,
    personGender,
    personHistory,
    personImage,
    personName,
    personOrigin,
    personPresentation,
    personTitle,
    user,
  ]);

  const savePersona = useCallback(() => {}, []);

  const draftPersona = useCallback(async () => {
    if (!personImage || !personName) return strings.personaNameAndImageRequired;
    try {
      const persona = await getPersona();
      fetch('/api/upload/images', { method: 'POST', body: JSON.stringify(persona) });
      return strings.success;
    } catch (error) {
      return strings.unexpected;
    }
  }, [getPersona, personImage, personName]);

  useEffect(() => {
    class Nameeeeeeeeeee {}

    console.log(new Nameeeeeeeeeee().constructor.name);
  });

  const value = useMemo(
    () => ({
      personImage,
      personName,
      personTitle,
      personGender,
      personOrigin,
      personPresentation,
      personDetails,
      personHistory,
      setPersonHistory,
      setPersonDetails,
      setPersonPresentation,
      setPersonGender,
      setPersonName,
      setPersonImage,
      setPersonTitle,
      setPersonOrigin,
      savePersona,
      draftPersona,
    }),
    [
      personDetails,
      personGender,
      personHistory,
      personImage,
      personName,
      personOrigin,
      personPresentation,
      personTitle,
      savePersona,
      draftPersona,
    ]
  );

  return <AddCharacterContext.Provider value={value}>{children}</AddCharacterContext.Provider>;
};

export default AddCharacterContextProvider;
