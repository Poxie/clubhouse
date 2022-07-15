import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, GithubAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { ReactElement } from 'react';

// Initializing firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbPDdtS4Cf0iQa03_zxes77Hr7PZyv1WM",
  authDomain: "clubhouse-8c25a.firebaseapp.com",
  projectId: "clubhouse-8c25a",
  storageBucket: "clubhouse-8c25a.appspot.com",
  messagingSenderId: "723360465284",
  appId: "1:723360465284:web:2dbbf16f39c7f44f30ddd1",
  measurementId: "G-1XBMFLD8DE"
};
firebase.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthLayer>
      <Component {...pageProps} />
    </AuthLayer>
  )
}

function AuthLayer({ children }: { children: ReactElement }) {
  const provider = new GithubAuthProvider();
  const auth = getAuth();

  // Checking for user data
  auth.onAuthStateChanged(user => {
    // Handle user is not logged in
    if(!user) {
      return signInWithRedirect(auth, provider);
    }

    // Handle user is logged in
  })

  return children;
}

export default MyApp