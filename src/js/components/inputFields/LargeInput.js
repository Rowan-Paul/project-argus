function LargeInputUI(props) {
  return (
    <div className="flex flex-col mb-4 md:w-full">
      <label className="mb-2 font-bold" forhtml={props.name}>
        {props.name}
      </label>
      <input
        className="text-black border py-2 px-3 border-gray-500 dark:border-white"
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
      />
    </div>
  )
}

export const LargeInput = LargeInputUI
