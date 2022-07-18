import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Show, Spacer, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsList, BsFillMoonFill, BsSun } from 'react-icons/bs'
import { useDisclosure } from '@chakra-ui/react'
import NavItems from './NavItems'


export const Navbar = () => {
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode} = useColorMode()

  return (
    <Box as='section' px={[5,10,16]} py={[5,10,6]} bg={colorMode=== 'light' ? 'gray.50' : 'gray.700'}>
      <Flex 
        align='center'
      >
        <Show breakpoint='(max-width: 760px)'>
            <IconButton 
                aria-label='Show NavBar'
                icon={<BsList/>}
                mr='2'
                onClick={onOpen}
                ref={btnRef}
            />
        </Show>
        <Heading as='h3'>Magnifier</Heading>
        <Spacer/>
        <IconButton 
            aria-label='Change To Dark Mode'
            variant='unstyle'
            size='xl'
            icon={colorMode === 'light' ? <BsFillMoonFill/> : <BsSun/>}
            onClick={toggleColorMode}
        />
      </Flex>
      <Show breakpoint='(max-width: 760px)'>
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
            bg='gray.50'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                {/* <DrawerHeader>Create your account</DrawerHeader> */}

                <DrawerBody>
                    <Heading as='h3' my='4'>Magnifier</Heading>
                    <NavItems/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
      </Show>
    </Box>
  )
}


