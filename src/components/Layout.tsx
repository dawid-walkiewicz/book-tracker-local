import { Navbar } from "./Navbar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="p-4 sm:px-8 lg:px-40">
        <div className="mx-auto max-w-4xl space-y-20">{children}</div>
      </main>
    </div>
  )
}
