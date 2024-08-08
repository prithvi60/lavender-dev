import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Typography, styled } from '@mui/material';
import { Rating } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import endpoint from '../../api/endpoints';
import { useQuery } from '@tanstack/react-query';
import Text from '../../components/Text';
import {Box} from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export const Reviews = ({establishmentId}: any) => {

  const payload = {
    "pageNumber": 1,
    "pageSize": 1,
    "sortBy": "string",
    "sortDirection": "string"
  }

  const {isLoading, data: reviewData} = useQuery({
    queryKey: ["query-establishment-reviews"],
    queryFn: () => {
      return endpoint.getAppointmentReview(establishmentId, payload)
    },
  });
  
  return (
    <Box className="mx-16" id="SearchDetailReview" sx={{width: '85%', '@media (max-width: 640px)': {mx: 4}}}>
      <ReviewsTable data={reviewData?.data?.data?.content} />
    </Box>
  );
};

const PublicCommentsRow = ({ publicComments }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  const renderComments = () => {
    if (expanded) {
      return publicComments;
    } else {
      // Truncate to 20 words
      const words = publicComments?.split(' ');
      const truncatedComments = publicComments?.split(' ').slice(0, 20).join(' ');
      const shouldShowSeeMoreButton = words?.length > 20;

      return (
        <>
          {truncatedComments}{' '}
          {
            shouldShowSeeMoreButton && <Button size="small" onClick={toggleExpand} sx={{textTransform: 'none'}}>
            See More
          </Button>
          }
          
        </>
      );
    }
  };

  return (
    <tr>
      <td colSpan={4} className="pl-4">
        <span style={{ fontSize: '20px', color: '#4D4D4D' }}>{renderComments()}</span>
      </td>
    </tr>
  );
};

const ReviewsTable = ({ data }) => {
  // Define columns and data

  const calculateDaysAgo = (dateString) => {
    const currentDate = new Date();
    const reviewDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - reviewDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference < 10) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else {
      // If more than 10 days, display actual date
      return reviewDate.toLocaleDateString();
    }
  };

  // const ServiceTagsCell = ({ value }) => (
  //   <div className="flex flex-wrap">
  //     {value?.map((tag, index) => (
  //       <Chip key={index} label={tag} variant="outlined" className="m-1" />
  //     ))}
  //   </div>
  // );

  const columns = useMemo(
    () => [
      { accessor: 'reviewDate' },
      { accessor: 'serviceTag', 
        cell: ({ row }) => {
          return <div className="flex flex-wrap"><Chip  label={row?.getValue('serviceTag')} variant="outlined" className="m-1" /></div>
        }, },
      { accessor: 'employeeName' },
      { accessor: 'customerName' },
      { accessor: 'serviceRating' },
      { accessor: 'publicComments' }, // This will be rendered separately as a nested row
    ],
    []
  );

  // Create flattened data for rendering
  const flattenedData = useMemo(() => {
    const flattened = [];
    data?.forEach(item => {
      flattened.push({
        reviewDate: calculateDaysAgo(item.reviewDate),
        serviceTag: item.serviceTag,
        employeeName: item.employeeName,
        customerName: item.customerName,
        serviceRating: item.serviceRating,
        isMainRow: true,
      }); // Push main row
      if (item.publicComments) {
        flattened.push({
          publicComments: item.publicComments,
          isMainRow: false,
        }); // Push nested row for public comments
      }
    });
    return flattened;
  }, [data]);

  // Initialize react-table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: flattenedData }, useSortBy);

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    if (sortBy === 'highest') {
      rows.sort((a, b) => b.values.serviceRating - a.values.serviceRating);
    } else if (sortBy === 'lowest') {
      rows.sort((a, b) => a.values.serviceRating - b.values.serviceRating);
    }
  };

  return (
    <div className="w-full">
        <Text sx={styles.heading} name={"Reviews"} align="left"/>
        {
          data?.length > 0 ? (
            <div>
              <div className='flex items-center flex-wrap'>
                <div className='text-4xl'></div>
                <Text sx={styles.rating} name={"4.0"}/>
                <div className='text-center' style={{paddingLeft: 2, paddingRight: 10}}>
                    <StyledRating
                      name="customized-color"
                      value={4}
                      precision={0.5}
                      readOnly
                      sx={{fontSize: '44px'}}
                    /> 
                    <Text name={'reviews'} align="left"/>   
                </div>
                {/* <Box sx={{display: 'flex'}}> */}
                  <Box className="flex justify-end mb-4" sx={{'@media (max-width: 640px)': {alignSelf: 'center'}}}>
                    <Typography sx={{alignContent: 'center', padding: '10px'}}>Service</Typography>
                    <Select
                    defaultValue=""
                    onChange={handleSortChange}
                    className="mr-4"
                    style={{ width: '150px', height: '38px' }}
                    >
                    <MenuItem value="highest">Highest Rating</MenuItem>
                    <MenuItem value="lowest">Lowest Rating</MenuItem>
                    </Select>
                  </Box>
                  <Box className="flex justify-end mb-4" sx={{'@media (max-width: 640px)': {alignSelf: 'center'}}}>
                      <Typography sx={{alignContent: 'center', padding: '10px'}}>Sort by </Typography>
                      <Select
                      defaultValue=""
                      onChange={handleSortChange}
                      className="mr-4"
                      style={{ width: '150px', height: '38px' }}
                      >
                      <MenuItem value="highest">Highest Rating</MenuItem>
                      <MenuItem value="lowest">Lowest Rating</MenuItem>
                      </Select>
                  </Box>
                {/* </Box> */}
              </div>
          
              <table {...getTableProps()} className="w-full table-auto">
                <tbody {...getTableBodyProps()}>
                  {rows?.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={rowIndex}>
                        {/* Render first nested row */}
                        {row?.original?.isMainRow && (
                          <tr className="mb-4">
                            <td className="w-1/4 pt-8 pb-2 px-2 text-base style={{color: '#808080'}}">{row.values.reviewDate}</td>
                            <td className="w-3/4" style={{paddingTop: '18px'}}> <Chip label={row.values.serviceTag} variant="outlined" className="m-1" /></td>
                          </tr>
                        )}
                        {/* Render second nested row */}
                        {row.original.isMainRow && (
                          <tr>
                            <td className="w-1/4 p-2 text-xl font-semibold" style={{color: '#4D4D4D'}}>{row.values.customerName}</td>
                            <td className="w-1/4 p-2 text-base" style={{color: '#808080'}}>{"Serviced by "}{row.values.employeeName}</td>
                          </tr>
                        )}
                        {/* Render third nested row */}
                        {row.original.isMainRow && (
                          <tr>
                            <td className="w-1/4 pl-2 pr-2" colSpan={2}>
                              <StyledRating
                                name="customized-color"
                                value={row.values.serviceRating}
                                precision={0.5}
                                readOnly
                              />
                            </td>
                          </tr>
                        )}
                        {/* Render fourth nested row for public comments */}
                        {!row.original.isMainRow && (
                          <PublicCommentsRow publicComments={row.original.publicComments} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
          :
          (
            <div>
              No reviews
            </div>
          )
        }
        
    </div>
  );
};

const styles={
  heading: {
    color: '#333333',
    fontSize: '36px',
    fontWeight: 600,
    paddingBottom: 2
  },
  rating: {
    color: '#4D4D4D',
    fontSize: '45px',
    fontWeight: 700,
    padding: 1
  },
}
