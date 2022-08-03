import { Container, Flex, IconButton, Input, Spacer, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { getNoteData, updateNoteData } from '../../backend/controllers/NotesControllers'
import { useAuth } from '../../context'

export const NotesEditor = () => {

    const params = useParams()
    const { user }= useAuth()
    const [loading,setLoading] = useState(false)
    const [noteTitle,setNoteTitle] = useState('')
    const [noteContent,setNoteContent] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const unSub = getNoteData(user,params.notesId,setNoteTitle,setNoteContent)
        return () => unSub && unSub()
      },[params,user])


    useEffect(() => {
        const timeOut = setTimeout(() => {
            const data = {
                content: noteContent,
                title: noteTitle
            }
            updateNoteData(user,params.notesId,data,setLoading)            
        },500)

        return () => clearTimeout(timeOut)
        // eslint-disable-next-line
    },[noteContent,noteTitle,params])
   


  return (
    <Flex direction='column'>
        <Flex alignItems='center'>
            <IconButton icon={<BsArrowLeft/>} size='sm' onClick={() => navigate(-1,{replace:true})}/>
            <Input 
                placeholder='Title...'
                value={noteTitle} 
                onChange={(e) => setNoteTitle(e.target.value)}
                variant='flushed' 
                fontSize='2xl' w='60%' ml='4'/>
            <Spacer/>
            <Text>{loading ? 'Saving...' : 'Saved'}</Text>
        </Flex>
        <Container my='8'>
            <Textarea
                placeholder='Type Your Notes Here...'
                width='100%'
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                autoFocus
            />
        </Container>
    </Flex>
  )
}

