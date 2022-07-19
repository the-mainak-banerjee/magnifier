import { Button, ButtonGroup, Flex, IconButton, Spacer, Text, Textarea, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCheckLg, BsFillCheckCircleFill, BsFillPenFill, BsFillTrashFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaUndo } from 'react-icons/fa'
import { useKis } from '../../context/kis-context'


export const TaskItem = ({ task, pencil, check, idx }) => {
  const { dispatch } = useKis()
  const [isEditing,setIsEditing] = useState(false)
  const [editableTask,setEditableTask] = useState('')
  const { colorMode } = useColorMode()

  const activeTaskBgColor = colorMode === 'light' ? 'blue.300'  : 'blue.600'
  const completedTaskBgColor = colorMode === 'light' ? 'green.300'  : 'green.600'

  const handleDelete = () => {
    dispatch({ type: 'DELETE' , payload: task?.id})
  }
  
  const handleCompletedtask = () => {
    dispatch({ type: 'COMPLETE', payload: task?.id})
  }

  const handleTaskEdit = () => {
    dispatch({ type: 'EDIT', id: task?.id, payload: editableTask })
    setIsEditing(prevState => !prevState)
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

