import { useState, useMemo } from "react";
import { MovieTable } from "./components/MovieTable";
import { MovieForm } from "./components/MovieForm";
import { Modal } from "./components/Modal";
import {
  isExistingGenre,
  generateRandomGenreId,
  isExistingMovie,
} from "./utils";
const MovieView = ({ movies, genres, setMovies, setGenres }) => {
  const [toggleMovieModal, setToggleMovieModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieError, setMovieError] = useState("");

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.trim());
  };

  const genresById = useMemo(() => new Map(genres.map(genre => [genre.id, genre])), [genres])

  const formattedMovies = useMemo(() => {
    return movies.map(({ genre_ids = [], ...props }) => ({
      ...props,
      genre_ids,
      genres: genre_ids.map((id) => genresById.get(id)?.name),
    }));
  }, [movies, genresById]);

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const genre = genres.find((genre) => genre.name.toLowerCase() === query);
    return genre
      ? formattedMovies.filter(({ genre_ids }) => genre_ids?.includes(genre.id))
      : formattedMovies;
  }, [formattedMovies, genres, searchQuery]);

  const handleMovieSubmit = (event) => {
    event.preventDefault();
    setMovieError("");
    const title = event.target.elements.titleInput.value.trim();
    const genre_ids = [...event.target.elements.genreInput.options].filter(opt => opt.selected).map(opt => Number(opt.value))
    const releaseDate = event.target.elements.yearInput.value;
    const newMovie = {
      id: movies.length + 1,
      title,
      genre_ids,
      release_date: releaseDate,
    };
    if (isExistingMovie(movies, newMovie)) {
      setMovieError("Movie already exists");
      return;
    }
    setMovies([...movies, newMovie]);
    setToggleMovieModal(false);
    event.target.reset();
  };

  return (
    <>
      <div>
        <h2 className="text-xl">Popular Movies</h2>
        <div className="flex justify-between">
          <input
            list="genrelist"
            type="search"
            disabled={!movies.length}
            onChange={handleSearchChange}
            placeholder="Search For A Genre"
            className="border-2 border-blue-100 rounded-md px-4 py-2 w-56"
          />
          <button
            className="px-4 bg-blue-500 rounded-xl text-white"
            onClick={() => setToggleMovieModal(true)}
          >
            +Add Movie
          </button>
        </div>
        {movies.length ? (
          <>
            <datalist id="genrelist">
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}></option>
              ))}
            </datalist>
            <MovieTable movies={filteredMovies} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Modal isOpen={toggleMovieModal} onClose={() => setToggleMovieModal(false)}>
        <MovieForm
          genres={genres}
          handleMovieSubmit={handleMovieSubmit}
          movieError={movieError}
        />
      </Modal>
    </>
  );
};
