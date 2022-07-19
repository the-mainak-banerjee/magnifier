import React from 'react'
import { Box} from '@chakra-ui/react'

export const BodyWrapper = ({children}) => {
  return (
    <Box as='section' w='100%' px={[5,10,16]} py='5'>
      {children}
    </Box>
  )
}


