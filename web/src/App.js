import { useState, useEffect } from "react";
import { genreList } from "./data";
import { GenreTable } from "./components/GenreTable";
import { GenreForm } from "./components/GenreForm";
import { isExistingGenre, generateRandomGenreId } from "./utils";
import { MovieView } from "./components/MovieView";
import { GenreView } from "./components/GenreView";

function App() {
  const [isMovieTab, setIsMovieTab] = useState(true);
  const [genres, setGenres] = useState(genreList);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/Movie/");
      const data = await response.json();
      console.log("response: ", data);
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl pb-2">Movie Database</h1>
        <p>Welcome to the Movie Database!</p>
        <div>
          <div className="block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setIsMovieTab(true)}
                  className={`whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium ${isMovieTab ? "text-blue-500 border-blue-500" : "text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                >
                  Popular Movies
                </button>
                <button
                  onClick={() => setIsMovieTab(false)}
                  className={`whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium" ${!isMovieTab ? "text-blue-500 border-blue-500" : "text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                >
                  Genres
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 pt-4">
          {isMovieTab ? (
            <MovieView movies={movies} setMovies={setMovies} genres={genres} />
          ) : (
            <GenreView genres={genres} setGenres={setGenres} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
