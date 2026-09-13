# Guía de Configuración: Firebase, Resend y Panel Admin

Esta guía te explica paso a paso cómo dejar tu base de datos **Google Cloud Firestore**, **Firebase Authentication**, sistema de correos y panel de administración 100% operativos en el plan gratuito permanente (Spark).

---

## 1. Configuración de Firebase (Firestore & Auth)

### Paso 1: Crear proyecto en Firebase
1. Ingresa a [console.firebase.google.com](https://console.firebase.google.com) e inicia sesión con tu cuenta de Google.
2. Haz clic en **Crear un proyecto** (o *Add project*).
3. Escribe un nombre (ej. `aethel-software`), desactiva Google Analytics (opcional) y haz clic en **Crear proyecto**.

### Paso 2: Activar Cloud Firestore (Base de Datos)
1. En el menú lateral izquierdo, ve a **Compilación** (o *Build*) → **Firestore Database**.
2. Haz clic en **Crear base de datos**.
3. Elige la ubicación más cercana (ej. `nam5 (us-central)` o `us-east1`).
4. Selecciona **Modo de producción** y haz clic en **Habilitar**.
5. Ve a la pestaña **Reglas** (*Rules*) en Firestore:
   - Copia el contenido de [`firestore.rules`](./firestore.rules) de este repositorio.
   - Pégalo en el editor de reglas y haz clic en **Publicar** (*Publish*).

### Paso 3: Activar Firebase Authentication
1. En el menú lateral, ve a **Compilación** → **Authentication**.
2. Haz clic en **Comenzar** (*Get started*).
3. En la pestaña **Sign-in method** (Proveedores), selecciona **Correo electrónico/contraseña** (*Email/Password*).
4. Activa el primer interruptor (**Habilitar**) y haz clic en **Guardar**.
5. Ve a la pestaña **Users** (Usuarios) y haz clic en **Agregar usuario** (*Add user*).
   - Escribe el correo que usarás de administrador (ej. `admin@aethel.software` o tu email personal) y una contraseña.
   - Haz clic en **Agregar usuario**.

### Paso 4: Obtener las Claves Web (Firebase Client)
1. En la consola de Firebase, haz clic en el icono de engranaje ⚙️ (arriba a la izquierda) → **Configuración del proyecto** (*Project settings*).
2. En la pestaña **General**, baja hasta la sección **Tus apps** (*Your apps*).
3. Haz clic en el icono Web **`</>`**.
4. Ponle un apodo (ej. `Aethel Web`) y haz clic en **Registrar app**.
5. Verás el objeto `firebaseConfig`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### Paso 5: Obtener Claves del Servidor (Firebase Admin)
1. En la misma pantalla de **Configuración del proyecto**, ve a la pestaña **Cuentas de servicio** (*Service accounts*).
2. Haz clic en **Generar nueva clave privada** (*Generate new private key*).
3. Se descargará un archivo JSON en tu computadora. Ábrelo y copia:
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

---

## 2. Configuración de Resend (Emails de Notificación)

1. Ingresa a [resend.com](https://resend.com) y crea tu cuenta gratuita.
2. Ve a **API Keys** → **Create API Key**.
3. Copia tu clave (inicia con `re_...`).

---

## 3. Configurar tu archivo `.env.local`

Crea o edita tu archivo `.env.local` en la raíz del proyecto:

```env
# ── Firebase Client ──
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef

# ── Firebase Admin SDK ──
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD...\n-----END PRIVATE KEY-----\n"

# ── Resend ──
RESEND_API_KEY=re_tu_clave_de_resend
CONTACT_NOTIFICATION_EMAIL=tu-email-donde-recibiras-los-leads@gmail.com
RESEND_FROM_EMAIL=Aethel Software <onboarding@resend.dev>
```

---

## 4. Inicializar Datos (Semillas de Firestore)

Una vez que tengas tu `.env.local` con las variables de Firebase, ejecuta el siguiente comando para cargar automáticamente todas las secciones y proyectos iniciales a tu base de datos Firestore:

```bash
pnpm seed:firebase
```

Verás una confirmación en consola:
```
🚀 Starting Firestore seed...
📝 Seeding site_content...
  ✓ Section [hero] saved
  ✓ Section [services] saved
  ...
💼 Seeding projects...
  ✓ Project created with ID: ...
✅ Firestore seed complete!
```

---

## 5. Iniciar y Probar el Panel

Inicia el servidor:

```bash
pnpm dev
```

1. **Login de Admin**: Entra a `http://localhost:3000/admin/login` con las credenciales que creaste en Firebase Auth.
2. **CMS**: En `/admin/content`, edita cualquier sección y verifica que la landing se actualice.
3. **Proyectos**: En `/admin/projects`, agrega, edita o elimina casos de estudio.
4. **Leads**: En `/admin/leads`, revisa las solicitudes de contacto enviadas desde la landing.
