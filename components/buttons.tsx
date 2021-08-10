import Link from 'next/link'

export default function Button({ text, link }) {
  return (
    <Link href={link}>
      <a>
        <div className="bg-blue-400 p-4 text-white font-bold rounded mt-5 mx-2 cursor-pointer inline-block">
          {text}
        </div>
      </a>
    </Link>
  )
}

export function OnClickButton({ text, onClick }) {
  return (
    <div
      className="bg-blue-400 p-4 text-white font-bold rounded mt-5 mx-2 cursor-pointer inline-block"
      onClick={onClick}
    >
      {text}
    </div>
  )
}

export function LoadButton() {
  return (
    <div className="bg-blue-400 p-4 text-white font-bold rounded mt-5 mx-2 inline-block">
      Loading...
    </div>
  )
}