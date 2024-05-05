import React, { useState,useEffect } from 'react';
import { 
    Select, Tag,
    TagLabel,Heading 
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';

function SidebarFilters() {
    const [uniqueGenres, setUniqueGenres] = useState([]);
   
  return (
    <>
    <Heading as='h4' size='sm' mb={2} className="movie-title" color="#000">Sort By :</Heading>
    <Select placeholder='Select option' color="#000" className='sorting-filter' mb={4}>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
    </Select>
    <fieldset>
        <legend>Genre</legend>
        <Tag size='md' bg='' borderRadius='full' className="genre-tag" >
            <TagLabel>Test Genre</TagLabel>
        </Tag>
        
    </fieldset>
    </>
  )
}

export default SidebarFilters
