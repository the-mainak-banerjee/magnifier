import { Button, Flex, FormControl, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, Center, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import { useKis } from '../../context/kis-context'
import { TaskItem } from './TaskItem'



export const AddTaskModal = ({ isOpen, onClose, dateValue, onChange }) => {
    const initialRef = React.useRef(null)
    const [formData, setFormData] = useState('')
    const { state,dispatch } = useKis()

    const handleInputChange = (e) => {
        setFormData(e.target.value)
     }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: 'ADD', payload: formData})
        setFormData('')
    }

   
    // console.log(dateValue)
    // console.log(formData)

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
          <ModalHeader textAlign='center'>Add Your KIS</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {state?.length<5 
            ? <FormControl isRequired>
              <Flex direction='column'>
                <DatePicker onChange={onChange} value={dateValue}/>
                <Textarea ref={initialRef} placeholder='Read Book' onChange={handleInputChange} value={formData} mt='4' />
                <Button mt='2' onClick={handleFormSubmit} disabled={!formData || !dateValue}>Add Task</Button>
              </Flex>
            </FormControl>
            :   <Center>
                    <Text w='80%' fontSize='lg' textAlign='center'>You Have Added Maximum Tasks For The Day. Now Let's Start Working.🎯</Text>
                </Center> 
            }
            <VStack pt='8'>
            {state?.map((task,idx) => {
                return (
                    <TaskItem key={task.id} task={task} pencil={true} idx={idx}/>
                )
            })}
            </VStack>
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
