export const MovieForm = ({ genres, handleMovieSubmit, movieError }) => {
  return (
    <>
    <form onSubmit={handleMovieSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add Movie
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Add a movie to the movie list.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-full">
            <label
              htmlFor="titleInput"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="titleInput"
                name="titleInput"
                type="text"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="release_date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Release Year
            </label>
            <div className="mt-2">
              <input
                required
                type="number"
                name="release_date"
                id="yearInput"
                placeholder="YYYY"
                min={1800}
                max={String(new Date().getFullYear() + 10)}
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3"></div>
          <div className="sm:col-span-3">
            <label
              htmlFor="genres"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Genre
            </label>
            <div className="mt-2">
              <select
                required
                id="genreInput"
                name="genres"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                multiple
              >
                {!genres.length && (
                  <option value="">Genres Not Available</option>
                )}
                {genres?.map((genre) => {
                  return (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      
        <span className="text-red-500 block">{movieError}</span>
        <input
          type="submit"
          disabled={!genres.length}
          className="px-4 py-2 bg-blue-500 rounded-xl text-white mt-2 disabled:opacity-50"
          value="Submit"
        />
      </form>
    </>
  );
};
