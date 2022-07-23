import { Button, Divider, Flex, HStack, Icon, Link, Menu, MenuButton,  Spacer,  Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsChevronDoubleRight, BsListCheck, BsTrophy, BsPencilSquare } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'
// import { GiArcheryTarget } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { v4 as uuid} from 'uuid'



const NavItems = ({ onClick }) => {
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
            page: '21 Days Challenge',
            path: '21days',
            hasChild: true,
            icon: <BsTrophy/>,
            child:[
                {
                    page: 'Challenge',
                    path: 'challnge',
                    hasChild: false,
                },
                {
                    page: 'History',
                    path: 'history',
                    hasChild: false,
                },
                {
                    page: 'Leaderboard',
                    path: 'leaderboard',
                    hasChild: false,
                },
            ]
        },
        {
            page: 'Notes',
            path: 'notes',
            hasChild: false,
            icon: <BsPencilSquare/>
        },
    ] 

    const {colorMode} = useColorMode()
    const activeLinkColor = colorMode === 'light' ? 'green.500' : 'green.300'
    
  return (
    <Flex direction='column' justifyContent='space-between' gap='32' w='100%'>
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
                                    to={`${item.path}/${subItem.path}`}
                                    w='100%'
                                    _hover={{textDecor: 'none'}}
                                >
                                    <HStack>
                                        <Icon as={BsChevronDoubleRight}/>
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
        <Spacer/>
        <Button colorScheme='red'>Log Out</Button>
    </Flex>

  )
}

export default NavItems
