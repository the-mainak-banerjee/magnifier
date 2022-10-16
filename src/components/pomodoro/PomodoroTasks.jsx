import { Badge, Button, Container, Flex, Heading, HStack, IconButton, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useToast, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth, useKis, usePomo } from '../../context'
import { v4 as uuid } from 'uuid'
import { BsCheckLg,  BsFillPenFill, BsFillTrashFill } from 'react-icons/bs'
import { FaUndo } from 'react-icons/fa'
import { addData, deleteData, updateData } from '../../backend/controllers/TaskControllers'
import { updateUser } from '../../backend/controllers/UserControllers'
import { serverTimestamp } from 'firebase/firestore'


export const PomodoroTasks = ({ pomoContainerRef,addTaskRef }) => {


    const [formData, setFormData] = useState({
        id: '',
        name:'',
        usedPomodoroNo: 0,
        taskType: ''
    })
    const [kisFormData,setKisFormData] = useState({
        id: '',
        name:'',
        usedPomodoroNo: 0,
        taskType: ''
    })
    const [kisTaskData,setKisTaskData] = useState([])
    const [isEditing,setIsEditing] = useState(false)
    const [editableTask,setEditableTask] = useState({})
    const [loading,setLoading] = useState(false)

    const {allPomodoroTask, todaysPomodoroTasks, reset, setReset, setPause, pomodoroTask} = usePomo()
    const { kisOfTheDay } = useKis()
    const { user } = useAuth()

    const { colorMode } = useColorMode()
    const completedTaskBgColor = colorMode === 'light' ? 'green.300'  : 'green.600'

    const toast = useToast()

    useEffect(() => {
        setKisTaskData(kisOfTheDay?.filter(task=>!task.completed && !allPomodoroTask.some(data => data.id === task.id)))
    },[kisOfTheDay,allPomodoroTask])


    const handleKisSelection = (e) => {
        const kisTask = kisOfTheDay.find(item => item.id === e.target.value)
        setKisFormData({name:kisTask.name, taskType:'KIS',id:kisTask.id, usedPomodoroNo: 0,})
    }


    const handleTaskForm = () => {
        if(formData.name){
            // pomoDispatch({ type: 'ADDPOMO', name: formData.name, id:formData.id, taskType: formData.taskType})
            const data = {
                name: formData.name,
                taskType: formData.taskType,
                completed: false,
                usedPomodoroNo: {short:0, medium: 0},
                date: new Date().toDateString(),
                timeStamp: serverTimestamp()
            }
            addData(setLoading,user,'PomoTask', data, formData.id)

            // setPomodoroTask(formData)
            updateUser(user.uid,{pomoDoroTask: {...data, id:formData.id}})

            setFormData({
                id: '',
                name:'',
                usedPomodoroNo: 0,
                taskType: ''
            })
        }else if(kisFormData.name){
            // pomoDispatch({ type: 'ADDPOMO', name: kisFormData.name, id:kisFormData.id, taskType: kisFormData.taskType})
            const data = {
                name: kisFormData.name,
                taskType: kisFormData.taskType,
                completed: false,
                usedPomodoroNo: {short:0, medium: 0},
                date: new Date().toDateString(),
                timeStamp: serverTimestamp()
                // kisTaskId: kisFormData.id
            }
            addData(setLoading,user,'PomoTask', data, kisFormData.id)
            
            // setPomodoroTask(kisFormData)
            updateUser(user.uid,{pomoDoroTask: {...data, id:kisFormData.id}})
            setKisFormData({
                id: '',
                name:'',
                usedPomodoroNo: 0,
                taskType: ''
            })
        }
        setReset(true)
        setPause(false)
    }


    const handleDelete = (task) => {
        // pomoDispatch({ type: 'DELETE' , payload: task?.id})
        deleteData(user,'PomoTask', task?.id) 

        if(task.taskType === 'KIS'){
            // kisDispatch({ type: 'DELETE' , payload: task?.id}) 
            deleteData(user,'KISTask', task?.id) 
        }


        if(pomodoroTask?.id === task.id){
            // setPomodoroTask(null)
            updateUser(user.uid,{pomoDoroTask: {}})
        }

    }
    

    const handleCompletedtask = (task) => {
        // pomoDispatch({ type: 'COMPLETE', payload: task?.id})
        let updatedData = {
            completed: !task.completed
          }
    
          updateData(user,'PomoTask', task.id, updatedData)

        if(task.taskType === 'KIS'){
            // kisDispatch({ type: 'COMPLETE' , payload: task?.id}) 
            updateData(user,'KISTask', task.id, updatedData)
        }

        if(pomodoroTask?.id === task.id){
            // setPomodoroTask(null)
            updateUser(user.uid,{pomoDoroTask: {}})
        }
    }


    const handleTaskEdit = () => {
        // pomoDispatch({ type: 'EDIT', id: editableTask.id, payload: editableTask.name })

        let updatedData = {
            name: editableTask.name
          }
    
          updateData(user,'PomoTask', editableTask.id, updatedData)

        if(editableTask.taskType === 'KIS'){
            // kisDispatch({ type: 'EDIT', id: editableTask.id, payload: editableTask.name })

            updateData(user,'KISTask', editableTask.id, updatedData)
        }

        if(pomodoroTask?.id === editableTask.id){
            // setPomodoroTask(prevData => ({...prevData, name: editableTask.name}))
            updateUser(user.uid,{pomoDoroTask: {...pomodoroTask, name: editableTask.name}})
        }

        toast({
            title:'Task edited successfully',
            status: 'success',
            position: 'bottom-left'
        })

        setIsEditing(prevState => !prevState)
    }
    

    const handleEditFormVisibility = (task) => {
        setIsEditing(prevState => !prevState)
        setEditableTask(task)
    }


    const handleTaskStart = (task) => {
        // setPomodoroTask(task)
        updateUser(user.uid,{pomoDoroTask: task})
        setReset(prevState => !prevState)
        pomoContainerRef.current.scrollIntoView()
    }
      

  return (
    <>
        {(reset || !pomodoroTask?.name) && <Container maxW="container.lg" p='4' my='4' boxShadow='md'>
            <Flex align='center' direction='column' gap='2' ref={addTaskRef}>
                {isEditing 
                ? <Input placeholder='Add a task' value={editableTask.name} onChange={(e) => setEditableTask(prevData => ({...prevData, name:e.target.value}))}/>
                : <Flex flexDirection='column' alignItems='center' w='full'>    
                    <Heading as='h4' size='md' mb='2'>Add Tasks To Focus On</Heading> 
                    <Input placeholder='Add a task' value={formData.name} onChange={(e) => setFormData({name:e.target.value, taskType:'POMO', usedPomodoroNo: 0,  id: uuid()})} isDisabled={kisFormData.name}/>
                </Flex>
                }

                {(!isEditing && kisTaskData?.length>0 && formData.name?.length === 0) && <VStack w='full'>
                        <Heading as='h5' size='md'>Or</Heading> 
                        <Flex flexDirection='column' alignItems='center' w='full'>    
                            <Heading as='h4' size='md' mb='2'>Select A Task From KIS</Heading> 
                            {kisTaskData.map(item => {
                                return(
                                    <HStack key={item.id} w='full' px='4' py='1' mb='2'>   
                                        <input id={item.id} type='radio' name='KISTASK' value={item.id} checked={kisFormData.id === item.id} onChange={handleKisSelection}/>
                                        <label htmlFor={item.id}>{item.name}</label>
                                        
                                    </HStack>
                                )
                            })} 
                        </Flex>   
                </VStack>}
                
                {/* <Select placeholder='Est. Pomodoro' value={formData.pomodoroNo} onChange={(e) => setFormData(prevData => ({...prevData, pomodoroNo:e.target.value}))}>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                    <option value={4}>Four</option>
                    <option value={5}>Five</option>
                </Select> */}
            </Flex>
            {isEditing 
            ? <Button w='100%' colorScheme='blue' onClick={handleTaskEdit} mt='4' disabled={!editableTask}>Update Task</Button>
            :<Button w='100%' colorScheme='blue' onClick={handleTaskForm} mt='4' disabled={!formData.name && !kisFormData.name} isLoading={loading} loadingText='Adding...'>Add Task</Button>}
        </Container>}
        {todaysPomodoroTasks?.length > 0 && <Container maxW="container.lg" p='0' my='4'>
            <TableContainer>
                <Table size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Sl No</Th>
                            <Th>Task Name</Th>
                            <Th>Pomodoro Used</Th>
                            <Th>Actions</Th>
                            <Th>Focus</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {todaysPomodoroTasks?.map((task, idx) => {
                            return(
                                <Tr key={task.id} bg={task?.completed &&  completedTaskBgColor}>
                                    <Td>{idx+1}</Td>
                                    <Td>
                                       {task.name}<Badge ml='2' fontSize='0.5em'>{task.taskType}</Badge>
                                    </Td>
                                    <Td>
                                        <Table size='sm'>
                                            <Thead>
                                                <Tr>
                                                    <Th>25m</Th>
                                                    <Th>35m</Th>
                                                </Tr>
                                            </Thead>
                                        
                                        <Tbody>
                                            <Tr>
                                                <Td>{task?.usedPomodoroNo.short}</Td>
                                                <Td>{task?.usedPomodoroNo.medium}</Td>
                                            </Tr>
                                        </Tbody>
                                        </Table>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            {!task?.completed && <IconButton icon={<BsFillPenFill/>} 
                                            onClick={() => handleEditFormVisibility(task)}
                                            disabled={!reset}/>}
                                            <IconButton 
                                                icon={task?.completed ? <FaUndo/> : <BsCheckLg/>}
                                                onClick={() => handleCompletedtask(task)}
                                                disabled={!reset}
                                            />
                                            <IconButton 
                                                icon={<BsFillTrashFill/>}
                                                onClick={() => handleDelete(task)}
                                                disabled={!reset}/>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        {task.completed 
                                        ? <Text>COMPLETED</Text>
                                        : <Button 
                                            colorScheme='blue'
                                            disabled={task.completed || !reset}
                                            onClick={() => handleTaskStart(task)}
                                        >
                                            Start Task</Button>
                                        }
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>}
    </>
  )
}

