import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import ImageUploading from 'react-images-uploading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMutation, useQuery } from '@tanstack/react-query';
import endpoint from '../../../../api/endpoints';
import { useSnackbar } from '../../../../components/Snackbar';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
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
  const showSnackbar = useSnackbar();

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
      //const payload = new FormData();

      
      for (const image of images) {
        const payload = new FormData();
        payload.append('file', image?.file);
        const response = await mutation.mutateAsync(payload);
        if (response?.data?.success) {
          setImageIdList((prevImageIdList) => {
            const updatedImageIdList = [...prevImageIdList, response?.data?.data];
            return updatedImageIdList;
          });
        }
      }
      
      
      // images?.forEach((image) => {
      //   payload.append('file', image?.file);

      // });
      // const res = mutation.mutate(payload);

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
      
      return response;
    },
    onSuccess: (response) => {
      // if(response?.data?.success){
      //   showSnackbar('Items saved successfully.', 'success');
      // }
      // else{
      //   showSnackbar(response?.data?.data, 'error');
      // }
    },
    onError: (error) => {
      console.error('Upload Error:', error);
      alert('Upload Error');
    },
    onSettled: () => {
    },
  });

  const handleButtonClick = async () => {
    
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
      setIsImageUploaded(false);
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
    if(response?.data?.success){
      showSnackbar('Items saved successfully.', 'success');
    }
    else{
      showSnackbar(response?.data?.data, 'error');
    }
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
                    {imageList?.map((image, index) => (
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
                <Card sx={{ width: '200px', height: '200px', cursor: "pointer" }} style={isDragging ? { backgroundColor: '#E6E1FF' } : null}
                      onClick={onImageUpload}
                      {...dragProps}>
                  <CardContent sx={{ marginTop: '30px' }}>
                    <button>
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

      {
        (isImageUploaded && !loading) && 
        <div className='flex flex-col justify-center items-center mt-4'>
        <Text name={"Photo is uploaded. Please save it."} sx={{p: 1}}/>
        
        <Button
              onClick={handleButtonClick}
              name={'Save'}
              sx={styles.buttonStyles}
            ></Button>
      </div>
      }

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
      

      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
      <Box>
        <Card sx={styles.cardContainer}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', padding: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, sm: 0 } }}>
              <IconButton>
                <GetIcon iconName='Caution'/>
              </IconButton>
            </Box>
            <Box>
              <List sx={{ width: { xs: '100%', sm: '517px' } }}>
                <ListItem>
                  <Typography align={"left"} sx={styles.text}>
                    Use high-resolution images to ensure your photos look great on all devices with a minimum size of <strong>800 x 600 pixels.</strong>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography align={"left"} sx={styles.text}>
                    We accept <strong>JPEG & PNG</strong> file formats.
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
      
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: '#E6E1FF',
    width: { xs: '100%', sm: '640px' },
    height: 'auto',
    padding: 2
  },
  text: {
    fontSize: { xs: '10px', sm: '12px' },
    fontWeight: 500,
    lineHeight: { xs: '12px', sm: '14.4px' }
  },
    buttonStyles : {
      width: '120px', 
      height: '37px', 
      fontFamily: 'Urbanist',
      borderRadius: '10px',
      padding: "10px, 40px, 10px, 40px !important",
      gap: '10px',
    },
}