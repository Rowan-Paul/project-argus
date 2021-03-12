import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { AddAdminForm } from './components/AddAdminForm'
import { AddMovieModal } from './components/AddMovieModal'
import { EditMovieModal } from './components/EditMovieModal'

function AdminPageUI(props) {
  const [addMoviePosition, setAddMoviePosition] = useState('hidden')
  const [editMoviePosition, setEditMoviePosition] = useState('hidden')

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setAddMoviePosition('hidden')
        setEditMoviePosition('hidden')
      }
    })

    document.addEventListener(
      'click',
      function (event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
        if (
          !event.target.closest('#modal') &&
          !event.target.closest('#button')
        ) {
          setAddMoviePosition('hidden')
          setEditMoviePosition('hidden')
        }
      },
      false
    )
  }, [])

  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Admin</h1>
      <p>
        Hi there {props.firstName}, on this page you can administrate the site.
      </p>
      <div className="lg:grid grid-cols-2 gap-10 lg:p-10">
        <div>
          <h2>Add admin</h2>
          <p>
            You can select another account to become an administrator on this
            page.
          </p>

          <AddAdminForm />
        </div>

        <div>
          <h2>User messages</h2>
          <p>These are messages left by users on the about page.</p>
        </div>

        <div>
          <h2>Manage movies</h2>
          <p>You can add, remove or edit movies by searching for them here.</p>

          <span
            id="button"
            className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 inline-block mr-5"
            onClick={() => setAddMoviePosition('fixed')}
          >
            Manually Add
          </span>

          <span
            id="button"
            className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 inline-block"
            onClick={() => setEditMoviePosition('fixed')}
          >
            Edit or Remove
          </span>

          <AddMovieModal
            position={addMoviePosition}
            setPosition={() => setAddMoviePosition('hidden')}
          />

          <EditMovieModal
            position={editMoviePosition}
            setPosition={() => setEditMoviePosition('hidden')}
          />
        </div>

        <div>
          <h2>Donations</h2>
          <p>Here you can see the latest donations</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  firstName: state.account.user.firstName,
})

const mapDispatchToProps = (dispatch) => ({})

export const AdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPageUI)
