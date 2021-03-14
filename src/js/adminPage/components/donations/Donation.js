function DonationUI(props) {
  const date = new Date(props.date).toLocaleString()

  return (
    <div>
      <h3>{props.name}</h3>
      <span>{date}</span>
      <p>{`${props.amount / 100} ${props.currency}`}</p>
    </div>
  )
}

export const Donation = DonationUI
