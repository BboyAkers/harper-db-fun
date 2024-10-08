export const GenreTable = ({ genres }) => {
  return (
    <table className="mx-auto table-auto">
      <thead>
        <tr>
          <th>Genre Id</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(genres).map((genre) => {
          return (
            <tr key={genre.id}>
              <td>{genre.id}</td>
              <td>{genre.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
