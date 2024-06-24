import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import ImageUploading from 'react-images-uploading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMutation, useQuery } from '@tanstack/react-query';
import endpoint from '../../../../api/endpoints';

interface ImageUploadResponse {
  data: {
    success: boolean;
    data: string; 
  };
}

export const Photos = ({userDetails}) => {
  const [images, setImages] = useState([]);
  const [photosId, setPhotoId] = useState([]);
  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const maxNumber = 69;
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const establishmentId = userDetails != null ? userDetails?.establishmentId : "";

  useEffect(()=>{
    const getEstablishmentDetails = async () => {
      const establishmentData  = await endpoint.getEstablishmentDetailsById(establishmentId);
      if(establishmentData?.data?.success){
        setPhotoId(establishmentData?.data?.data?.estImages)
        setImageIdList(establishmentData?.data?.data?.estImages)
      }
    }

    getEstablishmentDetails();
    
  }, [])

  useEffect( () =>{
    debugger
    const callFetchImageApi = async () =>{
      const urls = [];
      for (const imageId of photosId) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    }
    if (photosId.length > 0) {
      callFetchImageApi();
    }
  }, [photosId])

  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(image, establishmentId);

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const onChange =  (imageList) => {
    setImages(imageList);
    setIsImageUploaded(true);
  };

  useEffect(() => {
    if (images.length > 0) {
      saveImages();
    }
  }, [images]); 

  const saveImages = async () => {
    try{
      const payload = new FormData();
      images.forEach((image) => {
        payload.append('file', image.file);
      });
      const res = mutation.mutate(payload);
      setImages([]);
    }
    catch{

    }
  };

  const handleDragEnd = () => {
    // handle drag end logic if needed
  };

  const mutation = useMutation<ImageUploadResponse, Error, FormData>({
    mutationFn: async (payload) => {
      const response =  await endpoint.saveEstablishmentPhotos(payload, establishmentId);
      if(response?.data?.success){
        const updatedImageIdList = [...imageIdList, response?.data?.data];
        setImageIdList(updatedImageIdList)
      }
      return response;
    },
    onSuccess: (response) => {
    },
    onError: (error) => {
      console.error('Upload Error:', error);
      alert('Upload Error');
    },
    onSettled: () => {},
  });

  const handleButtonClick = async () => {
    debugger
    setLoading(true);
    try {
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      callSaveImageIdApi(imageIdList);
      setImageUrls(urls);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const callSaveImageIdApi = async(imageId) =>{
    const payload = {
      "id": establishmentId,
      "estImages": imageId,
    }
   const response = await endpoint.saveImageId(payload);
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

      <div>
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
      
      {
        (isImageUploaded && !loading) && 
        <div className='flex justify-center mt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleButtonClick}>
          Save
        </button>
      </div>
      }
      
    </div>
  );
};
