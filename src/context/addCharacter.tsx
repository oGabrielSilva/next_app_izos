import Head from 'next/head';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import CharacterData from '../Model/CharacterData';
import Persona from '../Model/Persona';
import getStrings from '../resources/strings';
import ImageController from '../utils/Image';
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
  savePersona: () => Promise<string>;
  draftPersona: () => Promise<string>;
};

export const AddCharacterContext = createContext<TAddCharacterContext>({} as TAddCharacterContext);

const AddCharacterContextProvider = ({ children }: TAddCharacterProps) => {
  const { user } = useContext(HomeContext);

  const [personId, setPersonId] = useState('');
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
      const image = new FileReader();
      image.readAsDataURL(personImage!);
      if (user && user.uid) {
        image.onload = () => {
          ImageController.resizeBase64(image.result as string, 150).then((result) => {
            resolve(
              new Persona(
                result as string,
                personName,
                personTitle,
                personGender,
                personPresentation,
                personOrigin,
                personDetails,
                personHistory,
                personId,
                user.uid
              )
            );
          });
        };
      } else resolve({} as Persona);
    });
    return p;
  }, [
    personDetails,
    personGender,
    personHistory,
    personId,
    personImage,
    personName,
    personOrigin,
    personPresentation,
    personTitle,
    user,
  ]);

  const savePersona = useCallback(async () => {
    if (!personImage || !personName) return strings.personaNameAndImageRequired;
    try {
      const persona = await getPersona();
      setPersonId(persona.getId());
      await fetch('/api/personas/save', { method: 'POST', body: JSON.stringify(persona) });
      return strings.success;
    } catch (error) {
      return strings.unexpected;
    }
  }, [getPersona, personImage, personName]);

  const draftPersona = useCallback(async () => {
    if (!personImage || !personName) return strings.personaNameAndImageRequired;
    try {
      const persona = await getPersona();
      setPersonId(persona.getId());
      await fetch('/api/personas/draft', { method: 'POST', body: JSON.stringify(persona) });
      return strings.success;
    } catch (error) {
      return strings.unexpected;
    }
  }, [getPersona, personImage, personName]);

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

  return (
    <>
      <Head>
        <title>IzanamiOS - {strings.character}</title>
      </Head>
      <AddCharacterContext.Provider value={value}>{children}</AddCharacterContext.Provider>
    </>
  );
};

export default AddCharacterContextProvider;
