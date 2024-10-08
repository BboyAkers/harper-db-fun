import { useState, useMemo, useEffect } from "react";
import { movieList, genreList } from "./data";
import "./App.css";
import { MovieTable } from "./components/MovieTable";
import { GenreTable } from "./components/GenreTable";
import { MovieForm } from "./components/MovieForm";
import { GenreForm } from "./components/GenreForm";
import {
  isExistingGenre,
  generateRandomGenreId,
  isExistingMovie,
} from "./utils";
import { Modal } from "./components/Modal";

function App() {
  const [genres, setGenres] = useState(genreList);
  const [genreError, setGenreError] = useState("");
  const [movies, setMovies] = useState([]);
  const [toggleMovieModal, setToggleMovieModal] = useState(false);
  const [movieError, setMovieError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try{ 
      const response = await fetch("/Movie/");
      const data = await response.json();
      console.log("response: ", data);
      setMovies(data);
    }
    catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

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

  const genresById = useMemo(() => new Map(genres.map(genre => [genre.id, genre])), [genres])

  const handleGenreSubmit = (event) => {
    event.preventDefault();
    setGenreError("");
    let formattedInput = event.target.elements.newGenreInput.value.trim();
    formattedInput =
      formattedInput.charAt(0).toUpperCase() + formattedInput.slice(1);
    if (isExistingGenre(genres, formattedInput)) {
      setGenreError("Genre already exists");
      return;
    }
    setGenres([
      ...genres,
      {
        id: generateRandomGenreId(genres),
        name: formattedInput,
      },
    ]);
    // Clear the input field(s)
    event.target.reset();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.trim());
  };

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

  return (
    <div className="">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl pb-2">Movie Database</h1>
        <p>Welcome to the Movie Database!</p>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-1">
          {/* <div>
            <MovieForm
              genres={genres}
              handleMovieSubmit={handleMovieSubmit}
              movieError={movieError}
            />
          </div> */}
          {/* <div>
            <GenreForm
              handleGenreSubmit={handleGenreSubmit}
              genreError={genreError}
            />
          </div>
          <div>
            <h3 className="text-center">Genre List</h3>
            <GenreTable genres={genres} />
          </div> */}
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
              <button className="px-4 bg-blue-500 rounded-xl text-white" onClick={() => setToggleMovieModal(true)}>+Add Movie</button>
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
            ) : <p>Loading...</p>}
          </div>
        </div>
      </main>
      <Modal isOpen={toggleMovieModal} onClose={() => setToggleMovieModal(false)}>
        <MovieForm
          genres={genres}
          handleMovieSubmit={handleMovieSubmit}
          movieError={movieError}
        />
      </Modal>
    </div>
  );
}

export default App;
