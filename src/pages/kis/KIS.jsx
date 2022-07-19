import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Sidebar } from '../../components'

export const KIS = () => {
  return (
    <>
        <Flex px={[5,10,16]}>
            <Sidebar/>
            <p> I Am P</p>
        </Flex>
    </>
  )
}


