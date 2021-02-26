function SubmitButtonUI(props) {
  return (
    <button
      className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5"
      type="submit"
      onClick={(e) => {
        props.onClick(e)
      }}
    >
      {props.name}
    </button>
  )
}

export const SubmitButton = SubmitButtonUI
