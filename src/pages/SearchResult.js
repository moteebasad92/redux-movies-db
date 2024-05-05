import React from 'react'
import {
    Box,
    Flex,
    Container,
    Heading,
    Image,Text,Link as ChakraLink
  } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setClickedMovie } from '../store/moviesSlice';

function SearchResult() {

    const searchResults = useSelector((state) => state.search.searchResults);
    const dispatch = useDispatch();

    const handleCardClick = (movie) => {
        console.log("mediatype", movie);
        dispatch(setClickedMovie(movie)); 
    }


  return (
    <>
    <Container maxW='2xl' color='white' padding={4} mt={50} mb={50}>
        <Box bg="white" p={2} className='search-results-wrap'>
            {searchResults 
                .filter(result => result.overview && result.poster_path)
                .map((result, index) => (
                <ChakraLink as={ReactRouterLink} to='/details' onClick={() => handleCardClick(result)}>    
                    <Flex  key={index} p={4} pb={0} alignItems="center">
                        <Image
                            src={`https://www.themoviedb.org/t/p/w200${result.poster_path}`}
                            alt="title"
                            boxSize="50px"
                            mr={4}
                            className='suggested-result-img'
                        />
                        <Box>
                            <Heading as='h6' size='sm' pb={2} color='black'>{result.title || result.name}</Heading>
                            <Text fontSize='xs' color='black'>{result.overview.length > 100 ? `${result.overview.slice(0, 100)}...` : result.overview}</Text>
                        </Box>
                    </Flex>
                </ChakraLink>
            ))}
        </Box>
    </Container>
    </>
  )
}

export default SearchResult