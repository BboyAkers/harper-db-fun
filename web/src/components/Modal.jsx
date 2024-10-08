export const Modal = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={"relative z-10" + (isOpen ? "" : " hidden")}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center md:p-4 text-center sm:items-center p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full max-w-sm md:max-w-md sm:p-6">
            <button
              type="button"
              onClick={() => onClose()}
              className="absolute top-4 right-6"
            >
              X
            </button>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
