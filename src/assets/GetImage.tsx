import React from 'react';

function GetImage(props) {
  const { imageName, ...rest } = props

  let imageElement = <></>

  switch (imageName) {
    case 'NailImage':
      imageElement = <img src={require('./Categories/Nail.png')} alt=''/>
      break;

    case 'WomenHairImage':
      imageElement = <img src={require('./Categories/WomenHair.png')} alt=''></img>
      break;


    case 'FaceImage':
      imageElement = <img src={require('./Categories/Face.png')} alt=''></img>
      break;
    case 'MassageImage':
      imageElement = <img src={require('./Categories/Massage.png')} alt=''></img>
      break;
    case 'MenImage':
      imageElement = <img src={require('./Categories/Men.png')} alt=''></img>
      break;

      case 'HairRemovalImage':
        imageElement = <img src={require('./Categories/HairRemoval.png')} alt=''></img>
        break;

        case 'SaloonImage':
        imageElement = <img src={require('./SaloonImage/Saloon.png')} alt=''></img>
        break;
  }

  return (
    <div {...rest}>
      {imageElement}
    </div>
  );
}

export default GetImage;
