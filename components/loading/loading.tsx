import { useEffect, useState } from 'react'
import { Circle } from 'rc-progress'
import Head from 'next/head'

interface ILoadingProps {
  small?: Boolean
}

const Loading = ({ small }: ILoadingProps): JSX.Element => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (progress === 100) {
        setProgress(1)
      } else {
        setProgress(progress + 1)
      }
    }, 30)

    return () => {
      clearTimeout(timer1)
    }
  }, [progress])

  if (small) {
    return (
      <>
        <Head>
          <title>project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-4 align-middle text-center inline-block mx-auto">
          <Circle strokeWidth={6} percent={progress} />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-20 mx-auto">
        <Circle strokeWidth={6} percent={progress} />
      </div>
    </>
  )
}

export default Loading
