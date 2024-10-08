import { useState } from "react";
import { GenreTable } from "./GenreTable";
import { GenreForm } from "./GenreForm";
import { Modal } from "./Modal";
import { Notification } from "./Notification";
import { isExistingGenre, generateRandomGenreId } from "../utils";

export const GenreView = ({ genres, setGenres }) => {
  const [genreError, setGenreError] = useState("");
  const [toggleGenreModal, setToggleGenreModal] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  const removeGenre = async (id) => {
    try {
      const response = await fetch(`/Genre/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setGenres(genres.filter((genre) => genre.id !== id));
      } else {
        console.error("Failed to delete genre");
      }
    } catch (error) {
      console.error("Failed to delete genre: ", error);
    }
  }

  const handleGenreSubmit = async (event) => {
    event.preventDefault();
    setGenreError("");
    let formattedInput = event.target.elements.newGenreInput.value.trim();
    formattedInput =
      formattedInput.charAt(0).toUpperCase() + formattedInput.slice(1);
    if (isExistingGenre(genres, formattedInput)) {
      setGenreError("Genre already exists");
      return;
    }
    // post the new genre to the server
    const newGenre = {
      id: String(generateRandomGenreId(genres)),
      name: formattedInput,
    };
    try {
      const response = await fetch("/Genre/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGenre),
      });
      if(response.ok) {
        setGenres([...genres,newGenre]);
        // Clear the input field(s)
        event.target.reset();
        setToggleGenreModal(false);
        setIsNotified(true);
        setTimeout(() => {
          setIsNotified(false);
          }, 4000);
      } else {
        setGenreError("Failed to add genre please try again later");
      }
    } catch (error) {
      setGenreError("Failed to add genre please try again later");
      return;
    }

  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold inline-block">Genre List</h2>
        <button
          className="px-4 bg-blue-500 h-11 rounded-xl text-white"
          onClick={() => setToggleGenreModal(true)}
        >
          + Add Genre
        </button>
      </div>
      {genres.length ? (
        <GenreTable genres={genres} removeGenre={removeGenre} />
      ) : (
        <p>Loading...</p>
      )}
      <Modal
        isOpen={toggleGenreModal}
        onClose={() => setToggleGenreModal(false)}
      >
        <GenreForm
          handleGenreSubmit={handleGenreSubmit}
          genreError={genreError}
        />
      </Modal>
      <Notification isOpen={isNotified} onClose={() => setIsNotified(false)}>
      <p className="w-0 flex-1 text-sm font-medium text-gray-900">New Genre added successfully!</p>
      </Notification>
    </div>
  );
};
