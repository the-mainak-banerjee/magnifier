import { Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsFillCaretRightFill, BsListCheck, BsTrophy, BsPencilSquare } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'
import { GiArcheryTarget } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { v4 as uuid} from 'uuid'



const NavItems = () => {
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
            page: 'Goals',
            path: 'goals',
            hasChild: false,
            icon: <GiArcheryTarget/>
        },
        {
            page: 'Journal',
            path: 'journal',
            hasChild: false,
            icon: <BsPencilSquare/>
        },
    ] 

    const {colorMode} = useColorMode()
    const activeLinkColor = colorMode === 'light' ? 'teal.500' : 'teal.300'
    
  return (
    <Flex
        direction='column'
        w='100%'
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
                        <MenuButton w='100%'>
                            <HStack>
                                <IconButton 
                                    size='xs' 
                                    icon={item.icon} 
                                    variant='outline'
                                    />
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
                                    <Icon as={BsFillCaretRightFill}/>
                                    <Text as='p'>{subItem.page}</Text>
                                </HStack>
                            </Link>
                        )
                    })}
                </Menu>
            )
        })} 
    </Flex>

  )
}

export default NavItems
