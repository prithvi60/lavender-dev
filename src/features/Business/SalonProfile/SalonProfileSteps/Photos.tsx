import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import ImageUploading from "react-images-uploading";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const Photos = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // Generate a unique droppableId dynamically
  const droppableId = React.useMemo(() => `droppable-${Date.now()}`, []);

  const handleDragEnd = () => {
    // handle drag end logic if needed
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "png"]}
        >
          {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <div className="flex justify-center">
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {imageList.map((image, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="image-item"
                          >
                            <Card style={{ width: '200px', height: '200px' }}>
                              <img src={image.data_url} alt="" />
                            </Card>
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>Update</button>
                              <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Card style={{ width: '200px', height: '200px' }}>
                <CardContent sx={{ marginTop: '30px' }}>
                  <button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Add your first photos</Typography>
                    <GetIcon style={{ display: 'flex', justifyContent: 'center' }} iconName='PlusIcon' />
                  </button>
                </CardContent>
              </Card>
            </div>
          )}
        </ImageUploading>
      </div>
    </DragDropContext>
  );
};
