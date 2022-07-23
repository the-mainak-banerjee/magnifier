import { Container, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NotesItem } from './NotesItem'

export const NotesContainer = ({notes}) => {
    const location = useLocation()
    const [isTrash,setIsTrash] = useState(false)

    // Checking if the page is Trash page or not
    useEffect(() => {
        if(location.pathname === '/notes/trash'){
            setIsTrash(true)
        }
    },[location])


  return (
    <Container maxW="container.lg" p='0'>
        <Flex flexWrap='wrap'>
            {notes?.map(note => {
                return (
                    <NotesItem
                        key={note.id}
                        note={note}
                        isTrash={isTrash}
                    />
                )
            })}
        </Flex>
    </Container>
  )
}


