import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNotes } from '../../context'
import { FolderItem } from './FolderItem'

export const FolderContainer = () => {
    const { allFolders } = useNotes()


  return (
    <Container maxW="container.lg" p='0'>
        <Flex flexWrap='wrap'>
            {allFolders?.map(folder => {
                return (
                   <FolderItem
                        key={folder.id}
                        folder={folder}
                   />
                )
            })}
        </Flex>
    </Container>
  )
}
