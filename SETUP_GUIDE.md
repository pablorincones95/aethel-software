# Guía de Configuración: Supabase, Resend y Panel Admin

Esta guía te explica paso a paso cómo dejar tu base de datos, sistema de correos y panel de administración 100% operativos en menos de 5 minutos.

---

## 1. Configuración de Supabase (Base de Datos & Auth)

### Paso 1: Crear proyecto
1. Ingresa a [supabase.com](https://supabase.com) e inicia sesión.
2. Haz clic en **New Project**, asígnale nombre (ej. `aethel-software`), contraseña de base de datos y selecciona la región más cercana.

### Paso 2: Ejecutar el Schema SQL
1. En el menú lateral izquierdo de Supabase, ve a **SQL Editor**.
2. Abre el archivo [`supabase/schema.sql`](./supabase/schema.sql) de este proyecto, copia todo su contenido y pégalo en el editor SQL.
3. Haz clic en **Run** (o Ctrl/Cmd + Enter).
   - Esto creará automáticamente las tablas: `projects`, `site_content`, `contact_leads`.
   - Configurará los triggers de fecha, índices de rendimiento y las políticas de seguridad **Row Level Security (RLS)**.
   - Insertará las semillas de contenido inicial para todas las secciones del sitio y los proyectos del portafolio.

### Paso 3: Crear el Usuario Administrador
1. En el menú lateral de Supabase, ve a **Authentication** → **Users**.
2. Haz clic en **Add user** → **Create user**.
3. Ingresa tu correo (ej. `admin@aethel.software` o tu email personal) y una contraseña segura.
4. Marca la casilla **Auto Confirm User?** para que puedas entrar de inmediato sin confirmar por email.
5. Haz clic en **Create user**.

### Paso 4: Obtener tus Claves de API
1. En el menú lateral de Supabase, ve a **Project Settings** (icono de engranaje) → **API**.
2. Copia los siguientes valores:
   - **Project URL**
   - **Project API Keys** → `anon` `public`

---

## 2. Configuración de Resend (Notificaciones por Email)

### Paso 1: Obtener API Key
1. Ingresa a [resend.com](https://resend.com) e inicia sesión (puedes entrar con GitHub o Google).
2. En el menú lateral, ve a **API Keys** y haz clic en **Create API Key**.
3. Asígnale un nombre (ej. `Aethel Production`) y permisos **Full access**.
4. Copia la clave generada (empieza por `re_...`).

### Paso 2: Configurar remitente y destinatario
- Durante el periodo de prueba gratuita, puedes usar el remitente de pruebas oficial de Resend:
  `Aethel Software <onboarding@resend.dev>`
- Resend enviará los correos al email de tu cuenta registrada en Resend.
- *(Opcional más adelante)*: En la pestaña **Domains** puedes agregar tu propio dominio corporativo (`aethel.software`) y validar los registros DNS para enviar desde tu propio dominio.

---

## 3. Configurar tu archivo `.env.local`

Crea o abre el archivo `.env.local` en la raíz del proyecto y coloca:

```env
# ── Supabase ──
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-publica

# ── Resend ──
RESEND_API_KEY=re_tu_clave_de_resend
CONTACT_NOTIFICATION_EMAIL=tu-email-donde-quieres-recibir-los-leads@gmail.com
RESEND_FROM_EMAIL=Aethel Software <onboarding@resend.dev>
```

---

## 4. Iniciar y Probar el Sistema

Ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

### Probar el Panel de Control:
1. Entra a `http://localhost:3000/admin/login`
2. Inicia sesión con el correo y contraseña que creaste en Supabase.
3. ¡Listo! Accederás a la consola:
   - **/admin**: Resumen de proyectos, CMS y leads recibidos.
   - **/admin/projects**: Agrega, edita o elimina casos de estudio del portafolio.
   - **/admin/content**: Edita los textos de cualquier sección (Hero, Servicios, Diseño & SEO, IA, Stack, Metodología, Filosofía, Contacto). Al guardar, se actualizan de inmediato en la landing page.
   - **/admin/leads**: Administra las solicitudes técnicas recibidas desde la landing.

### Probar el Formulario de Contacto:
1. Ve a la página principal `http://localhost:3000/#contacto-evaluacion`
2. Llena y envía el formulario de contacto.
3. Se registrará al instante en la tabla `contact_leads` y recibirás la notificación formateada en tu correo a través de Resend.
