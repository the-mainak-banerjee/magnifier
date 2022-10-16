import { Container, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useNotes } from '../../context'
import { FolderItem } from './FolderItem'
import { AiOutlineFolderOpen } from 'react-icons/ai'

export const FolderContainer = () => {
    const { allFolders } = useNotes()
    const {colorMode} = useColorMode()


  return (
    <Container maxW="container.lg" p='0'>
        {allFolders.length>0 
        ? (
          <Flex flexWrap='wrap'>
              {allFolders.map(folder => {
                  return (
                    <FolderItem
                          key={folder.id}
                          folder={folder}
                    />
                  )
              })}
          </Flex>
        ) : (
          <Flex flexDirection='column' h='50vh' alignItems='center' justifyContent='center'>
              <Icon as={AiOutlineFolderOpen} w='20' h='20' color={colorMode === 'light' ? 'gray.200' : 'gray.700'}/>
              <Text color='gray.500' fontSize='lg'>Your folders will apppear here</Text>
          </Flex>
        )
        }
    </Container>
  )
}
