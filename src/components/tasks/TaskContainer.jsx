import { Button, Container, Flex, VStack, Text, Spacer, ButtonGroup, Divider, useColorMode, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth, useKis } from '../../context'
import { TaskBox } from './TaskBox'
import { addData, deleteData } from '../../backend/controllers/TaskControllers'
import useActiveUser from '../../hooks/useActiveUser'
import { serverTimestamp } from 'firebase/firestore'

export const TaskContainer = ({ openTaskModal }) => {

  const { colorMode } = useColorMode()
  const { kisHistory, kisOfTheDay, loading: kisDataLoading } = useKis()
  const { user } = useAuth()
  const { accountDetails } = useActiveUser(user?.uid)

  const [completedTask, setCompletedTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const [dateValue, setDateValue] = useState('')
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

  useEffect(() => {
    setHasErrorInDayEnd(false)
  }, [dateValue])

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
        tasks: kisOfTheDay,
        timeStamp: serverTimestamp()
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
              fallBackText = 'You have no active task. If you have completed all task of the day then please click on "Day Ended" button. Or add some task and start Focusing Now.🎯'
              tasks={activeTask}
              borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'}/>
            <TaskBox 
              title='Completed Task' 
              fallBackText="You haven't completed any task yet. Keep Working.💪"
              tasks={completedTask}
              borderColor={colorMode === 'light' ? 'green.500'  : 'green.300'}/>
          </Flex>
        : <VStack h='30vh' justify='center'>
            {kisDataLoading 
            ? <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>Loading...</Text>
            : <Text fontSize={{base:'xl', md:'2xl'}} textAlign='center'>{accountDetails?.name} add your KIS for today</Text>}
            {!kisDataLoading && <Button w='60' onClick={openTaskModal} colorScheme='blue'>Add KIS</Button>}
          </VStack>  
      }
      </Container>

      {kisOfTheDay?.length > 0 && <Divider/>}


      {kisOfTheDay?.length > 0 && !showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <Flex align='center' direction={{base:'column', lg:'row'}} gap='2'>
          <Text fontSize={{base:'xl', md:'2xl'}}>{`Completion Rate: ${Math.floor((completedTask?.length / kisOfTheDay?.length) * 100)}%`}</Text>
          <Spacer/>
          <ButtonGroup>
            <Button onClick={openTaskModal} colorScheme='blue'>{kisOfTheDay?.length === 5 ? 'Edit KIS Taks' : 'Add More Tasks'}</Button>
            <Button  colorScheme='green' onClick={handleOpenAlert}>End The Day</Button>
          </ButtonGroup>
        </Flex>
      </Container>}


      {kisOfTheDay?.length > 0 && showDateEndDetails && <Container maxW="container.lg" p='0' my='4'>
        <VStack>
          <Text fontWeight='bold' fontSize='xl' color={colorMode === 'light' ? 'red' : 'red.300'}>Select The Date You Are Ending.</Text>
          {/* <DatePicker onChange={onChange} value={dateValue} className="react-datapicker__input-text"/> */}
          <Input type='date' onChange={(e) => setDateValue(e.target.value)}/>
          <Text fontSize='lg' textAlign='center'>{hasErrorInDayEnd ? 'You are ending the same day multiple times. Please change the date first and then end the day.' : `Are you sure you want to End The Day - ${dateValue}? You can't undo this action afterwards.`} </Text>
          <ButtonGroup>
              <Button onClick={() => setShowDateEndDetails(false)} mr='2'>Cancel</Button>
              <Button 
                colorScheme='red' 
                onClick={handleDayEnd} 
                disabled={hasErrorInDayEnd || !dateValue} 
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


