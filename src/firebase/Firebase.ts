import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';

import Env from '../Env/Env';
import getStrings from '../resources/strings';

type TResponse = { user: User | null; error: { code: string; message: string } | null };

const app = getApps().length ? getApp() : initializeApp(Env.firebaseConfig());
const auth = getAuth();

const { unexpected } = getStrings();

class Firebase {
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
}

export default new Firebase();
