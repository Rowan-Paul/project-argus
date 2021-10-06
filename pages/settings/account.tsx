import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import CenterLayout from '../../components/center-layout/center-layout'
import Loading from '../../components/loading/loading'

interface ISettingsProps {
  user: ISessionUser
}

interface ISessionUser {
  name: string
  id: string
  image?: string
  email: string
}

export default function AccountSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  switch (status) {
    case 'authenticated':
      return <Settings user={session.user as ISessionUser} />

    case 'loading':
      return <Loading />

    case 'unauthenticated':
      router.push('/')
      return <Loading />
  }
}

const Settings = (props: ISettingsProps): JSX.Element => {
  const [loading, setLoading] = useState<Boolean>()
  const [formError, setFormError] = useState<string>()
  const [image, setImage] = useState<string | Blob>()
  const [localImage, setLocalImage] = useState<string>()
  const router = useRouter()

  const submitForm = async (event) => {
    event.preventDefault()
    if (!(document.getElementById('accountDetailsForm') as HTMLInputElement).checkValidity()) {
      setFormError(`Username cannot be empty or contain special characters`)
    } else {
      setFormError(undefined)
      setLoading(true)

      const imageUrl = await imageUpload()

      if (imageUrl) {
        fetch(`/api/users/${props.user.id}`, {
          body: JSON.stringify({
            id: props.user.id,
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
              if (router.query?.callbackUrl) {
                router.push(router.query?.callbackUrl as string)
              } else {
                router.push('/dashboard')
              }
            } else {
              throw new Error('Failed')
            }
          })
          .catch(() => {
            setLoading(false)
            setFormError('Something went wrong, most likely the username already exists')
          })
      }
    }
  }

  async function imageUpload() {
    if (image) {
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME)

      return await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: 'post',
          body: data,
        }
      )
        .then((res) => res.json())
        .catch(() => setFormError('Could not upload image'))
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

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>Account Settings | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        onSubmit={submitForm}
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
            defaultValue={props.user.name}
            pattern="[^\s]+"
            required
            className="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label htmlFor="name" className="absolute top-0 duration-300 origin-0">
            Username
          </label>
        </div>

        <div className="relative border-b-2 focus-within:border-blue-500">
          <Image
            src={localImage ? localImage : props.user?.image ? props.user?.image : '/assets/svg/person.svg'}
            alt="Profile picture"
            width="96px"
            height="96px"
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label htmlFor="image" className="absolute top-0 -z-1 duration-300 origin-0">
            Profile Picture
          </label>
        </div>
        {formError && <p className="text-red-500 text-center w-72 overflow-ellipsis overflow-hidden">{formError}</p>}
        <button type="submit" className="p-3 text-white bg-green-400">
          Submit
        </button>
      </form>
    </>
  )
}

AccountSettingsPage.getLayout = function getLayout(page: JSX.Element) {
  return <CenterLayout>{page}</CenterLayout>
}
