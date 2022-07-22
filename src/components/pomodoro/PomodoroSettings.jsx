import { Button, ButtonGroup, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePomo } from '../../context'

export const PomodoroSettings = ({ hanleSettingVisibility }) => {
    const [formData, setFormData] = useState({
        focus: 1,
        shortBreak: 5
    })

    const { setTimerType } = usePomo()

    const handleFormSubmit = () => {
        setTimerType(prevData => ({ ...prevData, focus: formData.focus, shortBreak: formData.shortBreak }))
        hanleSettingVisibility()
    }   

    console.log(formData)

  return (
    <>
        <VStack w='50%'>
            <FormControl isRequired>
                <FormLabel>
                Pomodoro Time
                </FormLabel>
                    <Select value={formData.focus} onChange={(e) => setFormData(prevData => ({...prevData, focus:e.target.value}))}>
                    <option value={25}>25 mins</option>
                    <option value={35}>35 mins</option>
                    </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>
                Short Break Time
                </FormLabel>
                    <Select value={formData.shortBreak} onChange={(e) => setFormData(prevData => ({...prevData, shortBreak:e.target.value}))}>
                    <option value={5}>5 mins</option>
                    <option value={10}>10 mins</option>
                    </Select>
            </FormControl>
            <ButtonGroup mt='4'>
                <Button colorScheme='blue' mr={3} onClick={handleFormSubmit} size='lg'>
                    Save
                </Button>
                <Button onClick={hanleSettingVisibility} size='lg'>Close</Button>
            </ButtonGroup>
        </VStack>
    </>
  )
}

