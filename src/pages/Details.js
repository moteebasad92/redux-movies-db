import { Box, Container, Heading, Flex, Image, Text,CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL= 'https://api.themoviedb.org/3/';

function Details() {

  const clickedMovie = useSelector((state) => state.movies.clickedMovie); // Get clickedId from the Redux store 
  const [genres, setGenres] = useState([]);

  console.log("clickedMovie", clickedMovie)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${apiKey}&language=en-US`);
        const genreMap = response.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <>
      <div className='c-wrap'>
        <Container maxW='4xl' bg='white' padding={4} mt={50} mb={50}>
          <Flex alignItems='flex-start' gap='8' >
            <Image
              objectFit='cover'
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${clickedMovie.poster_path}`}
              alt='Chakra UI'
            />
            <Box>
                <Heading as='h3' size='lg' pb={4} color='black'>{clickedMovie.title || clickedMovie.name} </Heading>
                <Text fontSize='sm' color='black' pb={5}>{clickedMovie.overview}</Text>
                <Text fontSize='sm' pb={1}><strong>Release Date :</strong> {clickedMovie.release_date || clickedMovie.first_air_date}</Text>
                <Text fontSize='sm' pb={1}><strong>Genres :</strong> {clickedMovie.genre_ids.map(id => genres[id]).join(', ')}</Text>
                <Text fontSize='sm'><strong>User Score :</strong> {(clickedMovie.vote_average*10).toFixed()}%</Text>
            </Box>
          </Flex>
        </Container>
      </div>
    </>
  )
}

export default Details