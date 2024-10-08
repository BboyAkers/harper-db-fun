import { useState, useEffect } from "react";
import { GenreTable } from "./GenreTable";
import { GenreForm } from "./GenreForm";
import { Modal } from "./Modal";
import { isExistingGenre, generateRandomGenreId } from "../utils";
export const GenreView = ({ genres, setGenres }) => {
  const [genreError, setGenreError] = useState("");
  const [toggleGenreModal, setToggleGenreModal] = useState(false);

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
    setToggleGenreModal(false);
    // Clear the input field(s)
    event.target.reset();
  };

  return (
    <div>
      <button
            className="px-4 bg-blue-500 h-11 rounded-xl text-white"
            onClick={() => setToggleGenreModal(true)}
          >
            + Add Genre
          </button>
      <GenreTable genres={genres} />
      <Modal isOpen={toggleGenreModal} onClose={() => setToggleGenreModal(false)}>
        <GenreForm
          handleGenreSubmit={handleGenreSubmit}
          genreError={genreError}
        />
      </Modal>
    </div>
  );
};
