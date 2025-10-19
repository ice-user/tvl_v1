import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  firebaseMeasurementId,
} = Constants.expoConfig.extra;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};
console.log('✅ Firebase config:', {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  appId: firebaseAppId,
});


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export {auth};r
     
