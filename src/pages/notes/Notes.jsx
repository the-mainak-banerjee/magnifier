import { Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, NotesAddNewSec, NotesContainer, NotesHeaderSec, NotesPinnedSec, Sidebar } from '../../components'
import { useNotes } from '../../context'

export const Notes = () => {

    const { othersNote, pinnedNotes, unPinnedNotes } = useNotes()

  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
                <NotesHeaderSec notes={othersNote}/>
                <Divider/>
                <NotesAddNewSec/>
                <Divider/>
                {pinnedNotes.length>0 && <NotesPinnedSec/>}
                {pinnedNotes?.length > 0 && <Text fontSize='md' fontWeight='semiBold' ml='6'>OTHERS</Text>}
                <NotesContainer notes={unPinnedNotes}/>
            </BodyWrapper>
        </Flex>
    </>
  )
}
