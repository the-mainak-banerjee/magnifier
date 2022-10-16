import { Button, ButtonGroup, Container, Flex, Input, Text, useColorMode } from '@chakra-ui/react'
import { v4 as uuid } from 'uuid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useNotes } from '../../context'
import { createNewNote } from '../../backend/controllers/NotesControllers'
import { updateFolderData } from '../../backend/controllers/FolderControllers'

export const NotesAddNewSec = () => {

  const [showForm,setShowForm] = useState(false)
  const [titleFormData,setTitleFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentFolder } = useNotes()
  

  const createNote = () => {

    const noteId = titleFormData.id ?? uuid()

    const data = {
      date: new Date().toDateString(),
      title: titleFormData?.title || 'Untitled',
      content: '',
      isPinned: false,
      folder: currentFolder ? {name:currentFolder?.name, id: currentFolder?.id} : {name:'', id:''},
      isSelected: false,
      isArchived: false,
      isTrashed: false,
    }

      createNewNote(setLoading,user,'AllNotes',noteId,data,navigate)
      
      if(currentFolder){
        const data = {
          notes: [...currentFolder.notes,noteId ]
        }
        updateFolderData(user,currentFolder.id,data)
      }
  }

  return (
    <Container maxW="container.sm" px='4' py='2' my='10' borderWidth='1px' borderColor={colorMode=== 'light' ? 'gray.800' : 'gray.200'} borderRadius='lg' boxShadow={showForm ? 'xl' : ''}>
      {showForm 
      ? <Flex direction='column' gap='4'>
          <Input placeholder='Give your note a title' onChange={(e) => setTitleFormData({id: uuid(), title:e.target.value})} variant='flushed' autoFocus/>

          <ButtonGroup alignSelf='flex-end'>
            <Button onClick={createNote} colorScheme='blue' isLoading={loading} loadingText='Creating...'>Create Note</Button>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
          </ButtonGroup>

        </Flex>
      : <Text fontSize='lg' cursor='pointer' onClick={() => setShowForm(true)}>Take a note...</Text>
      }
    </Container>
  )
}


