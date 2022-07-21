import { Button, Container, Flex, VStack, Text, Spacer, ButtonGroup, Divider, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useKis } from '../../context/kis-context'
import { TaskBox } from './TaskBox'

export const TaskContainer = ({ openTaskModal,dateValue }) => {

  const {state,dispatch, kisHistory, setKisHistory} = useKis()
  const [completedTask, setCompletedTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const [showDateEndDetails,setShowDateEndDetails] = useState(false)
  const [hasErrorInDayEnd, setHasErrorInDayEnd] = useState(false)
  const { colorMode } = useColorMode()

  useEffect(() => {
    setCompletedTask(state?.filter(item => item.completed === true))
    setActiveTask(state?.filter(item => item.completed === false))
  }, [state])

  const handleOpenAlert = () => {
    setHasErrorInDayEnd(false)
    setShowDateEndDetails(true)
  }

  const handleDayEnd = () => {
    if(kisHistory?.some(item => item.date === dateValue)){
      setHasErrorInDayEnd(true)
    }else{
      setKisHistory(prevData => [...prevData, {id: uuid(), date:dateValue, tasks: state }])
      dispatch({type: 'CLEAR'})
      setShowDateEndDetails(false)
    }
  }

  return (
    <>
      <Container maxW="container.lg" p='0' mt='4'>
        {state?.length > 0 
        ? <Flex py={{base:'2', md:'5'}} gap='3' direction={{base:'column', lg:'row'}}>
            <TaskBox 
              title='Active Task' 
              fallBackText = 'You Have No Active Task. Add Some Task And Start Focusing Now.🎯'
              tasks={activeTask}
              borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'}/>
            <TaskBox 
              title='Completed Task' 
              fallBackText="You Haven't Completed Any Task Yet. Keep Working.💪"
              tasks={completedTask}
              borderColor={colorMode === 'light' ? 'green.500'  : 'green.300'}/>
          </Flex>
        : <VStack h='30vh' justify='center'>
            <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>Mainak Add Your KIS for Today</Text>
            <Button w='60' onClick={openTaskModal} colorScheme='blue'>Add KIS</Button>
          </VStack>  
      }
      </Container>

      {state?.length > 0 && <Divider/>}


      {state?.length > 0 && !showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <Flex align='center' direction={{base:'column', lg:'row'}} gap='2'>
          <Text fontSize={{base:'xl', md:'2xl'}}>Compleion Rate: {(completedTask?.length / state?.length) * 100}%</Text>
          <Spacer/>
          <ButtonGroup>
            <Button onClick={openTaskModal} colorScheme='blue'>Edit Task</Button>
            <Button  colorScheme='green' onClick={handleOpenAlert}>Day Ended</Button>
          </ButtonGroup>
        </Flex>
      </Container>}
      {state?.length > 0 && showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <VStack>
          <Text fontSize='lg' textAlign='center'>{hasErrorInDayEnd ? 'You Are Ending The Same Day Multiple Times. Please Close this box and then click on "Edit Task" Button To Change The Date.' : "Are You Sure You Want To End Your Day? You can't undo this action afterwards."} </Text>
          <ButtonGroup>
              <Button onClick={() => setShowDateEndDetails(false)} mr='2'>Cancel</Button>
              <Button colorScheme='red' onClick={handleDayEnd} disabled={hasErrorInDayEnd}>End The Day</Button>
          </ButtonGroup>
        </VStack>
      </Container>}
      {state?.length > 0 && <Divider/>}
    </>
  )
}


