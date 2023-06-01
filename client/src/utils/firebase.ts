import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD9BwDpP-QK8nC4YM_TcY-YsKfOTVACLT0',
  authDomain: 'ufotube-e1eda.firebaseapp.com',
  projectId: 'ufotube-e1eda',
  storageBucket: 'ufotube-e1eda.appspot.com',
  messagingSenderId: '57045724145',
  appId: '1:57045724145:web:5a3061c5076e4bbe8bb250',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()
export default app
