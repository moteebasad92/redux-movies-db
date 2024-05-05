import { Box } from '@chakra-ui/react'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMoviesState, fetchByHeaderFilter,fetchMovies } from '../store/moviesSlice';

function HeaderFilter() {
    const dispatch = useDispatch();
    const headerFilter = useSelector(state => state.movies.query);

    const fetchMoviesByFilter = async (filter) => {
        await dispatch(fetchByHeaderFilter(filter));
        dispatch(clearMoviesState());
        dispatch(fetchMovies(filter));
    };

    useEffect(() => {
        dispatch(clearMoviesState());
        dispatch(fetchMovies('trending/all/day'));
    }, [dispatch]);

  return (
    <Box>
        <ul className="header-filters ">  
            <li className={`filter-name ${headerFilter === "trending/all/day" ? "active" : ""}`} data-title="Trending"> 
                <a onClick={() => {fetchMoviesByFilter("trending/all/day");}}>Trending</a> 
            </li> 
            <li className={`filter-name ${headerFilter === "popular" ? "active" : ""}`} data-title="Popular"> 
                <a onClick={() => {fetchMoviesByFilter("popular");}}>What's Popular</a> 
            </li>
            <li className={`filter-name ${headerFilter === "movie/now_playing" ? "active" : ""}`} data-title="In theatres"> 
                <a onClick={() => {fetchMoviesByFilter("movie/now_playing");}}>In Theatres</a> 
            </li>                     
        </ul>
    </Box>
  )
}

export default HeaderFilter