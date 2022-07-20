import { Box, Button, Divider, Flex, Heading, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { AddTaskModal, BodyWrapper, Sidebar, TaskContainer } from '../../components'



export const KIS = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()  

  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
              <Flex pb='2' align='center' gap={{base:'2', md:'0'}} direction={{base:'column', md:'row'}}>
                <Box textAlign={{base:'center',md:'left'}}>
                  <Heading as='h3' size='xl'>KIS- Keep It Simple</Heading>
                  <Text fontSize='lg' pt='1'>Your Top 3 to 5 Important and Urgent Task Of The Day.</Text>
                </Box>
                <Spacer/>
                <Button colorScheme='gray'>Show Details</Button>
              </Flex>
              <Divider/>
              <TaskContainer
                onOpen={onOpen}
              />
              {/* <p>History Section</p> */}
              <AddTaskModal 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            </BodyWrapper>
        </Flex>
    </>
  )
}


