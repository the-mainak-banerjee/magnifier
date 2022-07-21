import { Button, ButtonGroup, Center, Circle, Container, Flex, Heading, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { AiFillPauseCircle } from 'react-icons/ai'
import { FaUndo } from 'react-icons/fa'
import { usePomo } from '../../context'

export const PomodoroContainer = () => {
    const { colorMode } = useColorMode()
    const { focus,startFocus,shortBreak,startShortBreak, longBreak, startLongBreak, pause,setPause,reset,setReset, pomoSec, pomoMin, pomodoroTask,setPomodoroTask, totalPomo, dispatch: pomoDispatch } = usePomo()


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
    }

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
            {focus && <Center w={{base:'100%', lg:'45%'}} py='2' backdropFilter='invert(10%)' border='2px' borderRadius='xl' borderColor={colorMode === 'light' ? 'blue.300'  : 'blue.600'}>
                {pomodoroTask?.name 
                ? <VStack>
                    <Text textAlign='center' fontSize='lg'>Focusing On {pomodoroTask?.name}</Text>
                    <Button onClick={handleComplete} size='sm'>Mark As Complete</Button>
                </VStack>
                : <Text> Add A Task</Text>
                }
            </Center>}
            {!focus && <Center  w={{base:'60%', lg:'45%'}} border='2px' borderRadius='xl' borderColor='gray' py='1'>
                    <Text>Let's Have A Break.</Text>
            </Center>}
            
            <Circle bg={colorMode === 'light' ? 'blue.300'  : 'blue.600'} h='30vh' w='30vh'>
                <Heading as='h3' size={{base:'2xl', md:'3xl'}}>
                    {`${pomoMin} : ${pomoSec}`}
                </Heading>
            </Circle>

            {reset && <Button 
                borderRadius='3xl' 
                colorScheme='blue' 
                fontSize='xl' leftIcon={<BsFillCaretRightFill/>}
                onClick={handleStart}>
                    {focus ? 'Start To Focus' : 'Start Break'}
            </Button> }
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

            <Heading as='h3' size='lg'>{totalPomo} {totalPomo > 1 ? 'Pomodoros' :'Pomodoro'} Till Now</Heading>
        </VStack>
      </Container>
    </>
  )
}

