import { Button, Flex, FormControl, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, Center, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import { useKis } from '../../context/kis-context'
import { TaskItem } from './TaskItem'
import { useAuth } from '../../context'
import { addData } from '../../backend/controllers/TaskControllers'



export const AddTaskModal = ({ isOpen, onClose, dateValue, onChange }) => {
    const initialRef = React.useRef(null)
    const [formData, setFormData] = useState('')
    const { kisOfTheDay,dispatch } = useKis()

    const [loading,setLoading] = useState(false)
    const { user } = useAuth()

    const handleInputChange = (e) => {
        setFormData(e.target.value)
     }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'ADD' , payload: formData})

        // setLoading(true)
        // try{
        //   await setDoc(doc(db,'users',`${user.uid}`,'KISTask',`${uuid()}`), {
        //     name: formData,
        //     taskType: 'KIS',
        //     completed: false,
        // })
        //   setLoading(false)
        //   setFormData('')
        // }catch(error){
        //   console.log(error)
        //   setLoading(false)
        // }

        const data = {
          name: formData,
          taskType: 'KIS',
          completed: false,
        }

        addData(setLoading,user,'KISTask',data)
        setFormData('')
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
          <ModalHeader textAlign='center'>Add Your KIS</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {kisOfTheDay?.length<5 
            ? <FormControl isRequired>
              <Flex direction='column'>
                <DatePicker onChange={onChange} value={dateValue}/>
                <Textarea ref={initialRef} placeholder='Read Book' onChange={handleInputChange} value={formData} mt='4' />
                <Button colorScheme='green' mt='2' onClick={handleFormSubmit} disabled={!formData || !dateValue} isLoading={loading} loadingText='Adding Task...'>Add Task</Button>
              </Flex>
            </FormControl>
            :   <Center>
                    <Text w='80%' fontSize='lg' textAlign='center'>You Have Added Maximum Tasks For The Day. Now Let's Start Working.🎯</Text>
                </Center> 
            }
            <VStack pt='8'>
            {kisOfTheDay?.map((task,idx) => {
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
