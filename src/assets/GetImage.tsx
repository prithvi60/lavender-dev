import React from 'react';

function GetImage(props) {
  const { imageName, ...rest } = props

  let imageElement = <></>

  switch (imageName) {
    case 'NailImage':
      imageElement = <img src={require('./Categories/Nail.png')} alt='' />
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

    case 'FaceService':
      imageElement = <img src={require('./Benifits/FaceService.png')} alt=''></img>
      break;

    case 'CancellationImage':
      imageElement = <img src={require('./Benifits/Cancellation.png')} alt=''></img>
      break;

    case 'BookingImage':
      imageElement = <img src={require('./Benifits/Booking.png')} alt=''></img>
      break;
    
    case 'IllustrateDog':
    imageElement = <img src={require('./illustration_dog_2.png')} alt=''></img>
    break;

    case 'AddPaymentCard':
      imageElement = <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={require('./makePayment.png')} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
        </div>
      break;

      case 'LearnMore':
        imageElement = <div style={{ width: '1270px', height: '687px' }}>
          <img src={require('./BackgroundImage/LearnMore.png')} alt='' style={{ width: '1270px', height: '687px', objectFit: 'cover', position: 'relative', zIndex: 1 }}></img>
          </div>
        break;
  }

  return (
    <div {...rest}>
      {imageElement}
    </div>
  );
}

export default GetImage;
