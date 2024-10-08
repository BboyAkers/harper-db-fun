export const isExistingMovie = (movies, newMovie) => {
  return movies.some((movie) => {
     return (movie.title === newMovie.title) && (movie.release_date === newMovie.release_date);
  });
};
const isExistingGenre = (genres, genreName) => {
  return genres.some((genre) => genre.name === genreName);
};

const isExistingGenreIds = (genres, genreId) => {
  return genres.some((genre) => genre.id === genreId);
};

const generateRandomGenreId = (genres) => {
  let randomId = Math.floor(Math.random() * 10_000);
  // Check if the randomId already exists
  if (isExistingGenreIds(genres, randomId)) {
    return generateRandomGenreId();
  }
  return randomId;
};

export { isExistingGenre, generateRandomGenreId };
