import { Flex } from '@chakra-ui/react'
import React from 'react'
import NavItems from './NavItems'


export const Sidebar = () => {
  return (
    <>
        {/* <Show breakpoint='(min-width: 761px)'> */}
            <Flex
                pos='sticky'
                w='300px'
                h='100vh'
                // bg='gray.50'
                px='16'
                py='5'
                // borderRight='1px'
                display={['none', 'none', 'flex']}
            >
                <NavItems/>
            </Flex>
        {/* </Show> */}
    </>
  )
}


