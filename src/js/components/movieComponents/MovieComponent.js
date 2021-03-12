import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionButtons } from './ActionButtons'

function MovieComponentUI(props) {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (props.poster === undefined) {
      setImgUrl('https://via.placeholder.com/342x513?text=No+Poster+Found')
    } else {
      setImgUrl(
        `https://www.themoviedb.org/t/p/${getResponsiveImage()}/${props.poster}`
      )
    }
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
    <div className="lg:grid grid-cols-6">
      <h2 className="line-clamp-2 lg:line-clamp-1 col-span-6">{props.title}</h2>

      <img
        src={imgUrl}
        alt={`${props.title} poster`}
        className="max-h-48 max-w-32 lg:float-left m-auto my-3 lg:mx-2 col-span-2 "
      />

      <ActionButtons
        id={props.id}
        isWatched={props.isWatched}
        types={props.types}
        editMovieClicked={() => props.editMovieClicked()}
      />

      <div className="col-span-3">
        <p className="line-clamp-2 lg:line-clamp-4 visible">{props.overview}</p>
        <Link to="movie-detail-page">Read more</Link>
      </div>
    </div>
  )
}

export const MovieComponent = MovieComponentUI
