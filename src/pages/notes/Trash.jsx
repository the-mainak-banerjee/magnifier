import { Divider, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { BodyWrapper, NotesContainer, NotesHeaderSec, Sidebar } from '../../components'
import { useNotes } from '../../context'

export const Trash = () => {

    const { trashedNotes } = useNotes()
    const { colorMode } = useColorMode()

  return (
    <>
      <Flex>
            <Sidebar/>
            <BodyWrapper>
              <NotesHeaderSec notes={trashedNotes}/>
              <Divider/>
              {trashedNotes?.length>0 
              ? <NotesContainer notes={trashedNotes}/>
              : <Flex flexDirection='column' h='50vh' alignItems='center' justifyContent='center'>
                  <Icon as={FaTrashAlt} w='20' h='20' color={colorMode === 'light' ? 'gray.200' : 'gray.700'}/>
                  <Text color='gray.500' mt='2' fontSize='lg'>No notes in trash</Text>
            </Flex>}
            </BodyWrapper>
      </Flex>
    </>
  )
}

