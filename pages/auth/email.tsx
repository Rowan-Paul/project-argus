import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

export default function EmailSignUp() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [session, loadingSession] = useSession()
  const router = useRouter()

  const registerUser = (event) => {
    event.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('file', image)
    data.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET
    )
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME)
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: 'post',
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        // Well this isn't really that pretty is it?
        fetch('/api/auth/register', {
          body: JSON.stringify({
            id: session.id,
            name: event.target.name.value,
            image: data.url,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
          .then(async (res) => {
            setLoading(false)
            if (res.status === 201) {
              router.push('/dashboard')
            } else {
              throw new Error('Failed')
            }
          })
          .catch((error) => {
            setError(true)
          })
      })
      .catch((err) => setError(true))
  }

  if (error) {
    return <p>Failed sign up</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (!loadingSession) {
    if (!session) {
      signIn()
    }
    if (session.user.name) {
      router.push('/dashboard')
    }

    return (
      <form
        onSubmit={registerUser}
        className="max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10"
      >
        <h2 className="text-2xl font-bold text-center">Account details</h2>
        <div className="relative border-b-2 focus-within:border-blue-500">
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            className="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label
            htmlFor="name"
            className="absolute top-0 -z-1 duration-300 origin-0"
          >
            Username
          </label>
        </div>
        <div className="relative border-b-2 focus-within:border-blue-500">
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label
            htmlFor="image"
            className="absolute top-0 -z-1 duration-300 origin-0"
          >
            Profile Picture
          </label>
        </div>
        <button type="submit" className="p-3 text-white bg-green-400">
          Submit
        </button>
      </form>
    )
  }

  return 'Loading...'
}
