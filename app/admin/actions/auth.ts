"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, error: "Ingresa el email y la contraseña." }
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
