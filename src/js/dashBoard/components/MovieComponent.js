import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionButtons } from './ActionButtons'

function MovieComponentUI(props) {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    setImgUrl(
      `https://www.themoviedb.org/t/p/${getResponsiveImage()}/${props.poster}`
    )
  }, [props.poster])

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
    <div className="lg:flex">
      <div className="flex-grow lg:mr-10 p-2">
        <img
          src={imgUrl}
          alt={`${props.title} poster`}
          className="max-h-48 m-auto lg:max-h-60 lg:float-left mb-10 lg:mr-10"
        />
        <h2>{props.title}</h2>
        <p className="line-clamp-2 lg:line-clamp-5">{props.overview}</p>
        <Link to="/movie">Read more</Link>
      </div>
      <ActionButtons id={props.id} isWatched={props.isWatched} />
    </div>
  )
}

export const MovieComponent = MovieComponentUI
