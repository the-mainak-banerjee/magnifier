import { Box, Button, ButtonGroup, Container, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { createNewFolder, updateFolderData } from '../../backend/controllers/FolderControllers'
import { useAuth, useNotes } from '../../context'
import { v4 as uuid } from 'uuid'
import { updateNoteData } from '../../backend/controllers/NotesControllers'
import { useNavigate } from 'react-router-dom'

export const NewFolderModal = ({ isOpen, onClose, note }) => {
    const initialRef = useRef(null)
    const { colorMode } = useColorMode()
    const [ showForm, setShowForm ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [formData,setFormData] = useState('')
    const [selectedForm,setSelectedForm] = useState('')
    const { user } = useAuth()
    const { allFolders } = useNotes()
    const navigate = useNavigate()
    const toast = useToast()

  
    const getCurrentFolder = (id) => {
      return allFolders?.find(item => item.id === id)
    }

    
    // Toast Handler Function 
    const showToast = (title) => {
      toast({
          title: title,
          status: 'success',
          isClosable: true,
          position: 'bottom-left',
          duration: 3000
      })
    }

    const createFolder = () => {

        const data = {
          name: formData.name,
          notes: [note.id],
        }
    
        createNewFolder(setLoading,user,'NotesFolder',formData.id,data,navigate)
        updateNoteData(user,note.id,{folder: {name:formData.name,id:formData.id}})
        showToast('Folder Created Successfully')
        onClose()
    }


    const handleRemoveFromFolder = () => {
      const data = {
        notes: getCurrentFolder(note.folder?.id).notes?.filter(item => item!==note.id)
      }
      updateFolderData(user,note.folder?.id,data)
      updateNoteData(user,note.id,{folder: {name:'', id:''}})
      showToast('Note Removed From Folder')
      onClose()
    }


    const handleAddToOldFolder = () => {

      const folderData = {
        notes: [...getCurrentFolder(selectedForm).notes, note.id]
      }
      updateFolderData(user,selectedForm,folderData) 

      if(note.folder?.id){
        const data = {
          notes: getCurrentFolder(note.folder?.id).notes?.filter(item => item!==note.id)
        }
        updateFolderData(user,note.folder?.id,data)
      }

      const noteData = {
        folder:{
          name: getCurrentFolder(selectedForm)?.name,
          id: selectedForm
        }
      }
      updateNoteData(user,note.id,noteData)
      showToast('Added To Folder Successfully')
      onClose()
    }


  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size='xl'
        // motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Move To A Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <>
                {note.folder?.id
                ?  <Box as='section'>
                        <Flex direction='column' gap='4'>
                            <Button fontSize='lg' colorScheme='red' px='4' py='1' borderWidth='1px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' onClick={handleRemoveFromFolder}>
                              Remove From {note?.folder?.name}
                            </Button>

                            {allFolders?.length > 1 && <div>
                              <Text>Move To Another folder</Text>

                              <Select fontSize='lg' placeholder='Select A Folder' variant='filled' onChange={(e) => setSelectedForm(e.target.value)}>
                                  {allFolders.filter(data => data.id !== note.folder?.id).map(item => {
                                      return(
                                          <option key={item.id} value={item.id}>{item.name}</option>
                                      )
                                  })}
                              </Select>

                              <Button 
                                disabled={!selectedForm}
                                onClick={handleAddToOldFolder}
                                marginTop='6'
                                colorScheme='blue'>
                                Move
                              </Button>

                            </div>}
                        </Flex>
                    </Box>
                :   <Box as='section'>
                        {showForm 
                            ? <Container maxW="container.sm" px='4' py='2' my='10' borderWidth='1px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg' boxShadow={showForm ? 'xl' : ''}> 

                                <Flex direction='column' gap='4'>

                                    <Input placeholder='Folder Name' variant='flushed' onChange={(e) => setFormData({id: uuid(), name:e.target.value})} autoFocus/>

                                    <ButtonGroup alignSelf='flex-end'>

                                        <Button colorScheme='blue' isLoading={loading} loadingText='Creating...' onClick={createFolder} disabled={!formData}>Create Folder</Button>

                                        <Button onClick={() => setShowForm(false)}>Cancel</Button>

                                    </ButtonGroup>
                                </Flex>
                            </Container> 
                            : <Flex direction='column' gap='4'>

                                <Text fontSize='lg' cursor='pointer' onClick={() => setShowForm(true)} px='4' py='1' borderWidth='1px' borderColor={colorMode=== 'light' ? 'gray.300' : 'gray.700'} borderRadius='lg'>
                                  Create A Folder
                                </Text>

                                {allFolders?.length > 0 && <div>
                                  <Select placeholder='Select A Folder' onChange={(e) => setSelectedForm(e.target.value)} fontSize='lg' variant='filled'>
                                      {allFolders.map(item => {
                                          return(
                                              <option key={item.id} value={item.id}>{item.name}</option>
                                          )
                                      })}
                                  </Select>
                                  <Button  
                                    disabled={!selectedForm}
                                    onClick={handleAddToOldFolder}
                                    marginTop='6'
                                    colorScheme='blue'>
                                    Add
                                  </Button>
                                </div> 
                                }
                            </Flex>
                        }
                    </Box>
                }
                
            
            </>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3}>
              Save
            </Button> */}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

