import { Button, Container, Flex, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCheckCircleFill, BsFillPinFill, BsFolderSymlinkFill, BsPin } from 'react-icons/bs'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'
import { useNotes } from '../../context'
import { FaTrash, FaTrashAlt, FaTrashRestore } from 'react-icons/fa'

export const NotesItem = ({ note,isTrash }) => {
    const { colorMode } = useColorMode()
    const { notesDispatch, foldersDispatch, selectState, setSelectedNotes, onTrashPage } = useNotes()
    const [actionsVisibility, setActionsVisibility] = useState(false)
    

    // Create truncate string
    const trunCateString = (text) => {
        if(text.title){
            return text.content.length >= 300 ? `${text.content.slice(0,300)}...` : text.content 
        }else{
            return text.content.length >= 338 ? `${text.content.slice(0,339)}...` : text.content 
        }
    }


    // All The Action Handler

    // Pinned A Note
    const handlePinAction = () => {
        notesDispatch({type: 'PIN', id:note.id})

        // Remove from archive if it is already there.
        if(note.isArchived){
            notesDispatch({type: 'ARCHIVE', id:note.id})
        }
    }

    // Archive a Note
    const handleArchiveAction = () => {
        notesDispatch({type: 'ARCHIVE', id:note.id})

        // If it is pinned them remove pin
        if(note.isPinned){
            notesDispatch({type: 'PIN', id:note.id})
        }
    }


    // Add A Note to Trash
    const handleTrashAction = () => {
        notesDispatch({type: 'TRASH', id:note.id})
        
         // If it is pinned them remove pin
        if(note.isPinned){
            notesDispatch({type: 'PIN', id:note.id})
        }
    }


    // Delete The Note Completely
    const handleDelete= () => {
        notesDispatch({type: 'DELETE', id:note.id}) 

        // Remove the note from Folder
        foldersDispatch({type: 'DELETENOTE', fileId: note.id, folderId: note.folderId})   
    }

    // Select Action handler

    const handleSelectAction = () => {
        notesDispatch({ type: 'SELECT', id:note.id})
        if(note.isSelected){
            setSelectedNotes(prevState => prevState.filter(item => item !== note.id))
        }else{
            setSelectedNotes(prevState => [...prevState,note.id])
        }
    }



  return (
    <Container maxW="xs" h='xs' pl={{base:'2', md:'4'}} pt={{base:'2', md:'4'}} pb='0' pr='1' m='2' borderWidth='2px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' _hover={{boxShadow: 'xl'}} position='relative' onMouseEnter={() => setActionsVisibility(true)} onMouseLeave={() => setActionsVisibility(false)}>

        {note?.title && <Text fontSize='md' fontWeight='bold' >{note.title}</Text>}
        
        {(actionsVisibility || note.isSelected) && <IconButton size='md' variant='unstyled' icon={<BsCheckCircleFill/>} position='absolute' top='-4' left='-2' onClick={handleSelectAction}/>}

        {(actionsVisibility && !selectState) && !onTrashPage && <IconButton size='md' variant='unstyled' icon={note.isPinned ? <BsFillPinFill/> : <BsPin/>} position='absolute' top='2' right='0' onClick={handlePinAction}/>}


        <Text fontSize='md' w='85%'>{trunCateString(note)}</Text>

        {(actionsVisibility && !selectState) && <Flex alignItems='center' gap='2' mb='2'mt='8' position='absolute' bottom='2' right='2'>
            {!onTrashPage && <IconButton size='sm' icon={<BsFolderSymlinkFill/>}/>}
            {!onTrashPage && <IconButton size='sm' icon={note.isArchived ? <BiArchiveOut/> : <BiArchiveIn/>} onClick={handleArchiveAction}/>}
            {onTrashPage && <IconButton size='sm' icon={<FaTrash/>} onClick={handleDelete}/>}
            <IconButton size='sm' icon={note.isTrashed ? <FaTrashRestore/> : <FaTrashAlt/>} onClick={handleTrashAction}/>
            {!onTrashPage && <Button size='sm'>View</Button>}
        </Flex>}
    </Container>
  )
}


// 231