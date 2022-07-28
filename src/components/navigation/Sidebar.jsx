import { Flex } from '@chakra-ui/react'
import React from 'react'
import NavItems from './NavItems'


export const Sidebar = () => {
  return (
    <>
        {/* <Show breakpoint='(min-width: 761px)'> */}
            <Flex
                position='fixed'
                top='20'
                w='300px'
                // h='full'
                // bg='gray.50'
                px='16'
                py='5'
                display={{base: 'none', lg:'flex'}}
            >
                <NavItems/>
            </Flex>
        {/* </Show> */}
    </>
  )
}


