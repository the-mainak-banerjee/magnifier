import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Link, Spacer, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsList, BsFillMoonFill, BsSun, BsFillQuestionCircleFill } from 'react-icons/bs'
import { useDisclosure } from '@chakra-ui/react'
import NavItems from './NavItems'
import { Link as ReachLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { useAuth } from '../../context'


export const Navbar = () => {
    
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode} = useColorMode()
    const {userTocken} = useAuth()

  return (
    <Box as='section' px={[5,10,16]} py={[5,10,6]} position='fixed' bg={colorMode=== 'light' ? 'gray.50' : 'gray.700'} w='full' zIndex='sticky'>
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
        <Flex alignItems='center' justifyContent='center' gap='2'>
          <IconButton 
              aria-label='Change To Dark Mode'
              variant='unstyle'
              size='xl'
              icon={colorMode === 'light' ? <BsFillMoonFill/> : <BsSun/>}
              onClick={toggleColorMode}
              pr='4'
          />
          {userTocken && <Link as={ReachLink} to='/profile'>
            <IconButton 
                aria-label='Show User Profile'
                variant='unstyle'
                size='xl'
                icon={<FaUserAlt/>}
                marginBottom='1'
                pr='4'
            />
          </Link>}
          <Link href='https://github.com/the-mainak-banerjee/magnifier/blob/main/README.md' target='_blank'>
            <IconButton 
                aria-label='Read The Docs'
                variant='unstyle'
                size='xl'
                icon={<BsFillQuestionCircleFill/>}
                marginBottom='1'
            />
          </Link>
        </Flex>
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


