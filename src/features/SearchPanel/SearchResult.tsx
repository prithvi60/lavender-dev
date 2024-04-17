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
import { ISaloonData } from '../../interface/interface';

export default function SearchResult() {

  let sData: ISaloonData[] = useMemo(() => {
    return [{
      id: 1,
      tags: ['Hair cut', 'Hair styling', 'Massage', 'Hair cut', 'Hair styling', 'Massage'],
      image: emptyLogo,
      parlorName: 'Yong Chow’s Paradise - Women’s Parlour & Spa',
      rating: 4,
      reviewCount: 20,
      location: 'Location 1',
      treatments: [{ tid: 1, treatmentName: 'Ladies trim', price: 145, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 2, treatmentName: 'Classic Pedicure', price: 90, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 3, treatmentName: 'Single process Color', price: 160, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] }
      ]
    },
    {
      id: 2,
      tags: ['Hair cut', 'Hair styling', 'Massage', 'Hair cut', 'Hair styling', 'Massage'],
      image: emptyLogo,
      parlorName: 'parlor 2 - Yong Chow’s Paradise - Women’s Parlour & Spa',
      rating: 4.5,
      reviewCount: 20,
      location: 'Location 1',
      treatments: [{ tid: 1, treatmentName: 'Ladies trim', price: 245, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 2, treatmentName: 'Classic Pedicure', price: 487, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 3, treatmentName: 'Single process Color', price: 360, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] }
      ]
    },
    {
      id: 3,
      tags: ['Hair cut', 'Kids'],
      image: emptyLogo,
      parlorName: 'parlor 3 -- Yong Chow’s Paradise - Women’s Parlour & Spa',
      rating: 3,
      reviewCount: 20,
      location: 'Location 1',
      treatments: [{ tid: 1, treatmentName: 'Ladies trim', price: 100, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 2, treatmentName: 'Classic Pedicure', price: 111, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] },
      { tid: 3, treatmentName: 'Single process Color', price: 160, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm'] }
      ]
    }]
  }, [])

  const [filteredData, setFilteredData] = useState<ISaloonData[]>([]);

  const handleClick = () => {

  }

  const FILTERR = useSelector((state: any) => {
    return state.filterModal;
  });

  const sortBy = useCallback((list: ISaloonData[]) => {

    if (FILTERR.SortBy === 'Price') {

      // Sort function to sort treatments by price ascending
      const sortByPrice = (a: ISaloonData, b: ISaloonData) => {
        // Get the lowest price from each treatment array and compare them
        const lowestPriceA = Math.min(...a.treatments.map(treatment => treatment.price));
        const lowestPriceB = Math.min(...b.treatments.map(treatment => treatment.price));
        return lowestPriceA - lowestPriceB;
      };

      list.sort(sortByPrice);

    }

    if (FILTERR.SortBy === 'Ratings') {

      // Sort function to sort by rating descending
      const sortByRating = (a: ISaloonData, b: ISaloonData) => {
        return b.rating - a.rating;
      }

      list.sort(sortByRating);
    }

    return list
  }, [FILTERR.SortBy])

  useEffect(() => {

    let tempData: ISaloonData[] = [...sData];
    if (FILTERR.selectedTags && FILTERR.selectedTags.length > 0) {
      tempData = sData.filter((item: ISaloonData) =>
        item.tags.some((tag) =>
          FILTERR.selectedTags.some((selectedTag) =>
            tag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      );
    }

    if (FILTERR.price.min !== 0 || FILTERR.price.max !== 100) {
      tempData = tempData.map((item: ISaloonData) => ({
        ...item,
        treatments: item.treatments.filter((treatment: any) =>
          treatment.price >= FILTERR.price.min && treatment.price <= FILTERR.price.max
        )
      })).filter((item: ISaloonData) => item.treatments.length > 0); // Filter out items with empty treatment arrays
    }


    // Sorting logic based on FILTERR.sortBy (assuming sortBy contains a property called 'sortByField')

     tempData = sortBy(tempData)

    setFilteredData(tempData);

  }, [FILTERR, sData, sortBy]);




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
            <CardContent key={card.id} className='flex justify-center items-center'>
              <Card sx={{ width: 1184 }} className='my-8'>
                <CardContent className=''>
                  <div key={index} className='flex flex-col md:flex-row md:items-center md:mb-8'>
                    <img alt='' src={card.image} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl' />
                    <div key={index} className='md:ml-4'>
                      <div className='flex flex-wrap mb-2'>
                        {card.tags.map((tag, index) => (
                          <Chip key={index} label={tag} className='mr-2 mb-2' />
                        ))}
                      </div>
                      <div className='font-bold text-lg'>{card.parlorName}</div>
                      <div className="card-rating">
                        <div className='text-sm'>{card.rating}</div>
                        <Rating value={card.rating} precision={0.5} readOnly />
                        <div className='text-sm'>({card.reviewCount})</div>
                      </div>
                      <div className='text-base'>{card.location}</div>
                    </div>
                  </div>
                  <Grid>
                    {card.treatments.map((treatment, index) => (
                      <Grid container spacing={2} key={index} className='my-4'>
                        <Grid item xs={12} sm={6} md={4}>
                          <div className='font-semibold'>{treatment.treatmentName}</div>
                          <div>{treatment.price}</div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                          <div className="">
                            <Slider {...settings1}>

                              {treatment.timeTags.map((tag, index) => (

                                <Chip key={index} label={tag} variant="outlined" type='clickable' onClick={handleClick} className='text-center content-center' />

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
