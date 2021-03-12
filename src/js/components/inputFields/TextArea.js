function TextAreaUI(props) {
  return (
    <div className="flex flex-col mb-4 lg:w-full">
      <label className="mb-2 font-bold" forhtml={props.name}>
        {props.name}
      </label>
      <textarea
        id={props.name}
        name={props.name}
        rows="4"
        cols="50"
        className="text-black border py-2 px-3 border-gray-500 dark:border-white"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
      ></textarea>
    </div>
  )
}

export const TextArea = TextAreaUI
