import React from 'react';
import Slider from 'react-slick';
import { Grid, Card, CardContent, Rating } from '@mui/material';
import { KeyboardArrowRightOutlined, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import Text from '../../components/Text';
import Chip from '../../components/Chip';

import emptyLogo from '../../assets/emptyImage.png';

const RecommendSection = () => {
  const cards = [
    { id: 1, image: emptyLogo, rating: 4.2, reviewCount: 20, location: 'Location 1', tags: ['Hair cut', 'Hair styling', 'Massage'] },
    { id: 2, image: emptyLogo, rating: 3.7, reviewCount: 30, location: 'Location 2', tags: ['Tag 3', 'Tag 4'] },
    { id: 3, image: emptyLogo, rating: 5.0, reviewCount: 40, location: 'Location 3', tags: ['Tag 5', 'Tag 6'] },
    { id: 4, image: emptyLogo, rating: 4.1, reviewCount: 50, location: 'Location 4', tags: ['Tag 7', 'Tag 8'] },
    { id: 5, image: emptyLogo, rating: 3.9, reviewCount: 10, location: 'Location 5', tags: ['Tag 9', 'Tag 10'] },
  ];

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
        <Grid item xs={12} className="category-title">
            <Text  variant="h4" align="center" name="Our Recommended Picks" />
        </Grid>
        <Slider {...settings}>
            {cards.map((card) => (
                <div key={card.id}>
                    <Card className="card">
                        <img src={card.image} alt="CardImage" className="card-image" />
                        <CardContent className='card-content'>
                            <Text variant="h6" align="left" className="card-title" name="Card Title"/>
                            <Text variant="body2" align="left" className="card-location" name={card.location} />
                            <div className="card-rating">
                                <Text variant="body2" align="left" name={card.rating}/>
                                {/* <span>{card.rating}</span> */}
                                <Rating value={card.rating} precision={0.5} readOnly />
                                <Text variant="body2" align="left" name={card.reviewCount}/>
                                {/* <span>({card.reviewCount})</span> */}
                            </div>
                            <div className="card-tags">
                                {card.tags.map((tag, index) => (
                                    <Chip key={index} label={tag} className="small" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
    </div>
  );
};

export default RecommendSection;
