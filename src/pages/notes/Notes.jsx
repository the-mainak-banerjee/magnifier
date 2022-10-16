import { Container, Divider, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { BodyWrapper, NotesAddNewSec, NotesContainer, NotesHeaderSec, NotesPinnedSec, Sidebar } from '../../components'
import { useNotes } from '../../context'

const Notes = () => {

    const { othersNote, pinnedNotes, unPinnedNotes, userSearchTerm } = useNotes()
    const { colorMode } = useColorMode()

  return (
    <>
        <Flex as='section'>
            <Sidebar/>
            <BodyWrapper>
                <NotesHeaderSec/>
                <Divider/>
                <NotesAddNewSec/>
                <Container maxW="container.lg" px='2' py='2'>
                  {userSearchTerm
                    ?  <Text fontSize='2xl' fontWeight='medium'>Total {othersNote?.length} {othersNote?.length > 1 ? 'notes' : 'note'} found</Text>
                    : <Text fontSize='2xl' fontWeight='medium'>Total Notes: {othersNote?.length}</Text>
                  }
                </Container>
                {pinnedNotes.length>0 && <NotesPinnedSec/>}
                {(pinnedNotes?.length > 0 && unPinnedNotes?.length > 0)  && <Text fontSize='md' fontWeight='semiBold' ml={{base: '6', lg:'36'}}>OTHERS</Text>}
                {othersNote?.length > 0
                ? <NotesContainer notes={unPinnedNotes}/>
                : <Flex flexDirection='column' h='50vh' alignItems='center' justifyContent='center'>
                    <Icon as={BsPencilSquare} w='20' h='20' color={colorMode === 'light' ? 'gray.200' : 'gray.700'}/>
                    <Text color='gray.500' fontSize='lg'>Your notes will apppear here</Text>
                  </Flex>
                }
            </BodyWrapper>
        </Flex>
    </>
  )
}

export default Notes
