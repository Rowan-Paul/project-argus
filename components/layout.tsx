import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export function MinimalLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="px-10">{children}</main>
      <Footer />
    </>
  )
}

export function MovieLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="px-10">{children}</main>
      <Footer />
    </div>
  )
}
