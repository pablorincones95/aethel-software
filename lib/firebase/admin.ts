import { initializeApp, getApps, cert, deleteApp, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"
import { getAuth, type Auth } from "firebase-admin/auth"

interface AdminServices {
  app: App | null
  db: Firestore | null
  auth: Auth | null
}

declare global {
  // eslint-disable-next-line no-var
  var _firebaseAdminApp: App | undefined
  // eslint-disable-next-line no-var
  var _firebaseAdminDb: Firestore | undefined
  // eslint-disable-next-line no-var
  var _firebaseAdminAuth: Auth | undefined
  // eslint-disable-next-line no-var
  var _firebaseAdminCredKey: string | undefined
}

export function getAdminServices(): AdminServices {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY

  // If Service Account credentials are not set, return null gracefully
  // so the application and Next.js build never fail with ADC credential errors
  if (!projectId || !clientEmail || !privateKey) {
    return { app: null, db: null, auth: null }
  }

  // Handle potential extra quotes or escaped newlines from .env formatting
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1)
  }
  privateKey = privateKey.replace(/\\n/g, "\n")

  const credKey = `${projectId}::${clientEmail}::${privateKey.length}`

  // If already initialized with the exact current credentials, reuse singleton
  if (
    globalThis._firebaseAdminApp &&
    globalThis._firebaseAdminDb &&
    globalThis._firebaseAdminAuth &&
    globalThis._firebaseAdminCredKey === credKey
  ) {
    return {
      app: globalThis._firebaseAdminApp,
      db: globalThis._firebaseAdminDb,
      auth: globalThis._firebaseAdminAuth,
    }
  }

  // Clear any existing stale or unauthenticated app instances in this Node process
  const existingApps = getApps()
  for (const existingApp of existingApps) {
    try {
      deleteApp(existingApp)
    } catch {
      // ignore
    }
  }

  const app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })

  const db = getFirestore(app)
  const auth = getAuth(app)

  globalThis._firebaseAdminApp = app
  globalThis._firebaseAdminDb = db
  globalThis._firebaseAdminAuth = auth
  globalThis._firebaseAdminCredKey = credKey

  return {
    app,
    db,
    auth,
  }
}

