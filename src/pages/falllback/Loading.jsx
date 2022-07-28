import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper } from '../../components'

const Loading = () => {
  return (
    <BodyWrapper>
      <Flex alignItems='center' justifyContent='center' height='60vh'>
        <Heading as='h2' size='xl'>
            Magnifier...
        </Heading>
      </Flex>
    </BodyWrapper>
  )
}

export default Loading
