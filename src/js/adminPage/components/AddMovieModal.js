import { useState, useEffect } from 'react'
import { AddMovieForm } from './AddMovieForm'

function AddMovieModalUI(props) {
  const [position, setPosition] = useState('')

  useEffect(() => {
    setPosition(props.position)
  }, [setPosition, props.position])

  const crossIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  return (
    <div
      id="modal"
      className={`${position} bg-white dark:bg-black dark:text-white inset-0 border-black dark:border-white border-2 mx-5 lg:mx-72 my-20 p-5 overflow-auto`}
    >
      <span
        className="block text-center ml-5 float-right cursor-pointer sticky top-0 right-0"
        onClick={() => props.setPosition('hidden')}
      >
        {crossIcon}
      </span>

      <div className="block p-5">
        <h1>Add movie</h1>
        <p>Manually add a movie to the application</p>
        <AddMovieForm onModalSubmit={() => props.setPosition('hidden')} />
      </div>
    </div>
  )
}

export const AddMovieModal = AddMovieModalUI
