import { IoCloseSharp } from "react-icons/io5";

const FullSizeImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="max-w-4xl w-full h-full flex justify-center items-center">
        <img src={imageSrc} alt="Full Size" className="max-w-full max-h-full" />
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
         <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default FullSizeImageModal;
