import { Container, Divider, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, FolderContainer, Sidebar } from '../../components'

export const Folder = () => {
  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
              <Container maxW="container.lg" p='0' mb='4'>
                <Heading as='h3' size='xl'>Note Folders</Heading>
              </Container>  
              <Divider/>
              <FolderContainer/>
            </BodyWrapper>
      </Flex>
    </>
  )
}

