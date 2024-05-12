import React, { useState,useEffect } from 'react';
import { 
    Select, Tag,
    TagLabel,Heading 
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { fetchBySidebarSorting, fetchMovies, setSortByInitialized } from '../store/moviesSlice';

function SidebarFilters() {
    const dispatch = useDispatch();

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        dispatch(fetchBySidebarSorting(selectedOption));
        dispatch(setSortByInitialized(true));
        dispatch(fetchMovies('discover/movie'));
    };
   
  return (
    <>
    <Heading as='h4' size='sm' mb={2} className="movie-title" color="#000">Sort By :</Heading>
    <Select 
        placeholder='Select option' 
        color="#000" 
        className='sorting-filter' 
        mb={4}
        onChange={handleSortChange}
    >
        <option value='title.asc'>Title (A-Z)</option>
        <option value='title.desc'>Title (Z-A)</option>
        <option value='vote_average.asc'>Rating Ascending</option>
        <option value='vote_average.desc'>Rating Descending</option>
    </Select>
    {/* <fieldset>
        <legend>Genre</legend>
        <Tag size='md' bg='' borderRadius='full' className="genre-tag" >
            <TagLabel>Test Genre</TagLabel>
        </Tag>
        
    </fieldset> */}
    </>
  )
}

export default SidebarFilters
