import { SearchBox } from '../components/movieComponents/SearchBox'
import { MovieResults } from '../components/movieComponents/MovieResults'

function DashboardUI() {
  return (
    <div className="p-10 pt-20 md:p-20">
      <h1>Dashboard</h1>

      <h2>Search for a movie</h2>
      <SearchBox />

      <MovieResults columnAmount={4} types="history" />
    </div>
  )
}

export const Dashboard = DashboardUI
