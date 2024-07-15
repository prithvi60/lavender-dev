import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import { Grid, Card, CardContent, Rating, styled } from '@mui/material';
import { KeyboardArrowRightOutlined, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import Text from '../../components/Text';
import Chip from '../../components/Chip';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints';
import emptyLogo from '../../assets/emptyImage.png';
import establishmentImg from '../../assets/establishmentImg.png'


const RecommendSection = () => {

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const payLoad = {
    "pageNumber": 0,
    "pageSize": 50,
    "sortBy": "",
    "sortDirection": "",
    "serviceTypes": [
      "Hair","Nail"
    ],
    "searchCoordinates": [
      "string"
    ],
    "mapStartCoordinates": [
      "string"
    ],
    "mapEndCoordinates": [
      "string"
    ],
    "availableStartTime": "2024-07-05T13:24:29.634Z",
    "availableEndTime": "2024-07-05T13:24:29.634Z"
  };
  const {isLoading, data: establishmentSearchResult} = useQuery({queryKey: ['custom-data'], queryFn: () =>{ return endpoint.getEstablishmentSearch(payLoad)}})

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <KeyboardArrowRightOutlined className={`${className} arrow next-arrow`} onClick={onClick} />
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <KeyboardArrowLeftOutlined className={`${className} arrow prev-arrow`} onClick={onClick} />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: 'carousel-slider',
    responsive: [
        {
          breakpoint: 1260, // Breakpoint for tablets
          settings: {
            slidesToShow: 3,
            centerMode: true,
          }
        },
        {
          breakpoint: 1000, // Breakpoint for mobile devices
          settings: {
            slidesToShow: 2,
            centerMode: true,
          }
        },
        {
          breakpoint: 720, // Breakpoint for smaller mobile devices
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "90px"
          }
        },
        {
          breakpoint: 600, // Breakpoint for smaller mobile devices
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px"
          }
        }
      ]
  };

  const [imageIdList, setImageIdList]= useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [estIdList, setEstIdList] = useState([]);

  useEffect(()=>{
    const imageIds = establishmentSearchResult?.data?.data?.content?.
    map(establishment => establishment.estImages.length > 0 ? establishment.estImages[0] : "");

    const estIds = establishmentSearchResult?.data?.data?.content?.map(item  => item?.establishmentId)
    setImageIdList(imageIds)
    setEstIdList(estIds)
      // setImageIdList(establishmentSearchResult?.data?.data?.estImages)
    }, [establishmentSearchResult])
    
    const fetchImage = async (image, estId) => {
      try {
        setLoading(true);
        const response = await endpoint.getImages(image, estId);

        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl
      } catch (error) {
        setLoading(false);
      }
    };

    useEffect( () =>{
      const callFetchImageApi = async () =>{
        const urls = [];
        for (let i = 0; i < imageIdList.length; i++) {
          const imageId = imageIdList[i];
          const id = estIdList[i];
      
          const imageUrl = await fetchImage(imageId, id); // Await the fetchImage function

          const imageObject = { [imageId]: imageUrl };
          
          urls.push(imageObject);
        }
        setImageUrls(urls);
        setLoading(false);
      }
      if (imageIdList?.length > 0) {
        callFetchImageApi();
      }
    }, [imageIdList])


  function getImages(imgId){
    for (let i = 0; i < imageUrls?.length; i++) {
      // Check if the current object has the key we're looking for
      if (imgId in imageUrls[i]) {
          // Return the corresponding value
          return imageUrls[i][imgId];
      }
  }
  // Return null or handle case when key is not found
  return null; 
  }

  return (
    <div className="recommend-section">
        <Grid item xs={12} className="pt-16 pb-8 md:pb-16">
            <h4 className='text-2xl md:text-4xl font-semibold text-center text'>Our Recommended Picks</h4>
        </Grid>
        {!isLoading && 
        
        <Slider {...settings} className='home-slider'>
            {establishmentSearchResult?.data?.data?.content?.map((card) => (
                <div key={card?.id}>
                    <div className="mx-2 md:mx-5 max-w-lg p-6 shadow-lg rounded-xl">
                      {
                        getImages(card?.estImages[0]) 
                        ? 
                        (
                          <img src={getImages(card?.estImages[0])} alt="CardImage" className="card-image" />
                        ) 
                        :  
                        (
                          <h6 className="card-image"> Image not uploaded</h6>
                        )
                      }
                        <CardContent className='card-content'>
                            <Text variant="h5" align="left" className="card-title" sx={{color: '#4D4D4D'}} name={card?.establishmentName}/>
                            <div className="card-rating">
                                <Text sx={{color: '#4D4D4D'}} variant="body2" align="left" name={card?.rating?.ratingStar}/>
                                <StyledRating
                                name="customized-color"
                                value={card?.rating?.ratingStar}
                                precision={0.5}
                                readOnly
                                />
                                <Text sx={{color: '#4D4D4D'}} variant="body2" align="left" name={card?.rating?.ratingCount}/>
                            </div>
                            <Text sx={{color: '#808080'}} variant="body2" align="left" className="card-location" name={card?.establishmentLocation} />
                            <div className="card-tags gap-1" sx={{display: 'flex', justifyContent: 'center'}}>
                                {card?.serviceTags?.length  > 0 ? (card?.serviceTags?.map((tag, index) => (
                                    <Chip key={index} label={tag} className="small" />
                                ))) 
                                :
                                (
                                  <h6>No service tags</h6>
                                )
                              }
                            </div>
                        </CardContent>
                    </div>
                </div>
            ))}
        </Slider>
        }
        
    </div>
  );
};

export default RecommendSection;
