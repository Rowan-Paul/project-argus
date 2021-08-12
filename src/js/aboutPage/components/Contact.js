import { Link } from 'react-router-dom'

function ContactUI() {
  return (
    <div className="mb-10">
      <h2>Contact</h2>
      <p>
        Do you need a certain feature? Or have you found a bug? If that's the
        case or you just wanna say hi, you can contact me by{' '}
        <Link to="/about/contact">going to this page</Link> and filling in the
        form. I will email you back as soon as possible, so keep an eye on your
        email!
      </p>
    </div>
  )
}

export const Contact = ContactUI
