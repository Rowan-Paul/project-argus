import { useState } from 'react'

function NightModeIconUI() {
  const [nightMode, setNightMode] = useState('')

  const moonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
  const lightbulbIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
    </svg>
  )

  const changeTheme = () => {
    if (localStorage.theme === 'dark') {
      setNightMode(false)
      localStorage.theme = 'light'
      document.querySelector('html').classList.remove('dark')
    } else {
      setNightMode(true)
      localStorage.theme = 'dark'
      document.querySelector('html').classList.add('dark')
    }
  }

  return (
    <li className="float-left cursor-pointer">
      <div className="block text-center p-4" onClick={changeTheme}>
        {nightMode ? lightbulbIcon : moonIcon}
      </div>
    </li>
  )
}

export const NightModeIcon = NightModeIconUI
