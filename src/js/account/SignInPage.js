import { Backdrop } from '../components/Backdrop'
import { SignInField } from './components/SignInField'

function SignInPageUI() {
  return (
    <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 lg:h-screen">
      <div className="lg:flex lg:flex-col lg:justify-center mt-20 mx-10 lg:m-10">
        <h1 className="block w-full mb-6">Sign In</h1>
        <SignInField />
      </div>
      <div className="hidden lg:grid">
        <Backdrop />
      </div>
    </div>
  )
}

export const SignInPage = SignInPageUI
