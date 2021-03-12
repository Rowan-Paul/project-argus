import { Backdrop } from '../components/Backdrop'
import { SignUpForm } from './components/SignUpForm'

function SignUpPageUI() {
  return (
    <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 h-screen">
      <div className="lg:flex lg:flex-col lg:justify-center mt-20 mx-10 lg:m-10">
        <h1 className="block w-full mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
      <div className="hidden lg:grid">
        <Backdrop />
      </div>
    </div>
  )
}

export const SignUpPage = SignUpPageUI
