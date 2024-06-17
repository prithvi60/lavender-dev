import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import ImageUploading from 'react-images-uploading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMutation } from '@tanstack/react-query';
import endpoint from '../../../../api/endpoints';

export const Photos = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const handleDragEnd = () => {
    // handle drag end logic if needed
  };

  const mutation = useMutation({
    mutationFn: (payload) => {
      return endpoint.saveEstablishmentPhotos(payload);
    },
    onSuccess: (response) => {
      setTimeout(() => {
        console.log('response : ', response);
      }, 1000);
    },
    onError: (error) => {
      console.error('Upload Error:', error);
      alert('Upload Error');
    },
    onSettled: () => {},
  });

  function handleButtonClick() {
    const payload = new FormData();
    images.forEach((image) => {
      payload.append('file', image.file);
    });
    mutation.mutate(payload);
  }

  return (
    <div>
      <div className='text-5xl font-bold text-center p-2' style={{ color: '#4D4D4D' }}>
        Add photos
      </div>
      <div className='text-xl font-normal text-center p-2 mb-8' style={{ color: '#4D4D4D' }}>
        We recommend uploading at least 5 photos for better reach
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey='data_url'
          acceptType={['jpg', 'png', 'jpeg']} // Include jpeg in acceptType
        >
          {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <div className='flex justify-center flex-wrap'>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-wrap justify-center'>
                    {imageList.map((image, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='image-item'
                            style={{ padding: '10px' }}
                          >
                            <Card style={{ width: '200px', height: '200px' }}>
                              <img src={image.data_url} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Card>
                            <div className='image-item__btn-wrapper'>
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
              <div style={{ padding: '10px' }}>
                <Card style={{ width: '200px', height: '200px' }}>
                  <CardContent sx={{ marginTop: '30px' }}>
                    <button
                      style={isDragging ? { color: 'red' } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Add your first photos</Typography>
                      <GetIcon style={{ display: 'flex', justifyContent: 'center' }} iconName='PlusIcon' />
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </ImageUploading>
      </DragDropContext>

      <div className='flex justify-center mt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleButtonClick}>
          Upload
        </button>
      </div>
    </div>
  );
};
