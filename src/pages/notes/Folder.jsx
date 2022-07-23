import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BodyWrapper, FolderContainer, Sidebar } from '../../components'

export const Folder = () => {
  return (
    <>
        <Flex>
            <Sidebar/>
            <BodyWrapper>
              <FolderContainer/>
            </BodyWrapper>
      </Flex>
    </>
  )
}

