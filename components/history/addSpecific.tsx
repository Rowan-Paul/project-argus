import 'flatpickr/dist/themes/dark.css'

import Modal from 'react-modal'
import Flatpickr from 'react-flatpickr'
import { useState } from 'react'
import { mutate } from 'swr'
import MaterialIcon from '../../lib/materialIcons'
import { LargeButton } from '../buttons'

export default function AddSpecific({ session, type, id }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
    },
  }

  function handleModal() {
    setIsOpen(!modalIsOpen)
  }

  const handleSave = () => {
    setIsOpen(!modalIsOpen)
    setLoading(true)
    fetch(`/api/history/${session.id}/${type}/${id}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: session.id,
        datetime: date,
      }),
    })
      .then((res) => {
        setLoading(false)
        if (res.status === 201) {
          mutate(`/api/history/${session.id}/${type}/${id}`)
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
    return (
      <span className="pl-2">
        <MaterialIcon request="Pending" />
      </span>
    )
  }
  if (error) {
    return <span className="pl-2">Something went wrong...</span>
  }

  return (
    <span className="pl-2 cursor-pointer">
      <span onClick={handleModal}>
        <MaterialIcon request="MoreHoriz" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Specific time Modal"
        ariaHideApp={false}
      >
        <div className="sticky bg-white py-2" style={{ top: '-20px' }}>
          <h2 className="inline-block">History</h2>
          <span
            onClick={handleModal}
            className="float-right inline-block text-sm cursor-pointer"
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
              altInputClass: 'text-center',
              altFormat: 'd-m-Y H:i',
            }}
            onReady={() => setDate(new Date())}
          />

          <span className="block">
            <LargeButton text="Save" onClick={handleSave} />
          </span>
        </div>
      </Modal>
    </span>
  )
}
