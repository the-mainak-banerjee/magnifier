import { Button, Container, Flex, VStack, Text, Spacer, ButtonGroup, Divider, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth, useKis } from '../../context'
import { TaskBox } from './TaskBox'
import { addData, deleteData } from '../../backend/controllers/TaskControllers'
import useActiveUser from '../../hooks/useActiveUser'

export const TaskContainer = ({ openTaskModal,dateValue }) => {

  const { colorMode } = useColorMode()
  const { kisHistory, kisOfTheDay, loading: kisDataLoading } = useKis()
  const { user } = useAuth()
  const { accountDetails } = useActiveUser(user?.uid)

  const [completedTask, setCompletedTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const [showDateEndDetails,setShowDateEndDetails] = useState(false)
  const [hasErrorInDayEnd, setHasErrorInDayEnd] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setCompletedTask(kisOfTheDay?.filter(item => item.completed === true))
    setActiveTask(kisOfTheDay?.filter(item => item.completed === false))
  }, [kisOfTheDay])


  // useEffect(() => {
  //   setCompletedTask(state?.filter(item => item.completed === true))
  //   setActiveTask(state?.filter(item => item.completed === false))
  // }, [state])


  const handleOpenAlert = () => {
    setHasErrorInDayEnd(false)
    setShowDateEndDetails(true)
  }


  const handleDayEnd = async () => {
    if(kisHistory?.some(item => item.date === dateValue)){
      setHasErrorInDayEnd(true)
    }else{
      const data = {
        date:dateValue,
        tasks: kisOfTheDay
      }

      addData(setLoading,user,'KISHistory',data)

      kisOfTheDay.forEach(item => {
        deleteData(user,'KISTask', item.id)
      });

      setShowDateEndDetails(false)


      // setKisHistory(prevData => [...prevData, {id: uuid(), date:dateValue, tasks: state }])
      // setLoading(true)
      // try{
      //   await setDoc(doc(db,'users',`${user.uid}`,'KISHistory',`${uuid()}`), {
      //     id: uuid(),
      //     date:dateValue,
      //     tasks: kisOfTheDay
      //   })
      //   setLoading(false)
      //   dispatch({type: 'CLEAR'})
      //   setShowDateEndDetails(false)
      // }catch(error){
      //   console.log(error)
      //   setLoading(false)
      // }
    }
  }



  return (
    <>
      <Container maxW="container.lg" p='0' mt='4'>
        {kisOfTheDay?.length > 0 
        ? <Flex py={{base:'2', md:'5'}} gap='3' direction={{base:'column', lg:'row'}}>
            <TaskBox 
              title='Active Task' 
              fallBackText = 'You Have No Active Task. If You Have Completed All Task Of The Day then Please Click On "Day Ended" Button. Or Add Some Task And Start Focusing Now.🎯'
              tasks={activeTask}
              borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'}/>
            <TaskBox 
              title='Completed Task' 
              fallBackText="You Haven't Completed Any Task Yet. Keep Working.💪"
              tasks={completedTask}
              borderColor={colorMode === 'light' ? 'green.500'  : 'green.300'}/>
          </Flex>
        : <VStack h='30vh' justify='center'>
            {kisDataLoading 
            ? <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>Loading...</Text>
            : <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>{accountDetails?.name} Add Your KIS for Today</Text>}
            {!kisDataLoading && <Button w='60' onClick={openTaskModal} colorScheme='blue'>Add KIS</Button>}
          </VStack>  
      }
      </Container>

      {kisOfTheDay?.length > 0 && <Divider/>}


      {kisOfTheDay?.length > 0 && !showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <Flex align='center' direction={{base:'column', lg:'row'}} gap='2'>
          <Text fontSize={{base:'xl', md:'2xl'}}>{`Compleion Rate: ${Math.floor((completedTask?.length / kisOfTheDay?.length) * 100)}%`}</Text>
          <Spacer/>
          <ButtonGroup>
            <Button onClick={openTaskModal} colorScheme='blue'>Edit Task</Button>
            <Button  colorScheme='green' onClick={handleOpenAlert}>Day Ended</Button>
          </ButtonGroup>
        </Flex>
      </Container>}


      {kisOfTheDay?.length > 0 && showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <VStack>
          <Text fontSize='lg' textAlign='center'>{hasErrorInDayEnd ? 'You Are Ending The Same Day Multiple Times. Please Cancel this and then click on "Edit Task" Button To Change The Date.' : "Are You Sure You Want To End Your Day? You can't undo this action afterwards."} </Text>
          <ButtonGroup>
              <Button onClick={() => setShowDateEndDetails(false)} mr='2'>Cancel</Button>
              <Button 
                colorScheme='red' 
                onClick={handleDayEnd} 
                disabled={hasErrorInDayEnd} 
                isLoading={loading} 
                loadingText='Ending...'
              >
                  End The Day
              </Button>
          </ButtonGroup>
        </VStack>
      </Container>}
      {kisOfTheDay?.length > 0 && <Divider/>}
    </>
  )
}


