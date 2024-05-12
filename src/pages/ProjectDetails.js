import React from 'react'
import { Box, Container, Heading, Flex, Image, Text,ListItem,UnorderedList, } from '@chakra-ui/react'
function ProjectDetails() {
  return (
    <>
      <div className='c-wrap'>
        <Container maxW='4xl' bg='white' padding={4} mt={50} mb={50}>
          <Flex alignItems='flex-start' gap='8' >
            <Box>
                <Heading as='h5' size='md' pb={4} color='black'>Tools: </Heading>
                <Text fontSize='sm' mb={2}><strong>Tech :</strong> ReactJS, React Router DOM</Text>
                <Text fontSize='sm' mb={2}><strong>CSS Framework :</strong> Chakra UI</Text>
                <Text fontSize='sm' mb={2}><strong>State Management :</strong> Redux Toolkit, Redux Persist</Text>
                <Text fontSize='sm' mb={2}><strong>API Endpoint :</strong> The Movie Database (TMBD)</Text>
            </Box>
          </Flex>
          <Flex alignItems='flex-start' gap='8' mt={5}>
            <Box>
                <Heading as='h5' size='md' pb={4} color='black'>Summary: </Heading>
                <UnorderedList>
                    <ListItem>Developed a React application featuring trending, popular, in-theatre, and upcoming movies.</ListItem>
                    <ListItem>Implemented a user-friendly interface with a search bar for title-based movie searches.</ListItem>
                    <ListItem>Incorporated sorting options for users to organize movies based on different criteria, enhancing user experience and customization.</ListItem>
                    <ListItem>Leveraged Redux Toolkit and Redux Persist for efficient state management, ensuring seamless data flow and persistence across the application.</ListItem>
                </UnorderedList>
            </Box>
          </Flex>
        </Container>
      </div>
    </>
  )
}

export default ProjectDetails