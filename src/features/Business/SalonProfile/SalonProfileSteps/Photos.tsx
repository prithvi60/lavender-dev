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
    <div>
        <div className='text-5xl font-bold text-center p-2' style={{color: '#4D4D4D'}}>Add photos</div>
        <div className='text-xl font-normal text-center p-2 mb-8' style={{color: '#4D4D4D'}}>We recommend uploading at least 5 photos for better reach</div>

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
                            style={{padding: '10px'}}
                          >
                            <Card style={{ width: '200px', height: '200px'}}>
                              <img src={image.data_url} alt="" />
                            </Card>
                            <div className="image-item__btn-wrapper">
                              {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
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
              <div style={{padding: '10px'}}>
              <Card style={{ width: '200px', height: '200px'}}>
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
              </Card></div>
            </div>
          )}
        </ImageUploading>
      </div>
        </DragDropContext>
    </div>
    
  );
};
