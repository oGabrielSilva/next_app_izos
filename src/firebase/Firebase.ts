import { getStorage, ref, UploadResult, uploadBytes, uploadString } from 'firebase/storage';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';

import Env from '../Env/Env';
import getStrings from '../resources/strings';

type TResponse = { user: User | null; error: { code: string; message: string } | null };
type TResponseStorage = {
  ref: UploadResult | null;
  error: { code: string; message: string } | null;
};

const app = getApps().length ? getApp() : initializeApp(Env.firebaseConfig());
const auth = getAuth();

const storage = getStorage();

const { unexpected } = getStrings();

class Firebase {
  public app = app;

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

  public async uploadImage(file: string, path: string, userUid: string) {
    const response: TResponseStorage = { error: { code: '', message: '' }, ref: null };
    try {
      const storageRef = ref(storage, `images/${path}/${userUid}`);
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

  public async findUserByUid(uid: string) {}
}

export default new Firebase();
