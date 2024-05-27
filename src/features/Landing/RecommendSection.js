import React from 'react';
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
  const cards = [
    { id: 1, image: emptyLogo, rating: 4.2, reviewCount: 20, location: 'Location 1', tags: ['Hair cut', 'Hair styling', 'Massage'] },
    { id: 2, image: emptyLogo, rating: 3.7, reviewCount: 30, location: 'Location 2', tags: ['Tag 3', 'Tag 4'] },
    { id: 3, image: emptyLogo, rating: 5.0, reviewCount: 40, location: 'Location 3', tags: ['Tag 5', 'Tag 6'] },
    { id: 4, image: emptyLogo, rating: 4.1, reviewCount: 50, location: 'Location 4', tags: ['Tag 7', 'Tag 8'] },
    { id: 5, image: emptyLogo, rating: 3.9, reviewCount: 10, location: 'Location 5', tags: ['Tag 9', 'Tag 10'] },
  ];
  const payLoad = {
    "pageNumber": 1,
    "pageSize": 10,
    "sortBy": "",
    "sortDirection": "",
    "serviceTypes": [
      "Hair","Massage"
    ],
    "minSalePrice": 0,
    "maxSalePrice": 1000,
    "searchCoordinates": [
      ""
    ],
    "mapStartCoordinates": [
      ""
    ],
    "mapEndCoordinates": [
      ""
    ],
    "availableStartTime": "2024-05-21T09:08:43.496Z",
    "availableEndTime": "2024-05-21T09:08:43.496Z"
  }
  const {isLoading, data: establishmentSearchResult} = useQuery({queryKey: ['custom-data'], queryFn: () =>{ return endpoint.getEstablishmentSearch(payLoad)}})
console.log("content", establishmentSearchResult)
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

  return (
    <div className="recommend-section">
        <Grid item xs={12} className="pt-16 pb-8 md:pb-16">
            <h4 className='text-2xl md:text-4xl font-semibold text-center text'>Our Recommended Picks</h4>
        </Grid>
        {!isLoading && 
        
        <Slider {...settings} className='home-slider'>
            {establishmentSearchResult?.data?.content?.map((card) => (
                <div key={card.id}>
                    <div className="mx-2 md:mx-5 max-w-lg p-6 shadow-lg rounded-xl">
                        <img src={establishmentImg} alt="CardImage" className="card-image" />
                        <CardContent className='card-content'>
                            <Text variant="h5" align="left" className="card-title" sx={{color: '#4D4D4D'}} name={card.establishmentName}/>
                            <div className="card-rating">
                                <Text sx={{color: '#4D4D4D'}} variant="body2" align="left" name={card.rating.ratingStar}/>
                                <StyledRating
                                name="customized-color"
                                value={card.rating.ratingStar}
                                precision={0.5}
                                readOnly
                                />
                                <Text sx={{color: '#4D4D4D'}} variant="body2" align="left" name={card.rating.ratingCount}/>
                            </div>
                            <Text sx={{color: '#808080'}} variant="body2" align="left" className="card-location" name={card.establishmentLocation} />
                            <div className="card-tags gap-1" sx={{display: 'flex', justifyContent: 'center'}}>
                                {card.serviceTags.map((tag, index) => (
                                    <Chip key={index} label={tag} className="small" />
                                ))}
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
