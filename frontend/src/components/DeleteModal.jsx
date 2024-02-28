const DeleteModal = ({handleDelete, onClose, children}) => {

    return (
         <div className="modal-box ">
    <form method="dialog mx-auto">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 px-4 py-2" onClick={onClose}>
        ✕
      </button>
    </form>
    <p className="py-4 mb-8">{children}</p>
    <div className="w-full flex justify-end">
      <button
        className="btn bg-rose-600 text-white text-lg font-medium py-1 px-4 rounded cursor-pointer hover:bg-rose-700"
        onClick={handleDelete}
      >
        Yes
      </button>
    </div>
  </div>
  )
    }

export default DeleteModal;
