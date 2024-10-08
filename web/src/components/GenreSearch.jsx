import { useState, useMemo, useEffect, useCallback } from "react";
import { MovieTable } from "./MovieTable";
export const GenreSearch = ({ genres }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchFilteredMovies = useCallback(async () => {
      try {
        const response = await fetch(`/Movie/?genres.name=${selectedGenre}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
  }, [selectedGenre]); 

  useEffect(() => {
    if (selectedGenre) {
      fetchFilteredMovies();
    }
  }, [selectedGenre, fetchFilteredMovies]);


  const handleSearchChange = (e) => {
    setSelectedGenre(e.target.value);
    setSearchQuery(e.target.value);
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

  return (
    <div>
      <form>
        <select
          value={selectedGenre}
          disabled={!genres.length}
          onChange={(e) => handleSearchChange(e)}
          className="mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
        >
          <option value="">Select a genre</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </form>
      {movies.length ? <MovieTable movies={filteredMovies} /> : (
        <div className="flex justify-center items-center h-96">
          <p>No Movies Found</p>
        </div>
      )}
    </div>
  );
};
