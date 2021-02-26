function SmallInputUI(props) {
  return (
    <div className="flex flex-col mb-4 lg:w-1/2">
      <label
        className={`mb-2 font-bold ${props.last ? 'lg:ml-2' : ''}`}
        forhtml={props.name}
      >
        {props.name}
      </label>
      <input
        className={`text-black border py-2 px-3 border-gray-500 dark:border-white ${
          props.last ? 'lg:ml-2' : ''
        }`}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        required
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
      />
    </div>
  )
}

export const SmallInput = SmallInputUI
