import { Link } from 'react-router-dom'

function IntroTextUI() {
  return (
    <div className="flex flex-col justify-center md:w-2/3 mx-10">
      <span>Track everything</span>
      <h1 className="text-5xl">project argus</h1>
      <p>
        project argus is the place to keep track of everything in your life:
        from what games you play to what series you've watched
      </p>
      <div>
        <Link
          to="/signin"
          className="inline-block bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 no-underline"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export const IntroText = IntroTextUI
