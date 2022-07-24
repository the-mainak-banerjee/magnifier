import { Container, Flex, Heading, HStack, IconButton, Input, Spacer } from '@chakra-ui/react'
import React, {  useCallback, useMemo } from 'react'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'
import { BsArrowLeft, BsFolderSymlinkFill } from 'react-icons/bs'
import { FaTrash, FaTrashAlt, FaTrashRestore } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotes } from '../../context'

// Custom debounce function
const debounce = function (func,delay) {
  let timer;
  return function () {
    let context = this
    let args = arguments

    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(context,args)
    },delay)
  }
}

export const NotesHeaderSec = ({ notes }) => {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const { setUserSearchTerm, selectState, notesDispatch, selectedNotes, setSelectedNotes, onTrashPage, onArchivePage } = useNotes()


  // Set the search functionality

  const handleInputChange = useCallback((e) => {
    setUserSearchTerm(e.target.value)
  },[setUserSearchTerm])

  const debouncedInputChange = useMemo(() => debounce(handleInputChange,300), [handleInputChange])


  // Handle all actions

  const handleArchiveAction = () => {
    selectedNotes.forEach(item => 
      notesDispatch({type: 'ARCHIVE', id: item})
    )
    setSelectedNotes([])
  }

  const handleDelete = () => {
    selectedNotes.forEach(item => 
      notesDispatch({type: 'DELETE', id: item})
    )
    setSelectedNotes([])
  }

  const handleTrashAction = () => {
    selectedNotes.forEach(item => 
      notesDispatch({type: 'TRASH', id: item})
    )
    setSelectedNotes([])
  }


 
  return (
    <>
      <Container maxW="container.lg" p='0' mb='4'>
        {!selectState && <Flex >
          <HStack>
            {searchParams.get('q') && <IconButton icon={<BsArrowLeft/>} size='sm' onClick={() => navigate('/notes/folder',{replace:true})}/>}
            <Heading as='h3' size='xl'>Notes</Heading>
          </HStack>
          <Spacer/>
          <HStack w='40%'>
            <Input type='text' placeholder='Search'  onChange={debouncedInputChange}/>
          </HStack>
        </Flex>}

        {selectState && <Flex alignItems='center'>
          <Heading as='h4' size='lg'>Selected</Heading>
          <Spacer/>
          <Flex alignItems='center' gap='2' mb='2'>
            {!onTrashPage && <IconButton size='sm' icon={<BsFolderSymlinkFill/>}/>}
            {!onTrashPage && <IconButton size='sm' icon={onArchivePage ? <BiArchiveOut/> : <BiArchiveIn/>} onClick={handleArchiveAction}/>}
            {onTrashPage && <IconButton size='sm' icon={<FaTrash/>} onClick={handleDelete}/>}
            <IconButton size='sm' icon={onTrashPage ? <FaTrashRestore/> : <FaTrashAlt/>} onClick={handleTrashAction}/>
          </Flex>
        </Flex>}
      </Container>
    </>
  )
}


