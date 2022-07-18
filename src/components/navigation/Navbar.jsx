import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
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
       <IconButton 
                aria-label='Show NavBar'
                icon={<BsList/>}
                mr='1'
                pl='2'
                onClick={onOpen}
                ref={btnRef}
                display={{lg:'none'}}
                variant='unstyled'
        />
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
      {/* <Show breakpoint='(max-width: 760px)'> */}
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
            bg='gray.50'
            display={{sm: 'flex', lg:'none'}}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                {/* <DrawerHeader>Create your account</DrawerHeader> */}

                <DrawerBody>
                    <Heading as='h3' my='4'>Magnifier</Heading>
                    <NavItems onClick={onClose}/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
      {/* </Show> */}
    </Box>
  )
}


