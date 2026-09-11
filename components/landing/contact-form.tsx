"use client"

import { useActionState } from "react"
import { submitContactForm } from "@/app/actions/contact"

const budgetOptions = ["$25k - $50k", "$50k - $100k", "$100k - $250k", "$250k+ Tier"]

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null
  )

  return (
    <form className="contact__form" action={formAction}>
      <div className="contact__form-row">
        <div>
          <label className="contact__field-label">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="p. ej. Elena Rostova"
            className="contact__field-input"
          />
        </div>
        <div>
          <label className="contact__field-label">
            Email Corporativo *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="elena@compania.com"
            className="contact__field-input"
          />
        </div>
      </div>

      <div className="contact__form-row">
        <div>
          <label className="contact__field-label">
            Organización / Empresa *
          </label>
          <input
            type="text"
            name="organization"
            required
            placeholder="Nombre de la entidad"
            className="contact__field-input"
          />
        </div>
        <div>
          <label className="contact__field-label">
            Servicio de Interés Principal
          </label>
          <select name="service" className="contact__field-input contact__field-select">
            <option>SaaS Enterprise / Web Platform</option>
            <option>Mobile App High-FPS (React Native)</option>
            <option>Cloud Infrastructure & EKS Migration</option>
            <option>APIs de Alta Concurrencia & Streaming Kafka</option>
            <option>Auditoría de Arquitectura & Refactoring</option>
          </select>
        </div>
      </div>

      <div>
        <label className="contact__budget-label">
          Rango Estimado de Presupuesto (USD)
        </label>
        <div className="contact__budget-grid">
          {budgetOptions.map((option, i) => (
            <label key={option} className="contact__budget-option">
              <input
                type="radio"
                name="budget"
                value={option}
                defaultChecked={i === 0}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="contact__field-label">
          Detalles del Proyecto & Desafíos Técnicos
        </label>
        <textarea
          name="details"
          rows={4}
          placeholder="Describe brevemente tus requerimientos de escalabilidad, stack actual o plazos estimados..."
          className="contact__field-input contact__field-textarea"
        />
      </div>

      <button
        type="submit"
        className="contact__submit"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Solicitar Evaluación Técnica"}
      </button>

      {state?.success && (
        <div className="contact__feedback contact__feedback--visible">
          ✓ Solicitud de evaluación recibida. Un arquitecto senior responderá en
          &lt;4 horas hábiles.
        </div>
      )}

      <div className="contact__security">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-secondary"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>Datos resguardados bajo estándar bancario AES-256</span>
      </div>
    </form>
  )
}
