import CenterLayout from '../components/center-layout/center-layout'

const Custom404 = (): JSX.Element => {
  return (
    <>
      <h1>Not found</h1>
      <p>Are you lost?</p>
    </>
  )
}

export default Custom404

Custom404.getLayout = function getLayout(page: JSX.Element) {
  return <CenterLayout>{page}</CenterLayout>
}
