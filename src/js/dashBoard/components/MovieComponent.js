import { ActionButtons } from './ActionButtons'

function MovieComponentUI(props) {
  return (
    <div key={props.title} className="lg:flex">
      <div className="flex-grow mr-10 p-2">
        <img
          src="https://via.placeholder.com/500x750"
          className="lg:max-h-60 lg:float-left mb-10 lg:mr-10"
        />
        <h2>{props.title}</h2>
        <p>{props.overview}</p>
      </div>
      <ActionButtons id={props.id} isWatched={props.isWatched} />
    </div>
  )
}

export const MovieComponent = MovieComponentUI
