import { Button, ButtonGroup, Container, Flex, Input, Text, useColorMode, useToast } from '@chakra-ui/react'
import { v4 as uuid } from 'uuid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useNotes } from '../../context'
import { createNewFolder } from '../../backend/controllers/FolderControllers'


export const FolderAddNewSec = () => {

  const [showForm,setShowForm] = useState(false)
  const [titleFormData,setTitleFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { allFolders } = useNotes()
  const toast = useToast()


  // Toast Handler Function 
  const showToast = (title,status) => {
    toast({
        title: title,
        status: status,
        isClosable: true,
        position: 'bottom-left',
        duration: 3000
    })
  }

  const createFolder = () => {

    const sameFolderNameExists = allFolders.find(item => item.name === titleFormData.name)
    if(sameFolderNameExists){
      showToast('The Folder Name Already Exists', 'error')
    }else{
      const data = {
        name: titleFormData.name,
        notes: [],
      }
    
      createNewFolder(setLoading,user,'NotesFolder',titleFormData.id,data,navigate)
      setTitleFormData({})
      showToast('Folder Created Successfully','success')
    }
  }
  
  return (
    <Container maxW="container.sm" px='4' py='2' my='10' borderWidth='1px' borderColor={colorMode=== 'light' ? 'gray.800' : 'gray.200'} borderRadius='lg' boxShadow={showForm ? 'xl' : ''}>
      {showForm 
      ? <Flex direction='column' gap='4'>
          <Input placeholder='Add folder name' onChange={(e) => setTitleFormData({id: uuid(), name:e.target.value})} variant='flushed' autoFocus/>

          <ButtonGroup alignSelf='flex-end'>
            <Button onClick={createFolder} colorScheme='blue' disabled={Object.keys(titleFormData).length === 0} isLoading={loading} loadingText='Creating...'>Create Folder</Button>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
          </ButtonGroup>

        </Flex>
      : <Text fontSize='lg' cursor='pointer' onClick={() => setShowForm(true)}>Create a folder...</Text>
      }
    </Container>
  )
}


