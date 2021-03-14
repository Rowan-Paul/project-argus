import React from 'react'
import { useLocation } from 'react-router-dom'

function FooterUI() {
  const noFooterPages = ['/signin', '/', '/signup']
  const location = useLocation()

  if (noFooterPages.includes(location.pathname)) {
    return ''
  } else {
    return (
      <footer className="text-center">
        <p>Copyright &copy; {new Date().getFullYear()} Rowan Paul Flynn</p>
      </footer>
    )
  }
}

export const Footer = FooterUI
