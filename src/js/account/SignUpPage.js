import { Backdrop } from '../components/Backdrop'
import { SignUpForm } from './components/SignUpForm'

function SignUpPageUI() {
  return (
    <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 h-screen">
      <div className="md:flex md:flex-col md:justify-center mt-20 mx-10 md:m-10">
        <h1 className="block w-full mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
      <div className="hidden md:grid">
        <Backdrop />
      </div>
    </div>
  )
}

export const SignUpPage = SignUpPageUI
