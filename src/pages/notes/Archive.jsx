import { Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, NotesContainer, Sidebar } from '../../components'
import { useNotes } from '../../context'
import { BiArchiveIn } from 'react-icons/bi'


export const Archive = () => {

  const { archivedNotes } = useNotes()
  const { colorMode } = useColorMode()

  return (
    <>
      <Flex>
            <Sidebar/>
            <BodyWrapper>
              {archivedNotes?.length>0 
              ? <NotesContainer notes={archivedNotes}/>
              : <Flex flexDirection='column' h='50vh' alignItems='center' justifyContent='center'>
                <Icon as={BiArchiveIn} w='20' h='20' color={colorMode === 'light' ? 'gray.200' : 'gray.700'}/>
                <Text color='gray.500'>Your Archieved Notes Apppear Here</Text>
              </Flex>}
            </BodyWrapper>
      </Flex>
    </>
  )
}

