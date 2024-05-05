import React,{useState} from 'react'
import { 
    Flex,Box,Text,Heading,Image,Button,
    useMediaQuery,Card, CardBody,
    CircularProgress, CircularProgressLabel , Link as ChakraLink
} from '@chakra-ui/react'

import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setClickedMovie,fetchMovies,fetchByLoadMore } from '../store/moviesSlice';

function Movies({ currentItems,flexWidth }) {

    const [isMobile] =  useMediaQuery("(max-width: 800px)") 
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const dispatch = useDispatch();

    const handleImageLoad = () => {
        setImagesLoaded(prevCount => prevCount + 1);
    }
    const getFullYear=(fulldate)=>{
        const date = new Date(fulldate);
        const year = date.getFullYear();
        return year;
    }
    const getShortMovieTitle=(movietitle)=>{
        const maxLength = 18;

        const limitedTitle = 
            movietitle?.length > maxLength ? 
            movietitle.substring(0, maxLength) + "..." : 
            movietitle;
        
        return limitedTitle;
    }
    const handleCardClick = (movie) => {
        dispatch(setClickedMovie(movie)); 
    }

    return (
        <>
            <Flex alignItems='center' gap='3' wrap="wrap" justifyContent="space-between" >
                {currentItems && currentItems.map((movie,index)=>(
                   
                <Box boxShadow='xl' w={isMobile ? "48%" : `${flexWidth}`} minW="100px" bg="gray.300" mb={4} key={index} >
                    <div>{movie.id}</div> 
                    <ChakraLink as={ReactRouterLink} to='/details' onClick={() => handleCardClick(movie)}>
                        <Card maxW='md' className='movie-card' data-id={movie.id} data-media-type={movie.media_type}>
                            <Image
                                objectFit='cover'
                                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                alt='Chakra UI'
                                onLoad={handleImageLoad}
                            />
                            <CardBody className='movie-card-body' pt={3} pb={3}>
                                <Text fontSize='xs' className='movie-date' mb={2}>{getFullYear(movie.release_date ? movie.release_date : movie.first_air_date)}</Text>
                                <Heading as='h6' size='sm' mb={2} className="movie-title">{getShortMovieTitle(movie.title ? movie.title : movie.name)}</Heading>
                                <Box style={{display:'flex',alignItems:'center'}}>
                                    <CircularProgress value={movie.vote_average*10} color='#FFC001' size='40px' className='canvas-progress' position={"absolute"}>
                                        <CircularProgressLabel>{(movie.vote_average*10).toFixed()}%</CircularProgressLabel>
                                    </CircularProgress>
                                </Box>
                            </CardBody>
                        </Card>
                    </ChakraLink>
                </Box>
                
                ))}
            </Flex>
            {imagesLoaded === currentItems.length && (
                <style>
                    {`.movie-card-body {opacity: 1;}`}
                </style>
            )}
            
        </>
    );
}

function MovieCard({ items,flexWidth }) {

    const location = useLocation();
    const dispatch = useDispatch();
    
    const handleLoadMoreClick = async () => {
        await dispatch(fetchByLoadMore('trending/all/day'));
        dispatch(fetchMovies());
    }


  return (

    <>

    <Movies currentItems={items} flexWidth={flexWidth} />

    {location.pathname === '/filter-movies-tv' ? 
        <Button 
        onClick={handleLoadMoreClick} 
        mt={2} size="md" width='20%' className='load-more-btn'>
            Load More
        </Button>
    : ''} 

    </>

  )
}

export default MovieCard
