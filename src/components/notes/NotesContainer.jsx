import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { NotesItem } from './NotesItem'

export const NotesContainer = ({notes}) => {


  return (
    <Container maxW="container.lg" p='0'>
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


