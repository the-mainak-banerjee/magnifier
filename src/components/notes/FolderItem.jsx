import { Button, ButtonGroup, Container, Flex, IconButton, Input, Text, useColorMode, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../../context'
import { BsFillPenFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { deleteNoteData } from '../../backend/controllers/NotesControllers'
import { deleteFolder, updateFolderData } from '../../backend/controllers/FolderControllers'
import { useAuth } from '../../context'


export const FolderItem = ({ folder }) => {

    const { colorMode } = useColorMode()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { trashedNotes } = useNotes()
    const [trashedNotesNumber,setTrashedNotesNumber] = useState()
    const [showForm,setShowForm] = useState(false)
    const [formData, setFormData] = useState(folder.name)
    const toast = useToast()


     // Cheked Trashed Notes Number In A Folder
     useEffect(() => {
        setTrashedNotesNumber(folder.notes?.filter(item => trashedNotes.some(note => note.id===item)).length)
    },[folder,trashedNotes])



    // Handle functions of all actions

      // Toast Handler Function 
      const showToast = (title) => {
        toast({
            title: title,
            status: 'success',
            isClosable: true,
            position: 'bottom-left',
            duration: 3000
        })
    }

    // See notes inside of folder
    const handleFolderView = (folder) => {
        navigate(`/notes/notes?q=${folder.id}`)
    }


    // Edit A Folder
    const handleEditFolder = (folder) => {
        updateFolderData(user,folder.id,{name: formData})
        setShowForm(false)
        showToast('Folder Edited Successfully')
    }

    // Delete a folder
    const handleFolderDelete = (folder) => {
        deleteFolder(user,folder.id)

        // Move all notes of the folder to Trash
        folder.notes?.forEach(item => {
            deleteNoteData(user,item)
        })

        showToast('Folder Deleted Successfully')
    }




  return (
    <Container key={folder.id} maxW="xs" h='200' pl={{base:'2', md:'4'}} pt={{base:'2', md:'4'}} pb='0' pr='1' m='2' borderWidth='2px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' _hover={{boxShadow: 'xl'}} position='relative'>

        {!showForm 
        ? (
            <Text fontSize='lg' fontWeight='bold' >{folder.name}</Text>
        ) : (
            <Flex flexDirection='column' gap='4'>
                <Input type='text' value={formData} onChange={(e) => setFormData(e.target.value)}/>
                <ButtonGroup>
                    <Button size='sm' colorScheme='blue' disabled={!formData} onClick={() => handleEditFolder(folder)}>Save</Button>
                    <Button size='sm' colorScheme='red' onClick={() => setShowForm(false)}>Cancel</Button>
                </ButtonGroup>
            </Flex>
        )}

        {!showForm && <Text fontSize='md'>Total Notes:- {folder.notes?.length - trashedNotesNumber}</Text>}


        <Flex alignItems='center' gap='2' mb='2'mt='8' position='absolute' bottom='2' right='2'>
            <IconButton size='sm' icon={<BsFillPenFill/>} onClick={() => setShowForm(true)}/>

            <IconButton size='sm' icon={<FaTrash/>}  onClick={() => handleFolderDelete(folder)}/>

            <Button size='sm' onClick={() => handleFolderView(folder)}>View</Button>
        </Flex>

    </Container>
  )
}


