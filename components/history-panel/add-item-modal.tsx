import 'flatpickr/dist/themes/dark.css'

import { useState } from 'react'
import Modal from 'react-modal'
import Flatpickr from 'react-flatpickr'
import { mutate } from 'swr'
import Image from 'next/image'

import Loading from '../loading/loading'
import { signIn } from 'next-auth/react'

interface IAddItemModalProps {
  type: string
  id: number
  session: boolean
}

const AddItemModal = (props: IAddItemModalProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  function handleModal() {
    props.session ? setIsOpen(!modalIsOpen) : signIn()
  }

  const handleSave = () => {
    setIsOpen(!modalIsOpen)
    setLoading(true)
    fetch(`/api/history/${props.type}/${props.id}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        datetime: date,
      }),
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
  }

  const noTime = () => {
    setIsOpen(!modalIsOpen)
    setLoading(true)
    fetch(`/api/history/${props.type}/${props.id}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noDate: true,
      }),
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
  }

  if (loading) {
    return <Loading small={true} />
  }
  if (error) {
    return <p className="text-red-400">Something went wrong</p>
  }

  return (
    <span className="pl-2 cursor-pointer">
      <span onClick={handleModal}>
        <Image src="/assets/svg/more.svg" width="16px" height="16px" alt="Open modal" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Specific time Modal"
        ariaHideApp={false}
      >
        <div className="sticky bg-primary py-2" style={{ top: '-20px' }}>
          <h2 className="inline-block">History</h2>
          <span
            onClick={handleModal}
            className="float-right inline-block text-sm cursor-pointer bg-accent hover:bg-bg-hover p-2 rounded-xl"
          >
            Close
          </span>
        </div>

        <div className="text-center">
          <Flatpickr
            data-enable-time
            value={date}
            onChange={(date) => setDate(date)}
            options={{
              maxDate: new Date(),
              time_24hr: true,
              inline: true,
              allowInput: true,
              altInput: true,
              altInputClass: 'text-center bg-primary',
              altFormat: 'd-m-Y H:i',
            }}
            onReady={() => setDate(new Date())}
          />

          <div className="grid grid-cols-2">
            <span className="rounded mt-5 mx-2 p-4 cursor-pointer block text-center bg-accent hover:bg-bg-hover">
              <span onClick={noTime}>No time</span>
            </span>
            <span>
              <span className="rounded mt-5 mx-2 p-4 cursor-pointer block text-center bg-blue-500 hover:bg-blue-400">
                <span onClick={handleSave}>Save</span>
              </span>
            </span>
          </div>
        </div>
      </Modal>
    </span>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    maxHeight: '100vh',
    backgroundColor: '#242526',
    borderRadius: '1.5rem',
  },
}

export default AddItemModal
