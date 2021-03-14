import { About } from './components/About'
import { Contact } from './components/Contact'
import { Attributions } from './components/Attributions'
import { Donations } from './components/Donations'

function AboutPageUI() {
  return (
    <div className="p-10 pt-20 md:p-20">
      <About />
      <Contact />
      <Donations />
      <Attributions />
    </div>
  )
}

export const AboutPage = AboutPageUI
