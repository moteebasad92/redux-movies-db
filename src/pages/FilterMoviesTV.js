import React,{ useEffect } from 'react'
import { Container,Flex,Box,Heading,Hide} from '@chakra-ui/react'
import MovieCard from '../components/MovieCard'
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchMovies,fetchByLoadMore } from '../store/moviesSlice';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import SidebarFilters from '../components/SidebarFilters';

function FilterMoviesTV() {

    const dispatch = useDispatch();
    const { data: movies, status } = useSelector((state) => state.movies);

    useEffect(() => {
      dispatch(fetchByLoadMore('trending/all/day'));
      dispatch(fetchMovies());
    }, []);


  return (
    <>
        <Container maxW='8xl' color='white' pl={4} pr={4} mt={50} mb={30}>
            <Flex>
                <Hide below="md">
                    <Box flex='1' bg='#F1F2F3' pr={50}>
                        <Heading as='h4' size='sm' mb={5} className="movie-title" color="#000">FILTERS :</Heading>
                        <SidebarFilters />
                    </Box>
                </Hide>
                <Box flex='3'>
                {status === STATUSES.LOADING || status === STATUSES.ERROR ? (
                  <MovieCardSkeleton  flexWidth="23%"/>
                ) : (
                  <MovieCard items={movies}  flexWidth="23%"/>
                )}
                </Box>
            </Flex>
        </Container>
        {status === STATUSES.IDLE && (
          <style>
              {`.movie-card-body {opacity: 1;}`}
          </style>
        )}
    </>
  )
}

export default FilterMoviesTV