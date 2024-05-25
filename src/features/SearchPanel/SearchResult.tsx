import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Chip from '../../components/Chip'
import { Grid, Card, CardContent, Rating, CardActions, CardHeader, styled } from '@mui/material';
import FilterModal from '../../components/FilterModal';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { getRoute } from '../../utils';
import TextRouter from '../../components/TextRouter';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';
import './style.css'
import GetImage from '../../assets/GetImage.tsx';
import GetIcon from '../../assets/Icon/icon.tsx';

export default function SearchResult() {
  
  const timeTags = ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']
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

  let establishmentList = useMemo(() => {
    if(!isLoading){
      return establishmentSearchResult
    }
    return null
  }, [isLoading])

  let establishmentResult: any = establishmentList != null ? establishmentList?.data?.content : null

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [isShowMap, setIsShowMap] = useState(false);

  const FILTERR = useSelector((state: any) => {
    return state.filterModal;
  });

  const sortBy = useCallback((list: any[]) => {

    if (FILTERR.SortBy === 'Price') {

      // Sort function to sort services by price ascending
      const sortByPrice = (a: any, b: any) => {
        // Get the lowest price from each service array and compare them
        const lowestPriceA = Math.min(...a.services.map(service => service.price));
        const lowestPriceB = Math.min(...b.services.map(service => service.price));
        return lowestPriceA - lowestPriceB;
      };

      list.sort(sortByPrice);

    }

    if (FILTERR.SortBy === 'Ratings') {

      // Sort function to sort by rating descending
      const sortByRating = (a: any, b: any) => {
        return b.rating - a.rating;
      }

      list.sort(sortByRating);
    }

    return list
  }, [FILTERR.SortBy])

    useEffect(() => {
      if(!isLoading){
      let tempData: any = [...establishmentResult];
      if (FILTERR.selectedTags && FILTERR.selectedTags.length > 0) {
        tempData = establishmentResult.filter((item: any) =>
          item.serviceTags.some((tag) =>
            FILTERR.selectedTags.some((selectedTag) =>
              tag.toLowerCase() === selectedTag.toLowerCase()
            )
          )
        );
      }
  
      if (FILTERR.price.min !== 0 || FILTERR.price.max !== 100) {
        tempData = tempData.map((item: any) => ({
          ...item,
          services: item.services.filter((service: any) =>
            service.startingPrice >= FILTERR.price.min && service.startingPrice <= FILTERR.price.max
          )
        })).filter((item: any) => item.services.length > 0); // Filter out items with empty service arrays
      }
      // Sorting logic based on FILTERR.sortBy (assuming sortBy contains a property called 'sortByField')
       tempData = sortBy(tempData)
      setFilteredData(tempData);}
    }, [FILTERR, establishmentResult,establishmentList, sortBy]);
 

    const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
        color: '#ff6d75',
      },
      '& .MuiRating-iconHover': {
        color: '#ff3d47',
      },
    });

function handleClick(){}

function handleMapClick() {
  setIsShowMap(true)
}

  const getSearchDetailsRoute = () => {
    return getRoute("SearchDetails")
  }

  var settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Card className='' >
      <CardHeader style={{marginTop: '60px', color: '#4D4D4D', backgroundColor: '#FFFBF3'}} id = 'card-header-id' title={filteredData.length + ' Venues matching your search'} action={
        <div className='flex items-center'>
          <FilterModal />
          <div onClick={()=> {handleMapClick()}}>Show map</div>
        </div>
      }>
      </CardHeader>
      <hr />
      {
        filteredData && filteredData.length > 0 ? (
          filteredData?.map((card, index) => (
            <CardContent key={card.establishmentId} className='flex justify-center items-center'>
              <Card sx={{ width: 1184 }} className='my-8 card-wrap-container'>
                <CardContent className='card-container'>
                  <div key={index} className='card-header'>
                    <GetImage imageName='SaloonImage' className='w-full rounded-lg'/>
                    <div key={index} className='card-header-details'>
                      <div className='chip-wrap'>
                        {card.serviceTags.map((tag, index) => (
                          <Chip key={index} label={tag} className='mr-2 mb-2' />
                        ))}
                      </div>
                      <div className='font-bold text-lg py-2' style={{color: '#4D4D4D'}}>{card.establishmentName}</div>
                      <div className="card-rating">
                        <div className='text-lg'>{card.rating.ratingStar}</div>
                        <StyledRating
                          name="customized-color"
                          value={card.rating.ratingStar}
                          precision={0.5}
                          readOnly
                        />
                        {/* <div className='text-sm'>({card.reviewCount})</div> */}
                        <div className='text-sm font-bold'>{'('+card.rating.ratingCount+')'}</div>
                      </div>
                      <div className='text-base'>{card.establishmentLocation}</div>
                    </div>
                  </div>
                  <Grid>
                    {card.services.map((service, index) => (
                      <div className='card-body-details'>
                        <div className='card-body-title'>
                          <div className='font-semibold'>{service.serviceName}</div>
                          <div>from ${service.startingPrice}</div>
                        </div>
                        <div className="card-slick-container">
                          <Slider {...settings1}>
                          {service.availabilities.map((tag, index) => (
                                  // <>{
                                  // tag.timeSlots.map((timeSlot, index) => (
                                  //   <Chip key={index} label={timeSlot} variant="outlined" type='clickable' onClick={handleClick} className='text-center content-center' />
                                  // ))}
                                  // <div>{tag.date}</div>
                                  // </>
                                  tag.timeSlots.map((timeSlot, index) => (
                                      <Chip key={index} label={timeSlot} variant="outlined" type='clickable' onClick={handleClick} className='text-center content-center' />
                                     ))
                              ))}
                          </Slider>
                        </div>
                      </div>
                    ))}
                  </Grid>
                  <div className='flex gap-1'>view more  <GetIcon className='' iconName='RightArrowIcon'/></div>
                </CardContent>
                <CardActions className='card-footer-action'>
                  <StoreMallDirectoryOutlinedIcon />
                  <TextRouter name={"Saloon Details"} to={`/salon/${card.establishmentId}`} />
                </CardActions>
              </Card>
              
            </CardContent>
          ))) : (<div><h1 className='text-center align-middle'>No result found</h1> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31081.53269316962!2d80.20855351621644!3d13.15031202030962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264db59c3d4b5%3A0x9be03109019f05f!2sMadhavaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716260701299!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>)
      }
      
    </Card>
  )
}

