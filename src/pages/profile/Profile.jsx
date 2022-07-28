import { Container, Flex, Heading, Text, Divider, Button, TableContainer, Tbody, Td, Tr, Th, Thead, Table, Badge, useColorMode, Spacer, ButtonGroup, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BodyWrapper, Sidebar } from '../../components'
import { useAuth, useNotes, usePomo } from '../../context'
import DatePicker from 'react-date-picker'
import { getPerDayPomoData } from '../../backend/controllers/PomodoroControllers'
import useActiveUser from '../../hooks/useActiveUser'
import { updateUser } from '../../backend/controllers/UserControllers'

export const Profile = () => {

    const {user} = useAuth()
    const { accountDetails } = useActiveUser(user?.uid)
    const { allPomodoroTask,todaysPomodoroTasks, totalPomo } = usePomo()
    const { othersNote, archivedNotes, trashedNotes } = useNotes()
    const { colorMode } = useColorMode()
    const toast = useToast()
    const [dateValue, onChange] = useState(new Date())
    const [pomodoroTasks,setPomodoroTask] = useState(todaysPomodoroTasks)
    const [pomoDetails,setPomoDetails] = useState(totalPomo)
    const [showEditForm,setShowEditForm] = useState(false)
    const [loading,setLoading] = useState(false)
    const [formData,setFormData] = useState('')


    const completedTaskBgColor = colorMode === 'light' ? 'green.300'  : 'green.600'


    const nameChangeHandler = () => {
      const data = {
        name: formData
      }
      updateUser(user.uid, data,setLoading)
      toast({
        title: 'Name Updated Successfully',
        status: 'success',
        isClosable: true,
        position: 'bottom-left',
        duration: 3000
      })
      setShowEditForm(false)
    }

    useEffect(() => {
      setPomodoroTask(allPomodoroTask.filter(item => item.date === dateValue.toDateString()))
    }, [allPomodoroTask,dateValue])

    useEffect(() => {
      getPerDayPomoData(user,dateValue.toDateString(),setPomoDetails)
    },[dateValue,user])





  return (
    <Flex as='section'>
        <Sidebar/>
        <BodyWrapper> 
            <Container maxW="container.lg" p='0' mb='4'>
                <Heading as='h3' size='xl'>Profile</Heading>
                <Text>Hi Mainak! Here Is Your Proile Details.</Text>
            </Container>  
            <Divider/>  
            {!showEditForm 
            ? (
              <Container maxW='container.lg' p='2' my='8'>
                  <Heading as='h4' size='md' mb='4'>User Details:-</Heading>
                  <Flex gap='4' mb='2'>
                    <Text>Name: </Text>
                    <Text>{accountDetails?.name}</Text>
                  </Flex>
                  <Flex gap='4' mb='4'>
                    <Text>Email: </Text>
                    <Text>{accountDetails?.email}</Text>
                  </Flex>
                  <Button colorScheme='blue' onClick={() => setShowEditForm(true)}>Edit Details</Button>
              </Container>
            ) : (
              <Container maxW='container.lg' p='2' my='8'>
                  <Input type='text' placeholder='Add New Name' value={formData} onChange={(e) => setFormData(e.target.value)} />
                  <ButtonGroup marginTop='4'>
                    <Button colorScheme='blue' disabled={!formData || loading} onClick={nameChangeHandler}>Save</Button>
                    <Button colorScheme='red' onClick={() => setShowEditForm(false)}>Cancel</Button>
                  </ButtonGroup>
              </Container>
            )
          }

            <Divider/>

            <Container maxW='container.lg' p='2' my='8'>
              <Flex alignItems='center' mb='4'>
                <Heading as='h4' size='md' mb='4'>Pomodoro Details:-</Heading>
                <Spacer/>
                <DatePicker width='330px' onChange={onChange} value={dateValue}/>
              </Flex>
              <Flex justifyContent='space-between' mb='4' flexDirection={{base:'column', lg:'row'}}>
                <Text>Date:{dateValue.toLocaleDateString()} </Text>
                <Text>Total Pomodoro: { `25mins: ${pomoDetails?.short ?? 0}, 35mins: ${pomoDetails?.long ?? 0}`} </Text>
                <Text>Total Pomodoro Tasks: {pomodoroTasks?.length} </Text>
              </Flex>
              {pomodoroTasks?.length > 0 
                && (
                  <TableContainer>
                    <Table size='lg'>
                      <Thead>
                          <Tr>
                              <Th>Sl No</Th>
                              <Th>Task Name</Th>
                              <Th>Pomodoro Used</Th>
                              <Th>Status</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                        {pomodoroTasks?.map((task,idx) => {
                          return(
                            <Tr key={task.id} bg={task?.completed && completedTaskBgColor}>
                                <Td>{idx+1}</Td>
                                <Td>
                                   {task.name}<Badge ml='2' fontSize='0.5em'>{task.taskType}</Badge>
                                </Td>
                                <Td>
                                    <Table size='sm'>
                                        <Thead>
                                            <Tr>
                                                <Th>25m</Th>
                                                <Th>35m</Th>
                                            </Tr>
                                        </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>{task?.usedPomodoroNo.short}</Td>
                                            <Td>{task?.usedPomodoroNo.medium}</Td>
                                        </Tr>
                                    </Tbody>
                                    </Table>
                                </Td>
                                <Td>
                                   <Text>
                                   {task?.isCompleted ? 'Complete' : 'Not Complete'}
                                  </Text>
                                </Td>
                            </Tr>
                          )
                        })}
                      </Tbody>
                      </Table>
                  </TableContainer>
                )
              }
            </Container>

            <Divider/>

            <Container maxW='container.lg' p='2' my='8'>
              <Heading as='h4' size='md' mb='4'>Notes Details:-</Heading>
              <Flex gap='4' mb='2'>
                  <Text>Active Notes: </Text>
                  <Text>{othersNote?.length}</Text>
                </Flex>
                <Flex gap='4' mb='2'>
                  <Text>Archived Notes: </Text>
                  <Text>{archivedNotes?.length}</Text>
                </Flex>
                <Flex gap='4' mb='4'>
                  <Text>Trashed Notes: </Text>
                  <Text>{trashedNotes?.length}</Text>
                </Flex>
            </Container>
        </BodyWrapper>
    </Flex>
  )
}


