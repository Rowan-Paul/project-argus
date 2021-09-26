import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'

const Layout = ({ children }): JSX.Element => {
  return (
    <div className="min-h-screen m-0 flex flex-col">
      <Navbar />
      <main className="my-5 md:px-10">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
