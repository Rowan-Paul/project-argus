import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import Loading from '../../components/loading'
import Layout from '../../components/layout/layout'
import MaterialIcon from '../../lib/materialIcons'

export default function AccountDetails() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(String)
  const [image, setImage] = useState(String)
  const [localImage, setLocalImage] = useState(String)
  const [session, loadingSession] = useSession()
  const router = useRouter()

  const registerUser = async (event) => {
    event.preventDefault()
    if (!document.getElementById('accountDetailsForm').checkValidity()) {
      setFormError(`Username cannot be empty or contain special characters`)
    } else {
      setFormError(undefined)
      setLoading(true)

      const imageUrl = await imageUpload()

      if (imageUrl) {
        fetch('/api/auth/register', {
          body: JSON.stringify({
            id: session.id,
            name: event.target.name.value,
            image: imageUrl.url ? imageUrl.url : undefined,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
          .then(async (res) => {
            if (res.status === 201) {
              router.push('/dashboard')
            } else {
              throw new Error('Failed')
            }
          })
          .catch((error) => {
            setLoading(false)
            setFormError(
              'Something went wrong, most likely the username already exists'
            )
          })
      }
    }
  }

  async function imageUpload() {
    if (image) {
      const data = new FormData()
      data.append('file', image)
      data.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      )
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME)

      return await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: 'post',
          body: data,
        }
      )
        .then((res) => res.json())
        .catch((err) => setError(true))
    } else {
      return {
        error: true,
      }
    }
  }

  function handleImageChange(e) {
    setImage(e.target.files[0])

    setLocalImage(URL.createObjectURL(e.target.files[0]))
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Account Details | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p>Failed sign up</p>
      </>
    )
  }
  if (loading) {
    return (
      <>
        <Head>
          <title>Account Details | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Loading small={false} />
      </>
    )
  }
  if (!loadingSession) {
    if (!session) {
      signIn()
    } else {
      return (
        <>
          <Head>
            <title>Account Details | project argus</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <form
            onSubmit={registerUser}
            className="text-left max-w-sm md:mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10"
            id="accountDetailsForm"
            noValidate
          >
            <h2 className="text-2xl font-bold text-center">Account details</h2>
            <div className="relative border-b-2 focus-within:border-blue-500">
              <input
                type="text"
                name="name"
                placeholder=" "
                defaultValue={session?.user?.name ? session.user.name : ''}
                pattern="[^\s]+"
                required
                className="block w-full appearance-none focus:outline-none bg-transparent"
              />
              <label
                htmlFor="name"
                className="absolute top-0 duration-300 origin-0"
              >
                Username
              </label>
            </div>

            <div className="relative border-b-2 focus-within:border-blue-500">
              {localImage ? (
                <img
                  src={localImage}
                  alt="Profile picture"
                  width={96}
                  height={96}
                />
              ) : session.user?.image ? (
                <Image
                  src={session.user?.image}
                  alt="Profile picture"
                  width={96}
                  height={96}
                />
              ) : (
                <MaterialIcon request="PersonLarge" />
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-full appearance-none focus:outline-none bg-transparent"
              />
              <label
                htmlFor="image"
                className="absolute top-0 -z-1 duration-300 origin-0"
              >
                Profile Picture
              </label>
            </div>
            {formError ? (
              <p className="text-red-700 text-center w-72 overflow-ellipsis overflow-hidden">
                {formError}
              </p>
            ) : (
              ''
            )}
            <button type="submit" className="p-3 text-white bg-green-400">
              Submit
            </button>
          </form>
        </>
      )
    }
  }

  return (
    <>
      <Head>
        <title>Account Details | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Loading small={false} />
    </>
  )
}

AccountDetails.getLayout = (page) => <Layout>{page}</Layout>
