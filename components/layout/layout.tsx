import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full flex-1 py-16 px-5 md:p-20 text-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export function MinimalLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mt-5 md:mx-10">{children}</main>
    </div>
  )
}
