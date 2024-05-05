import {
  Box,
  Flex,
  Hide,Show,
  HStack,
  IconButton,Input,InputGroup,InputLeftElement,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Heading,
  Image,Button,Text, Link as ChakraLink
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon,Search2Icon } from '@chakra-ui/icons';
import { NavLink,useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { searchMovies,setQuery } from '../store/searchSlice';
import { setClickedMovie } from '../store/moviesSlice';

export default function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSelector((state) => state.search.searchResults);
  const dispatch = useDispatch();

  const [suggestedResults, setSuggestedResults] = useState([]);
  const [showSuggestedBox, setShowSuggestedBox] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      dispatch(setQuery(query)); 
      try {
          dispatch(searchMovies());
          setSuggestedResults(searchResults.slice(0, 4));
          setShowSuggestedBox(false);
      } catch (error) {
          // dispatch(setError(error.message));
      }

      console.log("Search Results", searchResults);
  };

  const handleShowMore = () => {
    navigate('/search');
    setShowSuggestedBox(true);
    setSearchQuery('');
  };
  
  const handleCardClick = (movie) => {
      console.log("mediatype", movie);
      dispatch(setClickedMovie(movie)); 
      setShowSuggestedBox(true);
      setSearchQuery('');
  }

  return (
    <>
    <Container maxW="10xl" bg={"#121620"}>
      <Container maxW='8xl' >
        <Box bg={useColorModeValue('#121620', 'gray.900')} className="header-box" >
          <Show below='md'>
              <HStack mb={4}>
                  <Heading as='h2' size='2xl' color="#fff" style={{ fontWeight: 'bold', fontSize:'1.875rem',lineHeight:'30px' }}>
                      Redux Movies DB
                  </Heading>
              </HStack>
          </Show>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'} className="header-nav">
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                  <NavLink to='/' ><span>Home</span></NavLink>
                  <NavLink to='/filter-movies-tv' ><span>Filter Movies/TV</span></NavLink>
                  {/* <NavLink to='/details' ><span>Details</span></NavLink> */}
              </HStack>
            </HStack>
            <Hide below='md'>
              <HStack>
                  <Heading as='h2' size='2xl' color="#fff" style={{ fontWeight: 'bold', fontSize:'1.875rem',lineHeight:'30px' }}>
                      Redux Movies DB
                  </Heading>
              </HStack>
            </Hide>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Search2Icon color='gray.300' />}
                />
                <Input 
                  type='search' 
                  placeholder='Search Movies or Tv series' 
                  className='search-input' 
                  borderRadius={"initial"} 
                  width='16rem'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
              {searchQuery.length > 0 && searchResults.length > 0 && !showSuggestedBox && (
                <div className='srw-container'>
                  <Box bg="white" p={2} className='suggested-results-wrap'>
                    {searchResults
                      .filter(result => result.overview && result.poster_path)
                      .slice(0, 4)
                      .map((result, index) => (
                      <ChakraLink as={ReactRouterLink} to='/details' onClick={() => handleCardClick(result)} className="search-link">   
                        <Flex key={index} p={4} pb={0} alignItems="center">
                          <Image
                            src={`https://www.themoviedb.org/t/p/w200${result.poster_path}`}
                            alt={result.title || result.name}
                            boxSize="50px"
                            mr={4}
                            className='suggested-result-img'
                          />
                          <Box>
                            <Heading as='h6' size='sm' pb={2}>{result.title || result.name}</Heading>
                            <Text fontSize='xs' >{result.overview.length > 100 ? `${result.overview.slice(0, 100)}...` : result.overview}</Text>
                          </Box>
                        </Flex>
                      </ChakraLink>
                    ))}
                    {showMore && (
                      <div className='sm-wrap'>
                        <Button onClick={handleShowMore} mt={2} size="md" width='100%' className='show-more-btn'>
                          Show More
                        </Button>
                      </div>
                    )}
                  </Box>
                </div>
              )}
            </Stack>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/filter-movies-tv'>Filter Movies/TV</NavLink>
                {/* <NavLink to='/details'>Details</NavLink> */}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container> 
    </Container> 
    </>
  );
}