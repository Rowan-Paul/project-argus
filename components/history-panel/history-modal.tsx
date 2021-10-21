import Image from 'next/image'
import { useState } from 'react'
import Modal from 'react-modal'
import { mutate } from 'swr'

interface IHistoryModalProps {
  history: any
  url: string
}

const HistoryModal = (props: IHistoryModalProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

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
          mutate(props.url)
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
        <Image src="/assets/icons/history.svg" width="16px" height="16px" alt="History icon" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="History List Modal"
        ariaHideApp={false}
      >
        <div className="sticky bg-primary py-2" style={{ top: '-20px' }}>
          <h2 className="inline-block">History</h2>
          <span onClick={closeModal} className="float-right inline-block text-sm cursor-pointer">
            Close
          </span>
        </div>
        {props.history ? (
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
              {Object?.values(props.history).map((item: any, i) => (
                <tr key={item.id}>
                  <td>#{i + 1}</td>
                  <td>{item.datetime ? new Date(item.datetime).toDateString() : 'No date'}</td>
                  <td>{item.datetime ? new Date(item.datetime).toLocaleTimeString() : 'No time'}</td>

                  <td className="cursor-pointer" onClick={() => remove(item.id)}>
                    {error ? (
                      'Something went wrong...'
                    ) : (
                      <Image src="/assets/icons/bin.svg" alt="Bin icon" width="16px" height="16px" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No history</p>
        )}
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
    minWidth: '20%',
    backgroundColor: '#242526',
    borderRadius: '1.5rem',
  },
}

export default HistoryModal
