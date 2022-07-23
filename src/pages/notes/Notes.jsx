import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, NotesAddNewSec, NotesAllNoteSec, NotesHeaderSec, NotesPinnedSec, Sidebar } from '../../components'

export const Notes = () => {
  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
                <NotesHeaderSec/>
                <Divider/>
                <NotesAddNewSec/>
                <Divider/>
                <NotesPinnedSec/>
                <Divider/>
                <NotesAllNoteSec/>
            </BodyWrapper>
        </Flex>
    </>
  )
}
