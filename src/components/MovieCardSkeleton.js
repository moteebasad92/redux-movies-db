import React from 'react'
import { 
    Skeleton,
    Card,CardBody,useMediaQuery,
    Box,Flex
} from '@chakra-ui/react'

function MovieCardSkeleton({flexWidth}) {
    const [isMobile] = useMediaQuery("(max-width: 768px)") 
  return (
    <Flex alignItems='center' gap='3' wrap="wrap" justifyContent="space-between">
        {Array.from(Array(20)).map((_, index) => (
        <Box boxShadow='xl' w={isMobile ? "48%" : `${flexWidth}`} minW="100px" bg="gray.300" mb={4} key={index}>
            <Card maxW='md' className='movie-card-skeleton'>
                <Skeleton height='280px'/>
                <CardBody pt={3} pb={3} className="movie-card-skeleton-body">
                    <Skeleton height='10px' width='50%' mb={2} />
                    <Skeleton height='10px' width='70%' mb={2} />
                    <Skeleton height='10px' width='30%' />
                </CardBody>
            </Card>
        </Box>
        ))}
    </Flex>
  )
}

export default MovieCardSkeleton