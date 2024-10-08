import { useState, useEffect } from "react";
import { MovieView } from "./components/MovieView";
import { GenreView } from "./components/GenreView";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { GenreSearch } from "./components/GenreSearch";

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  let location = useLocation();

  const fetchMovies = async () => {
    try {
      const response = await fetch("/Movie/");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch("/Genre/");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const classFromPage = (path) => {
    return `whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium ${
      location.pathname === path
        ? "text-blue-500 border-blue-500"
        : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl pb-2 pt-6">Movie Database</h1>
        <p>Welcome to the Movie Database!</p>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <Link to="/" className={classFromPage("/")}>
              Popular Movies
            </Link>
            <Link to="/genres" className={classFromPage("/genres")}>
              Genres
            </Link>
            <Link to="/genre-search" className={classFromPage("/genre-search")}>
              Genres Search
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <MovieView
                movies={movies}
                setMovies={setMovies}
                genres={genres}
              />
            }
          />
          <Route
            path="/genres"
            element={<GenreView genres={genres} setGenres={setGenres} />}
          />
          <Route
            path="/genre-search"
            element={<GenreSearch genres={genres} />}
          />
        </Routes>
        <div className="grid grid-cols-1 pt-4"></div>
      </main>
    </div>
  );
}

export default App;
