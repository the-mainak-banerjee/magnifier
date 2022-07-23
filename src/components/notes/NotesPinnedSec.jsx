import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNotes } from '../../context'
import { NotesItem } from './NotesItem'

export const NotesPinnedSec = () => {

  const { pinnedNotes } = useNotes()

  return (
    <Container maxW="container.lg" py={{base:'2', md:'5'}} px='0' mt='4'>
        <Text fontSize='md' fontWeight='semiBold' ml='6'>PINNED</Text>
        <Flex flexWrap='wrap'>
            {pinnedNotes.map(note => {
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


