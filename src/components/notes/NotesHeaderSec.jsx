import { Container, Flex, Heading, HStack, IconButton, Input, Spacer, useToast } from '@chakra-ui/react'
import React, {  useCallback, useMemo } from 'react'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs'
import { FaTrash, FaTrashAlt, FaTrashRestore } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteNoteData, updateNoteData } from '../../backend/controllers/NotesControllers'
import { useAuth, useNotes } from '../../context'

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

export const NotesHeaderSec = () => {

  const navigate = useNavigate();
  const { currentFolder, setUserSearchTerm, selectState, selectedNotes, setSelectedNotes, onTrashPage, onArchivePage } = useNotes()
  const { user } = useAuth()
  const toast = useToast()


  // Set the search functionality

  const handleInputChange = useCallback((e) => {
    setUserSearchTerm(e.target.value)
  },[setUserSearchTerm])

  const debouncedInputChange = useMemo(() => debounce(handleInputChange,300), [handleInputChange])


  // Handle all actions

  //  Toast Handler Function 
    const showToast = (title) => {
        toast({
            title: title,
            status: 'success',
            isClosable: true,
            position: 'bottom-left',
            duration: 3000
        })
    }


  const handleArchiveAction = () => {
    selectedNotes.forEach(item => {
        const data = {
          isArchived: !item.isArchived,
          isSelected: false
      }
      updateNoteData(user,item.id,data)
    })

    if(onArchivePage){
      showToast('Notes Unarchived')
    }else{
      showToast('Notes Archived')
    }
  
    setSelectedNotes([])
  }



  const handleTrashAction = () => {
      selectedNotes.forEach(item => {
        const data = {
          isTrashed: !item.isTrashed,
          isSelected: false
      }
      updateNoteData(user,item.id,data)
    })
    if(onTrashPage){
      showToast('Notes Restored')
    }else{
      showToast('Notes Added To Trash')
    }
    setSelectedNotes([])
  }


  const handleDelete = () => {
    selectedNotes.forEach(item => 
      deleteNoteData(user,item.id)
    )
    setSelectedNotes([])
    showToast('Notes Deleted Successfully')
  }

 
  return (
    <>
      <Container maxW="container.lg" p='0' mb='8'>
        {!selectState && <Flex flexDirection={{base:'column' , md:'row'}} gap={{base:'2', md:'0'}}>
          {currentFolder 
          ? <HStack>
              <IconButton icon={<BsArrowLeft/>} size='sm' onClick={() => navigate(-1,{replace:true})}/>
              <Heading as='h3' size='xl'>{currentFolder.name}</Heading>
            </HStack>
          : <Heading as='h3' size='xl'>Notes</Heading>
          }
          <Spacer/>
          <HStack w={{base: '100%', md:'40%'}}>
            <Input type='text' placeholder='Search' onChange={debouncedInputChange}/>
          </HStack>
        </Flex>
        }

        {selectState && <Flex alignItems='center'>
          <Heading as='h4' size='lg'>{selectedNotes.length} Selected</Heading>
          <Spacer/>
          <Flex alignItems='center' gap='2' mb='2'>
            {/* {!onTrashPage && <IconButton size='sm' icon={<BsFolderSymlinkFill/>}/>} */}
            {!onTrashPage && <IconButton size='sm' icon={onArchivePage ? <BiArchiveOut/> : <BiArchiveIn/>} onClick={handleArchiveAction}/>}
            {onTrashPage && <IconButton size='sm' icon={<FaTrash/>} onClick={handleDelete}/>}
            <IconButton size='sm' icon={onTrashPage ? <FaTrashRestore/> : <FaTrashAlt/>} onClick={handleTrashAction}/>
          </Flex>
        </Flex>}
      </Container>
    </>
  )
}


