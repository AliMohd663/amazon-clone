import { auth } from '../init';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from 'firebase/auth';

export const AuthService = {
  signUp: async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  login: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  resetPassword: async (email) => {
    return sendPasswordResetEmail(auth, email);
  },

  updateEmail: async (newEmail) => {
    return updateEmail(auth.currentUser, newEmail);
  },

  updatePassword: async (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  }
};