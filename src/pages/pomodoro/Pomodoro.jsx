import { Box, Divider, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { useRef }  from 'react'
import { Sidebar, BodyWrapper, PomodoroContainer, PomodoroTasks } from '../../components'
import { usePomo } from '../../context'

const Pomodoro = () => {

  const { focus } = usePomo()
  const addTaskRef = useRef()
  const pomoContainerRef = useRef()

  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
              <Flex pb='2' align='center' gap={{base:'2', md:'0'}} direction={{base:'column', md:'row'}}>
                  <Box textAlign={{base:'center',md:'left'}}>
                    <Heading as='h3' size='xl'>Pomodoro</Heading>
                    <Text fontSize='lg' pt='1'>Beat Procastination And Improve Your Focus.</Text>
                  </Box>
                  <Spacer/>
                  {/* <Button colorScheme='gray'>Show Details</Button> */}
                </Flex>
                <Divider/>
                <PomodoroContainer pomoContainerRef={pomoContainerRef} addTaskRef={addTaskRef}/>
                <Divider/>
                {focus && <PomodoroTasks pomoContainerRef={pomoContainerRef} addTaskRef={addTaskRef}/>}
            </BodyWrapper>
        </Flex>
    </>
  )
}




export default Pomodoro