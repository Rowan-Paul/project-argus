-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL DEFAULT date_part('year'::text, CURRENT_DATE),
    "overview" VARCHAR NOT NULL,
    "tmdb_id" INTEGER
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMPTZ(6),
    "user_id" TEXT NOT NULL,
    "movie_id" INTEGER,
    "episode_id" INTEGER
);

-- CreateTable
CREATE TABLE "shows" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "overview" VARCHAR NOT NULL,
    "tmdb_id" INTEGER,
    "year" INTEGER NOT NULL DEFAULT date_part('year'::text, CURRENT_DATE)
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "show_id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "overview" VARCHAR NOT NULL,
    "season_number" INTEGER NOT NULL,
    "episode_count" INTEGER NOT NULL,
    "air_date" TIMESTAMP(6) NOT NULL,
    "tmdb_id" INTEGER
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "overview" VARCHAR NOT NULL,
    "season_id" INTEGER NOT NULL,
    "tmdb_id" INTEGER,
    "air_date" TIMESTAMP(6) NOT NULL,
    "episode_number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "movies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdb_id_key" ON "movies"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "movies_title_year_key" ON "movies"("title", "year");

-- CreateIndex
CREATE UNIQUE INDEX "history_id_key" ON "history"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shows_id_key" ON "shows"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shows_tmdb_id_key" ON "shows"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "shows_name_year_key" ON "shows"("name", "year");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_id_key" ON "seasons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_tmdb_id_key" ON "seasons"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_show_id_name_key" ON "seasons"("show_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_show_id_season_number_key" ON "seasons"("show_id", "season_number");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_id_key" ON "episodes"("id");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
