export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas-void px-4">
      <div className="max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-primary-container">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-on-primary">
              A
            </span>
          </div>
          <h1 className="text-headline-lg text-text-ice">
            Aethel Software
          </h1>
        </div>

        <p className="text-label-caps mb-4 text-primary-container">
          Precision Engineering Atelier
        </p>

        <p className="text-body-lg mb-8 text-text-muted">
          Corporate landing page — Coming soon. Design specs pending.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="/admin"
            className="inline-flex h-9 items-center justify-center rounded-[4px] border border-[rgba(255,255,255,0.1)] bg-transparent px-4 text-sm font-medium text-text-ice transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary-container"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </main>
  )
}
