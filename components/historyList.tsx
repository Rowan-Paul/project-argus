import Modal from 'react-modal'
import { useState } from 'react'
import MaterialIcon from '../lib/materialIcons'

export default function HistoryList({ history }) {
  const [modalIsOpen, setIsOpen] = useState(false)

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

  return (
    <span onClick={handleClick} className="ml-2 pl-2 cursor-pointer">
      <MaterialIcon request="ViewList" />

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
                  <HistoryItem item={item} i={i} key={item.id} />
                ))
              : 'No history'}
          </tbody>
        </table>
      </Modal>
    </span>
  )
}

function HistoryItem({ item, i }) {
  const [error, setError] = useState(false)

  const remove = () => {
    fetch(`/api/history/${item.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          throw new Error('Failed')
        }
      })
      .catch((err) => {
        setError(true)
      })
  }

  return (
    <tr>
      <td>#{i + 1}</td>
      <td>{new Date(item.datetime).toDateString()}</td>
      <td>{new Date(item.datetime).toLocaleTimeString()}</td>

      <td className="cursor-pointer" onClick={remove}>
        {error ? 'Something went wrong...' : <MaterialIcon request="Delete" />}
      </td>
    </tr>
  )
}
