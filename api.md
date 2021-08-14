# REST API

Items with a `star`\* behind them are optionial

| Method   | Request                                      | Body                    | Response                           |
| -------- | -------------------------------------------- | ----------------------- | ---------------------------------- |
| `PUT`    | `/api/auth/register`                         | `id`-`name`-`image`     | Edit user details                  |
| `POST`   | `/api/history/:user_id/:type/:item`          | `datetime`\*-`noDate`\* | Creates a new history item         |
| `GET`    | `/api/history/:user_id/:type`\*`/:item_id`\* |                         | Gets history items                 |
| `DELETE` | `/api/history/:item_id`                      |                         | Deletes a history item             |
| `GET`    | `/api/movies`                                |                         | Returns all movies                 |
| `POST`   | `/api/movies/:movie`                         | `overview`-`tmdb_id`    | Add a new movie                    |
| `GET`    | `/api/movies/:movie`                         |                         | Find a movie by title & year or id |
| `GET`    | `/api/users/:user`                           |                         | Find a user by username            |
