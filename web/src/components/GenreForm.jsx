export const GenreForm = ({ handleGenreSubmit, genreError }) => {
  return (
    <form onSubmit={handleGenreSubmit}>
      <label className="block py-2">
        <span className="text-lg">Add New Genre</span>
        <input
          placeholder="Enter a new genre"
          required
          type="text"
          id="newGenreInput"
          name="newGenreInput"
          className="border-2 border-blue-100 rounded-md w-full px-4 py-2"
        />
      </label>
      <span className="text-red-500 block">{genreError}</span>
      <input
        type="submit"
        className="px-4 py-2 bg-blue-500 rounded-xl text-white mt-2 block w-full"
        value="Submit"
      />
    </form>
  );
};
