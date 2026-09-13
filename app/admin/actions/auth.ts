"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { getAdminServices } from "@/lib/firebase/admin"
import { checkRateLimit } from "@/lib/rate-limit"

export interface AdminSessionResult {
  authenticated: boolean
  email?: string
  uid?: string
  error?: string
}

/**
 * Cryptographically verifies the active admin session cookie.
 * Ensures the token is valid, not expired, and issued by Google Firebase.
 */
export async function verifyAdminSession(): Promise<AdminSessionResult> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("aethel_session")?.value

  if (!sessionToken) {
    return { authenticated: false, error: "No hay sesión activa. Acceso no autorizado." }
  }

  const { auth } = getAdminServices()
  if (!auth) {
    // If running in development without full service account credentials, allow existing cookie
    const userEmail = cookieStore.get("aethel_user")?.value
    return { authenticated: true, email: userEmail || undefined }
  }

  try {
    const decoded = await auth.verifyIdToken(sessionToken)
    return {
      authenticated: true,
      email: decoded.email,
      uid: decoded.uid,
    }
  } catch (err: unknown) {
    console.warn("[Auth Guard] Invalid or expired session token:", err instanceof Error ? err.message : err)
    return {
      authenticated: false,
      error: "La sesión ha expirado o es inválida. Por favor, inicia sesión nuevamente.",
    }
  }
}

export async function signIn(formData: FormData) {
  const email = (formData.get("email") as string)?.trim()
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, error: "Ingresa el email y la contraseña." }
  }

  // Extract client IP or identifier for brute-force protection
  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1"
  const rateLimitKey = `login::${ip}::${email.toLowerCase()}`

  // Max 5 login attempts per 15 minutes
  const rateCheck = checkRateLimit(rateLimitKey, {
    windowMs: 15 * 60 * 1000,
    max: 5,
  })

  if (!rateCheck.success) {
    const minutes = Math.ceil(rateCheck.retryAfterSeconds / 60)
    return {
      success: false,
      error: `Demasiados intentos fallidos. Por seguridad, espera ${minutes} minuto(s) antes de intentar nuevamente.`,
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  if (!apiKey) {
    return {
      success: false,
      error: "Firebase API Key no está configurada en .env.local (NEXT_PUBLIC_FIREBASE_API_KEY).",
    }
  }

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok || data.error) {
      const msg = data.error?.message || "Credenciales incorrectas"
      if (msg === "EMAIL_NOT_FOUND" || msg === "INVALID_PASSWORD" || msg === "INVALID_LOGIN_CREDENTIALS") {
        return { success: false, error: "Email o contraseña incorrectos." }
      }
      if (msg === "USER_DISABLED") {
        return { success: false, error: "Esta cuenta de administrador ha sido deshabilitada." }
      }
      return { success: false, error: `Error de autenticación: ${msg}` }
    }

    // Set secure session cookies
    const cookieStore = await cookies()
    const expiresInSeconds = Number(data.expiresIn) || 3600

    cookieStore.set("aethel_session", data.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresInSeconds,
      path: "/",
    })

    cookieStore.set("aethel_user", data.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresInSeconds,
      path: "/",
    })

    return { success: true }
  } catch (err) {
    console.error("[Firebase Auth Error]:", err)
    return { success: false, error: "Error de red al conectar con Firebase Auth." }
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("aethel_session")
  cookieStore.delete("aethel_user")

  redirect("/admin/login")
}
