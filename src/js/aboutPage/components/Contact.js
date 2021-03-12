import { Fragment } from 'react'
import { ContactForm } from './ContactForm'

function ContactUI() {
  return (
    <Fragment>
      <h2>Contact</h2>
      <p>You can contact me using the form below.</p>
      <ContactForm />
    </Fragment>
  )
}

export const Contact = ContactUI
