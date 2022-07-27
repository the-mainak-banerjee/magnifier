import React from 'react'
import { Box} from '@chakra-ui/react'

export const BodyWrapper = ({children}) => {
  return (
    <Box as='section' w={{base:'100%', lg:'80vw'}} py='6.5rem' pl={{base:'5', lg:'32'}} pr={{base:'5', lg:'0'}} margin='auto'>
      {children}
    </Box>
  )
}


