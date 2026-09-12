import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"
import { getAuth, type Auth } from "firebase-admin/auth"

let adminApp: App | null = null
let adminDb: Firestore | null = null
let adminAuth: Auth | null = null

export function getAdminServices(): {
  app: App | null
  db: Firestore | null
  auth: Auth | null
} {
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

  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1)
  }
  privateKey = privateKey.replace(/\\n/g, "\n")

  if (!adminApp) {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      adminApp = existingApps[0]!
    } else {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    }

    adminDb = getFirestore(adminApp)
    adminAuth = getAuth(adminApp)
  }

  return {
    app: adminApp,
    db: adminDb,
    auth: adminAuth,
  }
}
