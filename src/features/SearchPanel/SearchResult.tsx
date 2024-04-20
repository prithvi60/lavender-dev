import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Chip from '../../components/Chip'
import emptyLogo from '../../assets/emptyImage.png';
import { Grid, Card, CardContent, Rating, CardActions, CardHeader } from '@mui/material';
import FilterModal from '../../components/FilterModal';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { getRoute } from '../../utils';
import TextRouter from '../../components/TextRouter';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';

export default function SearchResult() {
  
  const timeTags = ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']
  const payLoad={}
  const {isLoading, data: establishmentSearchResult} = useQuery({queryKey: ['custom-da'], queryFn: () =>{ return endpoint.getEstablishmentSearch(payLoad)}})
  console.log("establishmentSearchResult : ;: ", establishmentSearchResult)

  let establishmentList = useMemo(() => {
    if(!isLoading){
      return establishmentSearchResult
    }
    return null
  }, [isLoading])

  let establishmentResult: any = establishmentList != null ? establishmentList.data : null

  const [filteredData, setFilteredData] = useState<any[]>([]);

  console.log('filteredDate : ', filteredData);


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
 

function handleClick(){}

  const getSearchDetailsRoute = () => {
    return getRoute("SearchDetails")
  }

  var settings1 = {
    dots: true,
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
    <Card className='mt-16' >
      <CardHeader sx={{}} title={filteredData.length + ' Venues matching your search'} action={
        <div className='flex items-center'>
          <FilterModal />
          <div >Show map</div>
        </div>
      }>
      </CardHeader>
      <hr />
      {
        filteredData && filteredData.length > 0 ? (
          filteredData?.map((card, index) => (
            <CardContent key={card.establishmentId} className='flex justify-center items-center'>
              <Card sx={{ width: 1184 }} className='my-8'>
                <CardContent className=''>
                  <div key={index} className='flex flex-col md:flex-row md:items-center md:mb-8'>
                    <img alt='' src={emptyLogo} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl' />
                    <div key={index} className='md:ml-4'>
                      <div className='flex flex-wrap mb-2'>
                        {card.serviceTags.map((tag, index) => (
                          <Chip key={index} label={tag} className='mr-2 mb-2' />
                        ))}
                      </div>
                      <div className='font-bold text-lg'>{card.establishmentName}</div>
                      <div className="card-rating">
                        <div className='text-sm'>{card.rating}</div>
                        <Rating value={3} precision={0.5} readOnly />
                        {/* <div className='text-sm'>({card.reviewCount})</div> */}
                        <div className='text-sm'>85</div>
                      </div>
                      <div className='text-base'>{card.establishmentLocation}</div>
                    </div>
                  </div>
                  <Grid>
                    {card.services.map((service, index) => (
                      <Grid container spacing={2} key={index} className='my-4'>
                        <Grid item xs={12} sm={6} md={4}>
                          <div className='font-semibold'>{service.serviceName}</div>
                          <div>from ${service.startingPrice}</div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                          <div className="">
                            <Slider {...settings1}>
                              {service.availabilities.map((tagee, index) => (
                                  tagee.timeSlots.map((timeSlot, index) => (
                                    <Chip key={index} label={timeSlot} variant="outlined" type='clickable' onClick={handleClick} className='text-center content-center' />
                                  ))
                              ))}
                            </Slider>

                          </div>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions className='flex justify-center bg-gray-100'>
                  <StoreMallDirectoryOutlinedIcon />
                  <TextRouter name={"Saloon Details"} to={getSearchDetailsRoute()} />
                </CardActions>
              </Card>
            </CardContent>
          ))) : (<h1 className='text-center align-middle'>No result found</h1>)
      }
    </Card>
  )
}

