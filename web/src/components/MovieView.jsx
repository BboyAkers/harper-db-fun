import { useState, useMemo } from "react";
import { MovieTable } from "./MovieTable";
import { MovieForm } from "./MovieForm";
import { Notification } from "./Notification";
import { Modal } from "./Modal";
import {
  isExistingMovie,
} from "../utils";
export const MovieView = ({ movies, genres, setMovies }) => {
  const [toggleMovieModal, setToggleMovieModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieError, setMovieError] = useState("");
  const [isNotified, setIsNotified] = useState(false);

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

  const handleMovieSubmit = async (event) => {
    event.preventDefault();
    setMovieError("");
    const title = event.target.elements.titleInput.value.trim();
    const genre_ids = [...event.target.elements.genreInput.options].filter(opt => opt.selected).map(opt => Number(opt.value))
    const releaseDate = event.target.elements.yearInput.value;
    const newMovie = {
      id: String(movies.length + 1),
      title,
      genre_ids,
      release_date: Number(releaseDate),
    };
    if (isExistingMovie(movies, newMovie)) {
      setMovieError("Movie already exists");
      return;
    }
    try {
      const response = await fetch("/Movie/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });
      if(response.ok){
        setMovies([...movies, newMovie]);
        event.target.reset();
        setToggleMovieModal(false);
        setIsNotified(true);
        setTimeout(() => {
          setIsNotified(false);
          }, 4000);
      } else {
        setMovieError("Failed to add movie please try again later");
        return;
      }
    } catch (error) {
      setMovieError("Failed to add movie please try again later");
      return;
    }
  };

  const removeMovie = async (id) => {
    try {
      const response = await fetch(`/Movie/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMovies(movies.filter((movie) => movie.id !== id));
      } else {
        console.error("Failed to delete movie");
      }
    } catch (error) {
      console.error("Failed to delete movie: ", error);
    }
  }
  return (
    <>
      <div>
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
            + Add Movie
          </button>
        </div>
        {movies.length ? (
          <>
            <datalist id="genrelist">
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}></option>
              ))}
            </datalist>
            <MovieTable movies={filteredMovies} removeMovie={removeMovie} />
          </>
        ) : (
        <div className="flex justify-center items-center h-96">
          <p>No Movies Found</p>
        </div>
        )}
      </div>
      <Modal isOpen={toggleMovieModal} onClose={() => setToggleMovieModal(false)}>
        <MovieForm
          genres={genres}
          handleMovieSubmit={handleMovieSubmit}
          movieError={movieError}
        />
      </Modal>
      <Notification isOpen={isNotified} onClose={() => setIsNotified(false)}>
      <p className="w-0 flex-1 text-sm font-medium text-gray-900">Movie added successfully!</p>
      </Notification>
    </>
  );
};
