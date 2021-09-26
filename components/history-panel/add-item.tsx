import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { mutate } from 'swr'

import Loading from '../loading/loading'

interface IAddItemProps {
  type: string
  id: number
  text: boolean
  session: boolean
}

const AddItem = (props: IAddItemProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const addToHistory = () => {
    if (props.session) {
      setLoading(true)
      fetch(`/api/history/${props.type}/${props.id}`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setLoading(false)
          if (res.status === 201) {
            mutate(`/api/history/${props.type}/${props.id}`)
          } else {
            setError(true)
          }
        })
        .catch((err) => {
          setLoading(false)
          setError(true)
        })
    } else {
      signIn()
    }
  }

  if (loading) {
    return (
      <span className="pl-2 w-6">
        <Loading small={true} />
      </span>
    )
  }
  if (error) {
    return <span className="text-red-400">Something went wrong...</span>
  }

  return (
    <span className="pl-2 cursor-pointer" onClick={addToHistory}>
      <Image src="/assets/svg/playlist-add.svg" alt="Add to history icon" width="16px" height="16px" />
      {props.text && <span className="pl-1 align-top">Add to history</span>}
    </span>
  )
}

export default AddItem
