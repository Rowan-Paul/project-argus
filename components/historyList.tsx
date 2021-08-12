import Modal from 'react-modal'
import { mutate } from 'swr'
import { useState } from 'react'
import MaterialIcon from '../lib/materialIcons'

export default function HistoryList({ history, url }) {
  const [modalIsOpen, setIsOpen] = useState(false)
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

  function closeModal() {
    setIsOpen(!modalIsOpen)
  }

  const handleClick = () => {
    setIsOpen(!modalIsOpen)
  }

  const remove = (id) => {
    fetch(`/api/history/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          mutate(url)
        } else {
          throw new Error('Failed')
        }
      })
      .catch((err) => {
        setError(true)
      })
  }

  return (
    <span className="ml-2 pl-2 cursor-pointer">
      <span onClick={handleClick}>
        <MaterialIcon request="ViewList" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="History List Modal"
        ariaHideApp={false}
      >
        <div className="sticky bg-white py-2" style={{ top: '-20px' }}>
          <h2 className="inline-block">History</h2>
          <span
            onClick={closeModal}
            className="float-right inline-block text-sm cursor-pointer"
          >
            Close
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <td>no.</td>
              <td>Date</td>
              <td>Time</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {history
              ? Object?.values(history).map((item: any, i) => (
                  <tr key={item.id}>
                    <td>#{i + 1}</td>
                    <td>{new Date(item.datetime).toDateString()}</td>
                    <td>{new Date(item.datetime).toLocaleTimeString()}</td>

                    <td
                      className="cursor-pointer"
                      onClick={() => remove(item.id)}
                    >
                      {error ? (
                        'Something went wrong...'
                      ) : (
                        <MaterialIcon request="Delete" />
                      )}
                    </td>
                  </tr>
                ))
              : 'No history'}
          </tbody>
        </table>
      </Modal>
    </span>
  )
}
