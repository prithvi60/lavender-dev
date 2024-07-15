import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Chip from '../../components/Chip';
import { Grid, Card, CardContent, Rating, CardActions, CardHeader, styled, Typography } from '@mui/material';
import FilterModal from '../../components/FilterModal';
import { useSelector } from 'react-redux';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { getRoute } from '../../utils';
import TextRouter from '../../components/TextRouter';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';
import './style.css';
import GetImage from '../../assets/GetImage.tsx';
import GetIcon from '../../assets/Icon/icon.tsx';
import { MarginOutlined } from '@mui/icons-material';

export default function SearchResult() {
  
  const payLoad = {
    "pageNumber": 0,
    "pageSize": 50,
    "sortBy": "",
    "sortDirection": "",
    "serviceTypes": [
      
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

  const { isLoading, data: establishmentSearchResult } = useQuery({ queryKey: ['custom-data'], queryFn: () => endpoint.getEstablishmentSearch(payLoad) });

  const establishmentList = useMemo(() => {
    return !isLoading ? establishmentSearchResult?.data?.data?.content : null;
  }, [isLoading, establishmentSearchResult]);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isShowMap, setIsShowMap] = useState(false);
  const FILTERR = useSelector((state: any) => state.filterModal);

  const sortBy = useCallback((list: any[]) => {
    if (FILTERR.SortBy === 'Price') {
      list.sort((a, b) => {
        const lowestPriceA = Math.min(...a.services.map(service => service?.price));
        const lowestPriceB = Math.min(...b.services.map(service => service?.price));
        return lowestPriceA - lowestPriceB;
      });
    }
    if (FILTERR.SortBy === 'Ratings') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [FILTERR]);

  useEffect(() => {
    if (!isLoading) {
      let tempData = [...establishmentList];
      if (FILTERR.selectedTags && FILTERR.selectedTags.length > 0) {
        tempData = establishmentList?.filter((item: any) =>
          item.serviceTags.some((tag) =>
            FILTERR.selectedTags.some((selectedTag) =>
              tag.toLowerCase() === selectedTag.toLowerCase()
            )
          )
        );
      }
      if (FILTERR.price.min !== 0 || FILTERR.price.max !== 100) {
        tempData = tempData?.map((item: any) => ({
          ...item,
          services: item.services.filter((service: any) =>
            service?.startingPrice >= FILTERR.price.min && service?.startingPrice <= FILTERR.price.max
          )
        })).filter((item: any) => item.services.length > 0);
      }
      tempData = sortBy(tempData);
      setFilteredData(tempData);
    }
  }, [FILTERR, establishmentList, isLoading, sortBy]);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  function handleClick() {
    // Handle click logic for time slots if needed
  }

  function handleMapClick() {
    setIsShowMap(prev => !prev);
  }

  const getSearchDetailsRoute = () => {
    return getRoute("SearchDetails");
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
    <Card className='search-page-container' sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        style={{ marginTop: '60px', color: '#4D4D4D', backgroundColor: '#FFFBF3' }}
        id='card-header-id'
        title={`${filteredData.length} Venues matching your search`}
        action={
          <div className='flex items-center'>
            <FilterModal />
            <div onClick={handleMapClick}>Show map</div>
          </div>
        }
      />
      <hr />
      <div className='search-result-container'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={isShowMap ? 6 : 12}>
            <Grid container spacing={2}>
              {filteredData && filteredData?.length > 0 ? (
                filteredData?.map((card, index) => (
                  <Grid item xs={12} key={card?.establishmentId}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <div className='card-wrap-container'>
                          <div className='card-container'>
                            <div className='card-header' style={{padding: '20px'}}>
                              {
                                getImages(card?.estImages[0]) 
                                ? 
                                (
                                  <img src={getImages(card?.estImages[0])} alt="CardImage" className='w-full rounded-lg' />
                                ) 
                                :  
                                (
                                  <h6 className='w-full rounded-lg'> Image not uploaded</h6>
                                )
                              }
                              
                              <div className='card-header-details' style={{marginLeft: '20px'}}>
                                <div className='chip-wrap'>
                                  {card?.serviceTags?.map((tag, index) => (
                                    <Chip key={index} label={tag} className='mr-2 mb-2' />
                                  ))}
                                </div>
                                <div className='font-bold text-lg py-2' style={{ color: '#4D4D4D' }}>{card?.establishmentName}</div>
                                <div className="card-rating">
                                  <div className='text-lg'>{card?.rating?.ratingStar}</div>
                                  <StyledRating
                                    name="customized-color"
                                    value={card?.rating?.ratingStar}
                                    precision={0.5}
                                    readOnly
                                  />
                                  <div className='text-sm font-bold'>{'(' + card?.rating?.ratingCount + ')'}</div>
                                </div>
                                <div className='text-base'>{card?.establishmentLocation}</div>
                              </div>
                            </div>
                            <Grid container style={{padding: '20px'}}>
                              {card?.services?.map((service, index) => (
                                <Grid item xs={12} key={index}>
                                  <div className='card-body-details'>
                                    <div className='card-body-title'>
                                      <div className='font-semibold'>{service?.serviceName}</div>
                                      <div>from ${service?.startingPrice}</div>
                                    </div>
                                    <div className="card-slick-container" style={{marginLeft: '20px'}}>
                                      <div style={{ overflowX: 'auto', display: 'flex' }}>
                                        {service?.availabilities?.map((availability, index) => (
                                          <div key={index} className="availability-container">
                                            <div className="time-slots-container">
                                              {availability?.timeSlots?.map((timeSlot, idx) => (
                                                <Chip
                                                  key={idx}
                                                  label={timeSlot}
                                                  variant="outlined"
                                                  onClick={() => handleClick()}  // assuming handleClick needs both timeSlot and date
                                                  className="time-slot-chip"
                                                />
                                              ))}
                                            </div>
                                            <Typography sx={{ color: '#B3B3B3', fontSize: '12px', fontWeight: '500', paddingLeft: '5px' }}>{availability?.date}</Typography>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                              ))}
                            </Grid>
                          </div>
                        </div>
                        <CardActions className='card-footer-action ' style={{borderRadius: '0px 0px 20px 20px'}}>
                          <StoreMallDirectoryOutlinedIcon />
                          <TextRouter name={"Saloon Details"} to={`/salon/${card?.establishmentId}`} />
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" gutterBottom>No result found</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={isShowMap ? 6 : 0}>
            <div className='iframe-container'>
              {isShowMap && (
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31081.53269316962!2d80.20855351621644!3d13.15031202030962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264db59c3d4b5%3A0x9be03109019f05f!2sMadhavaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716260701299!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
