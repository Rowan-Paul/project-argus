import { useEffect, useState } from 'react'
import { ActionButtons } from './ActionButtons'

function MovieComponentUI(props) {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    setImgUrl(
      `https://www.themoviedb.org/t/p/${getResponsiveImage()}/${props.backdrop}`
    )
  }, [props.backdrop])

  function getResponsiveImage() {
    if (
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) < 768
    ) {
      return 'w154'
    } else {
      return 'w342'
    }
  }

  return (
    <div key={props.title} className="lg:flex">
      <div className="flex-grow lg:mr-10 p-2">
        <img
          src={imgUrl}
          alt={`${props.title} poster`}
          className="max-h-48 m-auto lg:max-h-60 lg:float-left mb-10 lg:mr-10"
        />
        <h2>{props.title}</h2>
        <p>{props.overview}</p>
      </div>
      <ActionButtons id={props.id} isWatched={props.isWatched} />
    </div>
  )
}

export const MovieComponent = MovieComponentUI
