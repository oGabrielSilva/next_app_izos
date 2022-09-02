import { getDownloadURL, getStorage, ref, UploadResult, uploadString } from 'firebase/storage';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

import Env from '../Env/Env';
import getStrings from '../resources/strings';
import Persona from '../Model/Persona';
import UserModel from '../Model/User';

type TResponse = { user: User | null; error: { code: string; message: string } | null };
type TResponseStorage = {
  ref: UploadResult | null;
  error: { code: string; message: string };
};

type TResponseStorageProfile = {
  ref: UploadResult | null;
  url: string;
  error: { code: string; message: string };
};

const app = getApps().length ? getApp() : initializeApp(Env.firebaseConfig());
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const storage = getStorage();

const { unexpected } = getStrings();

class Firebase {
  public app = app;
  public provider = provider;

  public async loginUser(email: string, password: string) {
    const response: TResponse = {
      user: null,
      error: null,
    };
    try {
      const created = await signInWithEmailAndPassword(auth, email, password);
      response.user = created.user;
      return response;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.error = { code: errorCode, message: errorMessage };
        return response;
      } else {
        console.log(error);
        const errorCode = 'undefined';
        const errorMessage = unexpected;
        response.error = { code: errorCode, message: errorMessage };
        return response;
      }
    }
  }

  public async createUser(email: string, password: string): Promise<TResponse> {
    const response: TResponse = {
      user: null,
      error: null,
    };
    try {
      const created = await createUserWithEmailAndPassword(auth, email, password);
      response.user = created.user;
      return response;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.error = { code: errorCode, message: errorMessage };
        return response;
      } else {
        console.log(error);
        const errorCode = 'undefined';
        const errorMessage = 'undefined';
        response.error = { code: errorCode, message: errorMessage };
        return response;
      }
    }
  }

  public async uploadImage(file: string, path: string, userUid: string, uid: string) {
    const response: TResponseStorage = { error: { code: '', message: '' }, ref: null };
    try {
      const storageRef = ref(storage, `uploads/images/${path}/${userUid}/${uid}`);
      const snapshot = await uploadString(storageRef, file, 'data_url');
      response.ref = snapshot;
    } catch (error) {
      console.log(error);
      response.error = { code: '400', message: '' };
    } finally {
      console.log(response);
      return response;
    }
  }

  public async uploadProfile(file: string, path: string, userUid: string) {
    const response: TResponseStorageProfile = {
      error: { code: '', message: '' },
      url: '',
      ref: null,
    };
    try {
      const storageRef = ref(storage, `${path}/${userUid}`);
      const snapshot = await uploadString(storageRef, file, 'data_url');
      const url = await getDownloadURL(storageRef);
      response.ref = snapshot;
      response.url = url;
    } catch (error) {
      console.log(error);
      response.error = { code: '400', message: '' };
    } finally {
      return response;
    }
  }

  public async updateProfile(user: UserModel) {
    await setDoc(doc(db, 'users', user.getUid()), {
      ...user.getStorageDataServer(),
    });
  }

  public async getProfileData(uid: string) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  public async setDraftPersona(persona: Persona) {
    await setDoc(doc(db, 'drafts', persona.getId()!), persona.onlyData());
  }
}

export default new Firebase();
