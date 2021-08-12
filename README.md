# project-argus

A modern web application which allows the tracking of all your activities.

The old _andromeda_ and _orion_ repositories have been placed as seperate branches on this repository.

## Movies

Movies are taken from the movie database, but are partially saved in our own database. The movie title, year and overview are saved in the database and can thus always be accessed, even if tmdb is down (or the particular movie isn't on tmdb).

The discovery feed on the dashboard is directly from the tmdb and if you click a movie that isn't in the database yet you can add it by simply going to that link. The site searches through tmdb for the title and year of the movie and shows the results, from which you can add the right movie.

You can add a movie to your history with a specific datetime, the current datetime or none at all (for when you're not sure when).
