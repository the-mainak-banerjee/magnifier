import { Button, Divider, Flex, HStack, Link, Menu, MenuButton,  Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsCardText, BsListCheck, BsPencilSquare } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'
import { BiArchiveIn } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { v4 as uuid} from 'uuid'
import { useAuth } from '../../context'

const navItems = [
    {
        page: 'KIS',
        path: 'kis',
        hasChild: false,
        icon: <BsListCheck/>
    },
    {
        page: 'Pomodoro',
        path: 'pomodoro',
        hasChild: false,
        icon: <RiTimerFlashLine/>
    },
    {
        page: 'Notes',
        path: 'notes',
        hasChild: true,
        icon: <BsPencilSquare/>,
        child:[
            {
                page: 'All Notes',
                path: 'notes',
                hasChild: false,
                icon: <BsCardText/>
            },
            {
                page: 'Folder',
                path: 'folder',
                hasChild: false,
                icon: <AiOutlineFolderOpen/>
            },
            {
                page: 'Archive',
                path: 'archive',
                hasChild: false,
                icon: <BiArchiveIn/>
            },
            {
                page: 'Trash',
                path: 'trash',
                hasChild: false,
                icon: <FaTrashAlt/>
            },
        ]
    },
] 


const NavItems = ({ onClick }) => {

    const {colorMode} = useColorMode()
    const activeLinkColor = colorMode === 'light' ? 'green.500' : 'green.300'
    const { logOut, userTocken } = useAuth()

    const handleLogOut = () => {
        logOut()
        onClick && onClick()
    }
    
  return (
    <Flex direction='column' justifyContent='space-between' gap='12' w='100%'>
        <Flex
            direction='column' 
        >
            {navItems.map(item => {
                return(
                    <Menu key={uuid()}>
                        <Link  
                            as={NavLink}
                            py={item.hasChild ? '1' : '2'} 
                            _activeLink={{color: activeLinkColor}} 
                            to={`/${item.path}`}
                            w='100%'
                            _hover={{textDecor: 'none'}}
                            
                        >
                            <MenuButton w='100%' onClick={onClick}>
                                <HStack>
                                    {item.icon}
                                    <Text as='p' fontSize='lg'>{item.page}</Text>
                                </HStack>
                            </MenuButton>
                        </Link>
                        {item.child && item.child?.map(subItem => {
                            return(
                                <Link 
                                    key={uuid()} 
                                    as={NavLink}
                                    pl='10'
                                    pb='1' 
                                    _activeLink={{color: activeLinkColor}} 
                                    to={subItem.path ? `/${item.path}/${subItem.path}` : ``}
                                    w='100%'
                                    _hover={{textDecor: 'none'}}
                                >
                                    <HStack onClick={onClick}>
                                        {subItem.icon}
                                        <Text as='p'>{subItem.page}</Text>
                                    </HStack>
                                </Link>
                            )
                        })}
                        <Divider/>
                    </Menu>
                )
            })} 
        </Flex>
        {/* <Spacer/> */}
        {userTocken && <Button colorScheme='red' onClick={handleLogOut}>Log Out</Button>}
    </Flex>

  )
}

export default NavItems
