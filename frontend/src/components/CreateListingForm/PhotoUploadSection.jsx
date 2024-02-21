// import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

export const PhotoUploadSection = ({
  photos,
  handleUploadPhotos,
  handleDragPhoto,
  handleRemovePhoto,
}) => {
  return (
    <>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Add some photos of your place
      </h3>
      <DragDropContext onDragEnd={handleDragPhoto}>
        <Droppable droppableId="photos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {photos.length < 1 && (
                <>
                  <div className="w-1/2 border border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                    <input
                      id="image"
                      type="file"
                      name="photos"
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
                            {...provided.draggableProps}
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
                  {provided.placeholder}
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
    </>
  );
};
