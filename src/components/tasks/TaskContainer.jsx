import { Button, Container, Flex, VStack, Text, Spacer, ButtonGroup, Divider, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useKis } from '../../context/kis-context'
// import React, { useState } from 'react'
import { TaskBox } from './TaskBox'

export const TaskContainer = ({ onOpen }) => {

  const {state} = useKis()
  const [completedTask, setCompletedTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const { colorMode } = useColorMode()

  useEffect(() => {
    setCompletedTask(state?.filter(item => item.completed === true))
    setActiveTask(state?.filter(item => item.completed === false))
  }, [state])

  return (
    <>
      <Container maxW="container.lg" p='0' mt='4'>
        {state?.length > 0 
        ? <Flex py={{base:'2', md:'5'}} gap='3' direction={{base:'column', lg:'row'}}>
            <TaskBox 
              title='Active Task' 
              fallBackText = 'You Have No Active Task. Add Some Task And Start Focusing Now.🎯'
              tasks={activeTask}
              bgColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'}/>
            <TaskBox 
              title='Completed Task' 
              fallBackText="You Haven't Completed Any Task Yet. Keep Working.💪"
              tasks={completedTask}
              bgColor={colorMode === 'light' ? 'green.500'  : 'green.300'}/>
          </Flex>
        : <VStack h='30vh' justify='center'>
            <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>Mainak Add Your KIS for Today</Text>
            <Button w='60' onClick={onOpen}>Add KIS</Button>
          </VStack>  
      }
      </Container>
      {state?.length > 0 && <Divider/>}
      {state?.length > 0 && <Container maxW="container.lg" p='0' my='4'>
        <Flex align='center' direction={{base:'column', lg:'row'}} gap='2'>
          <Text fontSize={{base:'xl', md:'2xl'}}>Compleion Rate: {(completedTask?.length / state?.length) * 100}%</Text>
          <Spacer/>
          <ButtonGroup>
            <Button onClick={onOpen} colorScheme='blue'>Edit Task</Button>
            <Button  colorScheme='green'>Day Ended</Button>
          </ButtonGroup>
        </Flex>
      </Container>}
      {state?.length > 0 && <Divider/>}
    </>
  )
}


