import { Button, ButtonGroup, Center, Circle, Container, Flex, Heading, IconButton, Text, useColorMode,  VStack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { BsFillCaretRightFill, BsFillGearFill } from 'react-icons/bs'
import { AiFillPauseCircle } from 'react-icons/ai'
import { FaUndo } from 'react-icons/fa'
import { useKis, usePomo } from '../../context'
import { PomodoroSettings } from './PomodoroSettings'

export const PomodoroContainer = ({ pomoContainerRef,addTaskRef }) => { 
    const [showSettings,setShowSetings] = useState(false)
    const { colorMode } = useColorMode()
    const { focus,startFocus,shortBreak,startShortBreak, longBreak, startLongBreak, pause,setPause,reset,setReset, pomoSec, pomoMin, pomodoroTask,setPomodoroTask, totalPomo, dispatch: pomoDispatch } = usePomo()
    const {dispatch : kisDispatch} = useKis()


    const handleReset = () => {
        setReset(true)
        setPause(false)
    }

    const handleStart = () => {
        setReset(prevState => !prevState)
    }

    const handlePause = () => {
        setPause(prevState => !prevState)
    }

    const handleComplete = () => {
        pomoDispatch({ type: 'COMPLETE', payload: pomodoroTask?.id})
        setPomodoroTask(null)

        if(pomodoroTask.taskType === 'KIS'){
            kisDispatch({ type: 'COMPLETE' , payload: pomodoroTask?.id}) 
        }

        handleReset()
    }

    const hanleSettingVisibility = useCallback(() => {
        setShowSetings(prevData => !prevData)
    },[])


  return (
    <>
      <Container maxW="container.lg" py={{base:'2', md:'5'}} px='0' mt='4'>
        <VStack w='full' p={{base:'3', md:'10'}} spacing='5'  border='2px' borderRadius='xl' borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'} boxShadow='md' >
            <Flex>
                <ButtonGroup>
                    <Button colorScheme={focus ? 'green' : 'gray' } onClick={startFocus}>
                        Focus
                    </Button>
                    <Button colorScheme={shortBreak ? 'green' : 'gray' } onClick={startShortBreak}>
                        Short Break
                    </Button>
                    <Button colorScheme={longBreak ? 'green' : 'gray' } onClick={startLongBreak}>
                        Long Break
                    </Button>
                </ButtonGroup>
            </Flex>
            {focus && <Center w={{base:'100%', lg:'40%'}} py='2' backdropFilter='invert(10%)' border='2px' borderRadius='xl' borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'} ref={pomoContainerRef}>
                {pomodoroTask?.name 
                ? <VStack>
                    <Text textAlign='center' fontSize='lg'>Focusing On:- "{pomodoroTask?.name}"</Text>
                    <Button onClick={handleComplete} size='sm'>Mark As Complete</Button>
                </VStack>
                : <Text cursor='pointer' onClick={() => addTaskRef.current.scrollIntoView()}>Let's Add A Task</Text>
                }
            </Center>}
            {!focus && <Center  w={{base:'60%', lg:'45%'}} border='2px' borderRadius='xl' borderColor='gray' py='1'>
                    <Text>Let's Have A Break.</Text>
            </Center>}
            
            {showSettings 
            ? <PomodoroSettings hanleSettingVisibility={hanleSettingVisibility}/>
            : <Circle bg={colorMode === 'light' ? 'blue.300'  : 'blue.600'}  h='45vh' w='45vh' boxShadow='xl'>
                <Heading as='h3' size={{base:'2xl', md:'3xl'}}>
                    {`${pomoMin} : ${pomoSec}`}
                </Heading>
            </Circle>}

            {reset && <Flex gap='3'>
                <Button 
                    borderRadius='3xl' 
                    colorScheme='blue' 
                    fontSize='xl' leftIcon={<BsFillCaretRightFill/>}
                    onClick={handleStart}
                    disabled={showSettings}>
                        {focus ? 'Start To Focus' : 'Start Break'}
                </Button>
                <IconButton disabled={showSettings} onClick={hanleSettingVisibility} colorScheme='green' variant='outline' borderRadius='3xl' icon={<BsFillGearFill/>}/>
            </Flex>
            }
            {!reset && <ButtonGroup>
                <Button 
                    borderRadius='3xl' 
                    colorScheme='blue' 
                    fontSize='xl' leftIcon={pause ? <BsFillCaretRightFill/> : <AiFillPauseCircle/>}
                    onClick={handlePause}>
                        {pause ? 'Resume' : 'Pause'}
                </Button>
                <Button 
                    borderRadius='3xl' 
                    colorScheme='blue' 
                    fontSize='xl' leftIcon={<FaUndo/>}
                    onClick={handleReset}>
                        Reset
                </Button>
            </ButtonGroup>}
            <Text fontSize='xl'>Total Pomodoros:- { `25mins: ${totalPomo.short}, 35mins: ${totalPomo.medium}`}</Text>
        </VStack>
      </Container>
    </>
  )
}
