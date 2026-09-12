import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { firebaseConfig, isFirebaseConfigured } from "./config"

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

export function getFirebaseClient() {
  if (!isFirebaseConfigured()) {
    return { app: null, auth: null, db: null }
  }

  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
  }

  return { app, auth, db }
}
