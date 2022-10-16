import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNotes } from '../../context'
import { NotesItem } from './NotesItem'

export const NotesContainer = ({notes}) => {

    const { pinnedNotes } = useNotes()


  return (
    <Container maxW="container.lg" p='0'>
        {(pinnedNotes?.length > 0 && notes?.length > 0) && <Text fontSize='md' fontWeight='semiBold' ml='6'>OTHERS</Text>}
        <Flex flexWrap='wrap'>
            {notes?.map(note => {
                return (
                    <NotesItem
                        key={note.id}
                        note={note}
                    />
                )
            })}
        </Flex>
    </Container>
  )
}


