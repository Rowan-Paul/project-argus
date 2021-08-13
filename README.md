# project-argus

A modern web application which allows the tracking of all your activities.

The old _andromeda_ and _orion_ repositories have been placed as seperate branches on this repository.

## Getting started

Clone the repository, run `npm install`, configure the enviroment variables below and run `npm run dev` to start the server.

| Name                                   | What is it                                |
| -------------------------------------- | ----------------------------------------- |
| `DATABASE_URL`                         | URL to the postgresql database            |
| `GOOGLE_CLIENT_ID`                     | Client id taken from Google Console       |
| `GOOGLE_CLIENT_SECRET`                 | Client secret from Google console         |
| `EMAIL_SERVER`                         | Email server for email signin etc         |
| `EMAIL_FROM`                           | Email adres to send from                  |
| `NEXT_PUBLIC_TMDB_API_KEY`             | API from The Movie Database               |
| `NEXT_PUBLIC_CLOUDINARY_CLOUDNAME`     | Cloudinary cloudname for uploading images |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset                  |
| `NEXTAUTH_URL`                         | URL the site is on                        |

## Movies

Movies are taken from the movie database, but are partially saved in our own database. The movie title, year and overview are saved in the database and can thus always be accessed, even if tmdb is down (or the particular movie isn't on tmdb).

The discovery feed on the dashboard is directly from the tmdb and if you click a movie that isn't in the database yet you can add it by simply going to that link. The site searches through tmdb for the title and year of the movie and shows the results, from which you can add the right movie.

You can add a movie to your history with a specific datetime, the current datetime or none at all (for when you're not sure when).

## Accounts

Accounts are handled by next-auth with the Google and E-mail providers enabled, meaning you can sign in and up with Google and E-mail.
