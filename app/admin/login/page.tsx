"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, AlertCircle } from "lucide-react"
import { signIn } from "@/app/admin/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signIn(formData)
      if (result.success) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(result.error || "Credenciales incorrectas")
      }
    })
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#030712] px-4 text-[#f0f6fc] antialiased">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#00e5ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#e2c974]/5 blur-[120px]" />

      <div className="w-full max-w-md">
        {/* Monogram / Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-[#0e131f] shadow-[0_0_25px_rgba(0,229,255,0.15)]">
            <Image
              src="/aethel-logo.svg"
              alt="Aethel Logo"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
              className="opacity-95"
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00e5ff]">
            Precision Engineering Atelier
          </span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
            Panel de Control
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Ingresa tus credenciales administrativas para continuar
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0e131f]/80 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/30 p-3.5 text-xs text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-300"
              >
                Email Corporativo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@aethel.software"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#00e5ff] focus:outline-none focus:ring-1 focus:ring-[#00e5ff]"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-300"
                >
                  Contraseña
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#00e5ff] focus:outline-none focus:ring-1 focus:ring-[#00e5ff]"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2.5 font-display text-sm font-semibold text-[#030712] transition-all hover:bg-[#c3f5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Acceder al Sistema</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/5 pt-4 text-[11px] text-neutral-400">
            <ShieldCheck className="h-3.5 w-3.5 text-[#e2c974]" />
            <span>Acceso seguro protegido con Supabase Auth</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-neutral-400 transition-colors hover:text-[#00e5ff]"
          >
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  )
}
