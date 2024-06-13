import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import ImageUploading from "react-images-uploading";


export const Photos = () => {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="flex justify-center">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <Card style={{width: '200px', height: '200px'}}>
                    <img src={image.data_url} alt=""/>
                </Card>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            
            <Card style={{width: '200px', height: '200px'}}>
              <CardContent sx={{marginTop: '30px'}}>
                  <button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Typography sx={{fontSize: '20px', fontWeight: '600'}}>Add your first photos</Typography>
                    <GetIcon style={{display: 'flex', justifyContent: 'center'}} iconName='PlusIcon'/>
                  </button>
              </CardContent>
            </Card>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
