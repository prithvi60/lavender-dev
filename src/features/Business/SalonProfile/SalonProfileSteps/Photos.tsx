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
          <div className="upload__image-wrapper">
            {/* <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button> */}
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
          </div>
        )}
      </ImageUploading>
    </div>
  );
};


// const [images, setImages] = useState([]);

// const handleImageChange = (e) => {
//   const selectedImages = Array.from(e.target.files);
//   setImages((prevImages) => [...prevImages, ...selectedImages]);
// };

// const handleDeleteImage = (index) => {
//   setImages((prevImages) => {
//     const updatedImages = [...prevImages];
//     updatedImages.splice(index, 1);
//     return updatedImages;
//   });
// };

// const handleDragOver = (e) => {
//   e.preventDefault();
// };

// const handleDrop = (e) => {
//   e.preventDefault();
//   const droppedFiles = Array.from(e.dataTransfer.files);
//   setImages((prevImages) => [...prevImages, ...droppedFiles]);
// };

// const handleDragStart = (e, index) => {
//   e.dataTransfer.setData('index', index);
// };

// const handleDragOverImage = (e) => {
//   e.preventDefault();
// };

// const handleDropImage = (e, currentIndex) => {
//   e.preventDefault();
//   const draggedIndex = e.dataTransfer.getData('index');
//   const draggedImage = images[draggedIndex];

//   const newImages = images.filter((image, index) => index !== parseInt(draggedIndex));
//   newImages.splice(currentIndex, 0, draggedImage);

//   setImages(newImages);
// };

// return (
//   <div>
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleImageChange}
//         style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
//       />
//             <GetIcon iconName='PlusIcon'/>

//     </div>
    
//     <div
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//       style={{ border: '2px dashed #ccc', padding: '10px', marginTop: '10px' }}
//     >
//       {images.map((image, index) => (
//         <div
//           key={index}
//           draggable
//           onDragStart={(e) => handleDragStart(e, index)}
//           onDragOver={(e) => handleDragOverImage(e)}
//           onDrop={(e) => handleDropImage(e, index)}
//           style={{ marginBottom: '10px', cursor: 'move' }}
//         >
//           <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
//           <button onClick={() => handleDeleteImage(index)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   </div>
// );