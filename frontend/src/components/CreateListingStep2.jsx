import { useState } from "react";
import { facilities } from "../data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

export const CreateListingStep2 = () => {
  /*upload, drag & drop, remove photos*/
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <div>
      <h2 className="font-semibold text-xl py-3">
        Step 2: Make your place stand out
      </h2>
      <hr />
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Tell guests what your place has to offer
      </h3>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-8 mb-8">
        {facilities.map((facility, index) => {
          return (
            <div
              key={index}
              className="container overflow-hidden w-3/4 flex flex-col justify-center items-center gap-2 border rounded whitespace-wrap p-4"
            >
              <div className="text-2xl">{facility.icon}</div>
              <span className="text-center">{facility.name}</span>
            </div>
          );
        })}
      </div>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Add some photos of your place
      </h3>
      <DragDropContext onDragEnd={handleDragPhoto}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {photos.length < 1 && (
                <>
                  <div className="w-1/2 border border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                    <input
                      id="image"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleUploadPhotos}
                      multiple
                    />
                    <label htmlFor="image">
                      <div className="text-6xl flex justify-center cursor-pointer">
                        <IoIosImages />
                      </div>
                      <p className="text-xl text-center cursor-pointer">
                        Upload from your device
                      </p>
                    </label>
                  </div>
                </>
              )}
              {photos.length >= 1 && (
                <>
                  {photos.map((photo, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="relative max-w-xs my-2"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.dragHandleProps}
                          >
                            <img
                              className=""
                              src={URL.createObjectURL(photo)}
                              alt="place"
                            />
                            <button
                              className="absolute top-0 right-0 text-2xl bg-gray-200 p-1 cursor-pointer"
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                            >
                              <BiTrash />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  <div className="w-1/2 border border-dashed rounded-md p-4 flex flex-col items-center justify-center my-4">
                    <input
                      id="image"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleUploadPhotos}
                      multiple
                    />
                    <label htmlFor="image">
                      <div className="text-6xl flex justify-center cursor-pointer">
                        <IoIosImages />
                      </div>
                      <p className="text-xl text-center cursor-pointer">
                        Upload from your device
                      </p>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        What makes tour place attractive and exciting?
      </h3>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="title"
          type="text"
          placeholder="Title"
          required
        />
        <label htmlFor="description">Description </label>
        <textarea
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="description"
          type="text"
          placeholder="Description"
          required
        ></textarea>
        <label htmlFor="highlight">Highlight </label>
        <input
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="highlight"
          type="text"
          placeholder="Highlight"
          required
        />
        <label htmlFor="highlightDetails">Highlight Details </label>
        <textarea
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="highlightDetails"
          type="text"
          placeholder="Highlight Details"
          required
        ></textarea>
        <label htmlFor="price">Price </label>
        <div className="flex gap-3 items-center">
          <span>E</span>
          <input
            className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            id="price"
            type="number"
            required
          />
        </div>
      </div>
    </div>
  );
};
