import { Box, Button, Divider, Flex, Heading, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AddTaskModal, BodyWrapper, KisHistory, Sidebar, TaskContainer } from '../../components'



export const KIS = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()  
  const [dateValue, onChange] = useState(new Date())
  const [showKisHistory, setShowKisHistory] = useState(false)

  const handleKisHistoryDisplay = () => {
    setShowKisHistory(prevData => !prevData)
  }


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
                openTaskModal={onOpen}
                dateValue={dateValue.toLocaleDateString()}
              />
              <Divider/>
              {showKisHistory 
              ? <KisHistory handleKisHistoryDisplay={handleKisHistoryDisplay}/>
              : <Button onClick={handleKisHistoryDisplay} mt='4'>Show KIS History</Button>}
              <AddTaskModal 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                dateValue={dateValue}
                onChange={onChange}
              />
            </BodyWrapper>
        </Flex>
    </>
  )
}


