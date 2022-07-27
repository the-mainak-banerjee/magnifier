import { Button, Container, Flex, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../../context'
import { BsFillPenFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { deleteNoteData } from '../../backend/controllers/NotesControllers'
import { deleteFolder } from '../../backend/controllers/FolderControllers'
import { useAuth } from '../../context'


export const FolderItem = ({ folder }) => {

    const { colorMode } = useColorMode()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { trashedNotes } = useNotes()
    const [trashedNotesNumber,setTrashedNotesNumber] = useState()


     // Cheked Trashed Notes Number In A Folder
     useEffect(() => {
        setTrashedNotesNumber(folder.notes?.filter(item => trashedNotes.some(note => note.id===item)).length)
    },[folder,trashedNotes])


    // Handle functions of all actions

    // See notes inside of folder
    const handleFolderView = (folder) => {
        navigate(`/notes/notes?q=${folder.id}`)
    }

    // Delete a folder
    const handleFolderDelete = (folder) => {
        deleteFolder(user,folder.id)

        // Move all notes of the folder to Trash
        folder.notes?.forEach(item => {
            deleteNoteData(user,item)
        })
    }




  return (
    <Container key={folder.id} maxW="xs" h='150' pl={{base:'2', md:'4'}} pt={{base:'2', md:'4'}} pb='0' pr='1' m='2' borderWidth='2px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' _hover={{boxShadow: 'xl'}} position='relative'>

    <Text fontSize='lg' fontWeight='bold' >{folder.name}</Text>

    <Text fontSize='md'>Total Notes:- {folder.notes?.length - trashedNotesNumber}</Text>


    <Flex alignItems='center' gap='2' mb='2'mt='8' position='absolute' bottom='2' right='2'>
        <IconButton size='sm' icon={<BsFillPenFill/>}/>

        <IconButton size='sm' icon={<FaTrash/>}  onClick={() => handleFolderDelete(folder)}/>

        <Button size='sm' onClick={() => handleFolderView(folder)}>View</Button>
    </Flex>

</Container>
  )
}


