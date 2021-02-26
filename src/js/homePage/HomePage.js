import { Backdrop } from '../components/Backdrop'
import { IntroText } from './components/IntroText'

function HomePageUI() {
  return (
    <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 h-screen">
      <Backdrop />
      <IntroText />
    </div>
  )
}

export const HomePage = HomePageUI
