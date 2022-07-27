import { Button, Container, Flex, IconButton, Text, useColorMode, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCheckCircleFill, BsFillPinFill, BsFolderSymlinkFill, BsPin } from 'react-icons/bs'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'
import { useAuth, useNotes } from '../../context'
import { FaTrash, FaTrashAlt, FaTrashRestore } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteNoteData, updateNoteData } from '../../backend/controllers/NotesControllers'
import { NewFolderModal } from './NewFolderModal'

export const NotesItem = ({ note }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    const { foldersDispatch, selectState, setSelectedNotes, onTrashPage, onArchivePage } = useNotes()
    const [actionsVisibility, setActionsVisibility] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const toast = useToast()



    // Create truncate string
    const trunCateString = (text) => {
        if(text.title){
            return text.content.length >= 300 ? `${text.content.slice(0,300)}...` : text.content 
        }else{
            return text.content.length >= 338 ? `${text.content.slice(0,339)}...` : text.content 
        }
    }


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

    // All The Action Handler

    // Pinned A Note
    const handlePinAction = () => {
        // notesDispatch({type: 'PIN', id:note.id})
        const data = {
            isPinned: !note.isPinned,
            isArchived: note.isArchived && !note.isArchived
        }
        updateNoteData(user,note.id,data)
    }

    // Archive a Note
    const handleArchiveAction = () => {
        const data = {
            isPinned: note.isPinned && !note.isPinned,
            isArchived: !note.isArchived
        }
        updateNoteData(user,note.id,data)
        if(note.isArchived){
            showToast('Note Unarchived')
        }else{
            showToast('Note Archived')
        }
    }


    // Add A Note to Trash
    const handleTrashAction = () => {
        const data = {
            isPinned: note.isPinned && !note.isPinned,
            isTrashed: !note.isTrashed
        }
        updateNoteData(user,note.id,data)

        if(note.isTrashed){
            showToast('Note Restored')
        }else{
            showToast('Note Added To Trash')
        }
    }


    // Delete The Note Completely
    const handleDelete= () => {
        deleteNoteData(user,note.id)

        // Remove the note from Folder
        foldersDispatch({type: 'DELETENOTE', fileId: note.id, folderId: note.folderId})  
        
        showToast('Note Deleted Successfully')
    }

    // Select Action handler
    const handleSelectAction = () => {
        const data = {
            isSelected: !note.isSelected
        }
        updateNoteData(user,note.id,data)

        if(note.isSelected){
            setSelectedNotes(prevState => prevState.filter(item => item.id !== note.id))
        }else{
            setSelectedNotes(prevState => [...prevState,note])
        }
    }
   

    const handleViewNote = () => {
        navigate(`/notes/${note.id}`)
    }


  return (
    <Container maxW="xs" h='xs' pl={{base:'2', md:'4'}} pt={{base:'2', md:'4'}} pb='0' pr='1' m='2' borderWidth='2px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' _hover={{boxShadow: 'xl'}} position='relative' onMouseEnter={() => setActionsVisibility(true)} onMouseLeave={() => setActionsVisibility(false)}>

        {note?.title && <Text fontSize='md' fontWeight='bold' >{note.title}</Text>}
        
        {(actionsVisibility || note.isSelected) && <IconButton size='md' variant='unstyled' icon={<BsCheckCircleFill/>} position='absolute' top='-4' left='-2' onClick={handleSelectAction}/>}

        {(actionsVisibility && !selectState) && !onTrashPage && <IconButton size='md' variant='unstyled' icon={note.isPinned ? <BsFillPinFill/> : <BsPin/>} position='absolute' top='2' right='0' onClick={handlePinAction}/>}


        <Text fontSize='md' w='85%'>{trunCateString(note)}</Text>

        {(actionsVisibility && !selectState) && <Flex alignItems='center' gap='2' mb='2'mt='8' position='absolute' bottom='2' right='2'>
            {!onTrashPage && !onArchivePage && <IconButton size='sm' icon={<BsFolderSymlinkFill/>} onClick={onOpen}/>}
            {!onTrashPage && <IconButton size='sm' icon={note.isArchived ? <BiArchiveOut/> : <BiArchiveIn/>} onClick={handleArchiveAction}/>}
            {onTrashPage && <IconButton size='sm' icon={<FaTrash/>} onClick={handleDelete}/>}
            <IconButton size='sm' icon={note.isTrashed ? <FaTrashRestore/> : <FaTrashAlt/>} onClick={handleTrashAction}/>
            {!onTrashPage && <Button size='sm' onClick={handleViewNote}>View</Button>}
        </Flex>}
        
        <NewFolderModal
            isOpen={isOpen}
            onClose={onClose}
            note={note}
        />
    </Container>
  )
}


// 231