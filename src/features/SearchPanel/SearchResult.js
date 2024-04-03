import React, { Fragment, useEffect, useState } from 'react'
import Text from '../../components/Text'
import Chip from '../../components/Chip'
import emptyLogo from '../../assets/emptyImage.png';
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import FilterModal from '../../components/FilterModal';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';


export default function SearchResult() {

    let sData = [{
        id:1,
        tags: ['Hair cut', 'Hair styling', 'Massage', 'Hair cut', 'Hair styling', 'Massage'],
        image: emptyLogo,
        parlorName: 'Yong Chow’s Paradise - Women’s Parlour & Spa',
        rating: 4,
        reviewCount: 20,
        location: 'Location 1',
        treatments: [{tid:1, treatmentName: 'Ladies trim', price: 45, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:2, treatmentName: 'Classic Pedicure', price: 87, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:3, treatmentName: 'Single process Color', price: 60, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']}
                   ] 
      },
      {
        id:2,
        tags: ['Hair cut', 'Hair styling', 'Massage', 'Hair cut', 'Hair styling', 'Massage'],
        image: emptyLogo,
        parlorName: 'parlor 2 - Yong Chow’s Paradise - Women’s Parlour & Spa',
        rating: 4.5,
        reviewCount: 20,
        location: 'Location 1',
        treatments: [{tid:1, treatmentName: 'Ladies trim', price: 45, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:2, treatmentName: 'Classic Pedicure', price: 87, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:3, treatmentName: 'Single process Color', price: 60, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']}
                   ]
      },
      {
        id:3,
        tags: ['Hair cut', 'Hair styling', 'Massage', 'Hair cut', 'Hair styling', 'Massage'],
        image: emptyLogo,
        parlorName: 'parlor 3 -- Yong Chow’s Paradise - Women’s Parlour & Spa',
        rating: 4.5,
        reviewCount: 20,
        location: 'Location 1',
        treatments: [{tid:1, treatmentName: 'Ladies trim', price: 45, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:2, treatmentName: 'Classic Pedicure', price: 87, timeTags: ['9.00 am', '10.00 am', '11.00 am', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']},
                    {tid:3, treatmentName: 'Single process Color', price: 60, timeTags: ['9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm', '3.00 pm', '9.00 am', '10.00 am', '11.00 am', '12.00 am', '1.00 pm', '2.00 pm']}
                   ]
      }]

      const [originalData, setOriginalData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
    const [modal, setModal] = useState(true);
    let filterData = originalData.slice(); // Copy original data

    useEffect(() => {
      setOriginalData(sData);
    },[])

    const defaultFilters = {
      SortBy: "Recommended",
      price: {min : 0 , max:100},
      selectedTags: [],
    };

    function handleClick(){
    }

    const FILTERR = useSelector((state) => {
      console.log("state.filterModal : ",state.filterModal)
      if(state.filterModal === defaultFilters){
        setFilteredData(originalData);
      }
        return state.filterModal;
      });


    function filterSortData(Data) {
      debugger

      let fData = JSON.parse(Data);
      filterData = filterData.map((item) => {

      item.treatments = item.treatments.filter((i) => {
        return i.price >= fData.price.min && i.price <= fData.price.max
      })
      return item;
      })
      setFilteredData(filterData);
    }

    useEffect(() => {
      filterSortData(JSON.stringify(FILTERR));
    },[FILTERR, originalData])


      var settings = {
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
        <Card className='' >
            <CardHeader  title={filterData.length + ' Venues matching your search'} action={
                    <div className='flex items-center'>
                        <FilterModal />
                        <div >Show map</div>
                    </div>
                }>
            </CardHeader>
            <hr /> 
            {
                filterData.map((card) => (
                    <CardContent key={card.id} className='flex justify-center items-center'>
                        <Card sx={{width: 1184 }} className='my-8'>
                            <CardContent className=''>
                                <div className='flex flex-col md:flex-row md:items-center md:mb-8'>
                                    <img src={card.image} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl'/>
                                    <div className='md:ml-4'>
                                        <div className='flex flex-wrap mb-2'>
                                            {card.tags.map((tag, index) => (
                                                <Chip key={index} label={tag} className='mr-2 mb-2'/>
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
                                    {card.treatments.map((treatment) => (
                                        <Grid container spacing={2} key={treatment.id} className='my-4'> 
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className='font-semibold'>{treatment.treatmentName}</div>
                                                <div>{treatment.price}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={8}> 
                                                    <div className="">
                                                    <Slider {...settings}>

                                                        {treatment.timeTags.map((tag, index) => (

                                                            <Chip key={index} label={tag} variant="outlined" type='clickable' onClick={handleClick} className='text-center content-center'/>

                                                        ))}
                                                        </Slider>

                                                    </div>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardContent>
                ))
            }
        </Card>
    )
}
