import { Container,Flex,Box} from '@chakra-ui/react'
import MovieCard from '../components/MovieCard'
import { useSelector } from 'react-redux';
import { STATUSES } from '../store/moviesSlice';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import HeaderFilter from '../components/HeaderFilter';

function Home() {

    const { data: movies, status } = useSelector((state) => state.movies);

  return (
    <>

      <Container maxW='8xl' color='white' padding={4} mt={50} mb={50}>
          <HeaderFilter />
          <Flex>
              <Box flex="4">
              {status === STATUSES.LOADING || status === STATUSES.ERROR ? (
                <MovieCardSkeleton flexWidth="19%" />
              ) : (
                <MovieCard itemsPerPage={20} items={movies} flexWidth="19%"/>
              )}
              </Box>
          </Flex>
      </Container>

    </>
  )
}

export default Home