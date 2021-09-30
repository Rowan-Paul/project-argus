import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'

const CenterLayout = ({ children }): JSX.Element => {
  return (
    <div className="min-h-screen m-0 flex flex-col">
      <Navbar />
      <main className="flex flex-col justify-center w-full flex-1 py-16 px-5 md:p-20 text-center h-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default CenterLayout
