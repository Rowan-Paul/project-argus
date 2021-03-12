import { AddAdminForm } from './AddAdminForm'

function AddAdminUI() {
  return (
    <div className="mb-10 lg:mb-auto">
      <h2>Add admin</h2>
      <p>
        You can select another account to become an administrator on this page.
      </p>
      <AddAdminForm />
    </div>
  )
}

export const AddAdmin = AddAdminUI
