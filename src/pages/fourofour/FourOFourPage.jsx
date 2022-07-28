import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, Sidebar } from '../../components'

const FourOFourPage = () => {
  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
                <Flex alignItems='center' justifyContent='center' height='60vh' flexDirection='column'>
                    <Heading as='h2' size='2xl'>
                        404
                    </Heading>
                    <Text fontSize='lg'>
                        Oops! This Page Does Not Exist.
                    </Text>
                </Flex>
            </BodyWrapper>
        </Flex>
    </>
  )
}

export default FourOFourPage
