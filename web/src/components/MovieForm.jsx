export const MovieForm = ({genres, handleMovieSubmit, movieError}) => {
  return (
    <form
      className=""
      onSubmit={handleMovieSubmit}
    >
      <h3>Add Movie</h3>
      <label className="block py-2">
        Title:
        <input
          required
          id="titleInput"
          type="text"
          name="title"
          className="border-2 border-blue-100 rounded-md"
        />
      </label>
      <label className="block py-2">
        Genre:
        <select
          required
          id="genreInput"
          name="genres"
          className="border-2 border-blue-100 rounded-md"
          multiple
        >
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </label>
      <label className="block py-2">
        Release Date:
        <input
          required
          id="yearInput"
          type="number"
          placeholder="YYYY"
          min="1800"
          name="release_date"
          className="border-2 border-blue-100 rounded-md"
        />
      </label>
      <span className="text-red-500 block">{movieError}</span>
      <input
        type="submit"
        className="px-4 py-2 bg-blue-500 rounded-xl text-white mt-2"
        value="Submit"
      />
    </form>
  );
};
