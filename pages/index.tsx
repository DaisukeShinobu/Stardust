import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AuthProvider } from '../auth/AuthProvider'
import { signInWithGoogle } from '../auth/GoogleAuthProvider'
import SignInSide from '../component/Login'

export default function top() {
  return (
    <AuthProvider>
    <SignInSide />
    </AuthProvider>
  )
};





