import { Badge, Button, Container, Flex, Heading, HStack, IconButton, Input, Table, TableContainer, Tbody, Text, Th, Thead, Tr, useColorMode, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useKis, usePomo } from '../../context'
import { v4 as uuid } from 'uuid'
import { BsCheckLg,  BsFillPenFill, BsFillTrashFill } from 'react-icons/bs'
import { FaUndo } from 'react-icons/fa'


export const PomodoroTasks = () => {

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
    const [editableTask,setEditableTask] = useState({
        id: 0,
        name: '',
        taskType:''
    })

    const {allPomodoroTask, reset, setReset, setPause, dispatch: pomoDispatch, setPomodoroTask, pomodoroTask} = usePomo()
    const { state, dispatch: kisDispatch } = useKis()

    const { colorMode } = useColorMode()
    const completedTaskBgColor = colorMode === 'light' ? 'green.300'  : 'green.600'

    useEffect(() => {
        setKisTaskData(state?.filter(task=>!task.completed && !allPomodoroTask.some(data => data.id === task.id)))
    },[state,allPomodoroTask])

    const handleKisSelection = (e) => {
        const kisTask = state.find(item => item.id === e.target.value)
        setKisFormData({name:kisTask.name, taskType:'KIS',id:kisTask.id, usedPomodoroNo: 0,})
    }


    const handleTaskForm = () => {
        if(formData.name){
            pomoDispatch({ type: 'ADDPOMO', name: formData.name, id:formData.id, taskType: formData.taskType})
            setPomodoroTask(formData)
            setFormData({
                id: '',
                name:'',
                usedPomodoroNo: 0,
                taskType: ''
            })
        }else if(kisFormData.name){
            pomoDispatch({ type: 'ADDPOMO', name: kisFormData.name, id:kisFormData.id, taskType: kisFormData.taskType})
            setPomodoroTask(kisFormData)
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
        if(pomodoroTask?.id === task.id){
            setPomodoroTask(null)
        }

        if(task.taskType === 'KIS'){
            kisDispatch({ type: 'DELETE' , payload: task?.id}) 
        }

        pomoDispatch({ type: 'DELETE' , payload: task?.id})
    }
    
    const handleCompletedtask = (task) => {
        pomoDispatch({ type: 'COMPLETE', payload: task?.id})

        if(task.taskType === 'KIS'){
            kisDispatch({ type: 'COMPLETE' , payload: task?.id}) 
        }

        if(pomodoroTask?.id === task.id){
            setPomodoroTask(null)
        }
    }

    const handleTaskEdit = () => {
        pomoDispatch({ type: 'EDIT', id: editableTask.id, payload: editableTask.name })

        if(editableTask.taskType === 'KIS'){
            kisDispatch({ type: 'EDIT', id: editableTask.id, payload: editableTask.name })
        }

        if(pomodoroTask?.id === editableTask.id){
            setPomodoroTask(prevData => ({...prevData, name: editableTask.name}))
        }

        setIsEditing(prevState => !prevState)
    }
    
    const handleEditFormVisibility = (task) => {
        setIsEditing(prevState => !prevState)
        setEditableTask({name: task?.name, id:task?.id, taskType:task?.taskType})
    }

    const handleTaskStart = (task) => {
        setPomodoroTask({
            id: task.id,
            name: task.name,
            usedPomodoroNo: task.usedPomodoroNo
        })
        setReset(prevState => !prevState)
    }
      

  return (
    <>
        {(reset || !pomodoroTask?.name) && <Container maxW="container.lg" p='0' my='4'>
            <Flex align='center' direction='column' gap='2'>
                {isEditing 
                ? <Input placeholder='Add A Task' value={editableTask.name} onChange={(e) => setEditableTask(prevData => ({...prevData, name:e.target.value}))}/>
                : <Input placeholder='Add A Task' value={formData.name} onChange={(e) => setFormData({name:e.target.value, taskType:'POMO',id:uuid(), usedPomodoroNo: 0,})} isDisabled={kisFormData.name}/>
                }

                {(!isEditing && kisTaskData?.length>0) && <VStack w='full'>
                        <Heading as='h5' size='md'>Or</Heading> 
                        <Flex flexDirection='column' alignItems='center' w='full'>    
                            <Heading as='h4' size='md' mb='2'>Select A Task From KIS</Heading> 
                            {kisTaskData.map(item => {
                                return(
                                    <HStack key={item.id} border='2px' borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'} borderRadius='lg' w='full' px='2' py='1' mb='2'>
                                        <input type='radio' name='KISTASK' value={item.id} checked={kisFormData.id === item.id} onChange={handleKisSelection}/>
                                        <Text>{item.name}</Text>
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
            :<Button w='100%' colorScheme='blue' onClick={handleTaskForm} mt='4' disabled={!formData.name && !kisFormData.name}>Add Task</Button>}
        </Container>}
        {allPomodoroTask?.length > 0 && <Container maxW="container.lg" p='0' my='4'>
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
                        {allPomodoroTask?.map((task, idx) => {
                            return(
                                <Tr key={task.id} bg={task?.completed &&  completedTaskBgColor}>
                                    <Th>{idx+1}</Th>
                                    <Th>
                                       {task.name}<Badge ml='2' fontSize='0.5em'>{task.taskType}</Badge>
                                    </Th>
                                    <Th>{task.usedPomodoroNo}</Th>
                                    <Th>
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
                                    </Th>
                                    <Th>
                                        <Button 
                                            colorScheme='blue'
                                            disabled={task.completed || !reset}
                                            onClick={() => handleTaskStart(task)}
                                        >
                                            Start Task</Button>
                                    </Th>
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

