import { Button, ButtonGroup, Flex, IconButton, Spacer, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCheckLg, BsFillCheckCircleFill, BsFillPenFill, BsFillTrashFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaUndo } from 'react-icons/fa'
import { useAuth, usePomo } from '../../context'
import { deleteData, updateData } from '../../backend/controllers/TaskControllers'



export const TaskItem = ({ task, pencil, check, idx }) => {
  const { allPomodoroTask, pomodoroTask, setPomodoroTask } = usePomo()
  const [isEditing,setIsEditing] = useState(false)
  const [editableTask,setEditableTask] = useState('')
  const { colorMode } = useColorMode()
  const toast = useToast()
  
  const { user } = useAuth()

  const activeTaskBgColor = colorMode === 'light' ? 'blue.300'  : 'blue.600'
  const completedTaskBgColor = colorMode === 'light' ? 'green.300'  : 'green.600'


    //  Toast Handler Function 
    const showToast = (title) => {
      toast({
          title: title,
          status: 'success',
          isClosable: true,
          position: 'bottom-left',
          duration: 3000
      })
  }


  // All Action handler 

  const handleDelete = () => {    
      deleteData(user,'KISTask', task?.id)

      if(allPomodoroTask.some(item => item.id === task.id)){
        deleteData(user,'PomoTask', task?.id)
      }  

      if(pomodoroTask?.id === task.id){
        setPomodoroTask(null)
      }
      showToast('Task Deleted Successfully!')
  }
  
  const handleCompletedtask = () => {
      // kisDispatch({ type: 'COMPLETE', payload: task?.id})

      let updatedData = {
        completed: !task.completed
      }

      updateData(user,'KISTask', task.id, updatedData)

      if(allPomodoroTask.some(item => item.id === task.id)){
        // pomoDispatch({ type: 'COMPLETE', payload: task?.id})
        updateData(user,'PomoTask', task.id, updatedData)
      }

      if(pomodoroTask?.id === task.id){
        setPomodoroTask(null)
      }
      
      if(task.completed){
        showToast('Task Maked as incomplete')
      }else{
        showToast('Wooohoo! You completed the task')
      }
  }

  


  const handleTaskEdit = () => {
    // kisDispatch({ type: 'EDIT', id: task?.id, payload: editableTask })

    const editedData = {
      name: editableTask
    }

    updateData(user,'KISTask', task.id, editedData)

    if(allPomodoroTask.some(item => item.id === task.id)){
      // pomoDispatch({ type: 'EDIT', id: task?.id, payload: editableTask })
      updateData(user,'PomoTask', task.id, editedData)
    }
    
    setIsEditing(prevState => !prevState)

    showToast('Task Edited Successfully!')
  }

  const handleEditFormVisibility = () => {
    setIsEditing(prevState => !prevState)
    setEditableTask(task?.name)
  }
  

  return (
    <> 
      {!isEditing 
      ? <Flex align='center' bg={task?.completed ? completedTaskBgColor : activeTaskBgColor} w='full' p='2' gap='2'>
          <Text fontSize='lg' fontWeight='semibold'> {idx+1}. {task?.name}</Text>

          <Spacer/>

          {pencil && <IconButton variant='unstyled' icon={<BsFillPenFill/>} onClick={handleEditFormVisibility}/>}
          {check && <IconButton variant='unstyled' icon={task?.completed ? <FaUndo/> : <BsCheckLg/>} onClick={handleCompletedtask}/>}
          <IconButton variant='unstyled' icon={<BsFillTrashFill/>} onClick={handleDelete}/>
        </Flex>
      : <Flex align='center' bg={task?.completed ? completedTaskBgColor : activeTaskBgColor} w='full' p='2' gap='2' direction='column'>
          <Textarea onChange={(e) => setEditableTask(e.target.value)} value={editableTask} fontWeight='semibold'/>

          <ButtonGroup>
            <Button rightIcon={<BsFillCheckCircleFill/>} onClick={handleTaskEdit} disabled={!editableTask}>Done</Button>
            <Button colorScheme='red' rightIcon={<AiFillCloseCircle/>} onClick={handleEditFormVisibility}>Cancel</Button>
          </ButtonGroup>
        </Flex>}
    </>
  )
}

