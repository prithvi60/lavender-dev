import { CardContent, Chip, Rating } from "@mui/material";
import establishmentImg from '../../assets/establishmentImg.png';
import Text from "../../components/Text";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import FavoriteIcon from '@mui/icons-material/Favorite';


function MyFavorites() {
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
  return (
    <div className="favourite-page-container">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-2xl font-bold mb-8">My Favourites</h2>
        {establishmentSearchResult ? 
          <div className="favourite-cards">
            {establishmentSearchResult?.data?.content?.map((card) => (
              <div className="p-6 favourite-card">
                <img src={establishmentImg} alt="CardImage" className="card-image" />
                <CardContent className='favourite-card-content'>
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
                <FavoriteIcon className="favorite-icon"/>
              </div>
            ))}
          </div>
        : 
          <div className="flex flex-col gap-6 justify-center items-center">
            <h2 className="text-3xl font-semibold text-[#4D4D4D] text-center">You don’t have any favourites</h2>
            <p className="text-lg text-[#333333] max-w-xs text-center">How about checkout through our wide range of services ?</p>
          </div>
        }
      </div>
    </div>
  );
}

export default MyFavorites;
