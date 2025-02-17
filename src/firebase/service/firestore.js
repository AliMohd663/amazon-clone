import { db } from '../init';
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

export const FirestoreService = {
  // Generic document operations
  getDocument: async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  addDocument: async (collectionName, data) => {
    return addDoc(collection(db, collectionName), data);
  },

  updateDocument: async (collectionName, docId, data) => {
    const docRef = doc(db, collectionName, docId);
    return updateDoc(docRef, data);
  },

  deleteDocument: async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    return deleteDoc(docRef);
  },

  // Query helper
  queryBuilder: (collectionName, field, operator, value) => {
    return query(
      collection(db, collectionName),
      where(field, operator, value)
    );
  }
};