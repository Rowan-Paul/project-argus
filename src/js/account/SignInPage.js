import { Backdrop } from '../components/Backdrop'
import { SignInForm } from './components/SignInForm'

function SignInPageUI() {
  return (
    <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 md:h-screen">
      <div className="md:flex md:flex-col md:justify-center mt-20 mx-10 md:m-10">
        <h1 className="block w-full mb-6">Sign In</h1>
        <SignInForm />
      </div>
      <div className="hidden md:grid">
        <Backdrop />
      </div>
    </div>
  )
}

export const SignInPage = SignInPageUI
