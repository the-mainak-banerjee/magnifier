import { Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { TaskItem } from './TaskItem'

export const TaskBox = ({title, tasks, fallBackText, bgColor}) => {

  return (
    <VStack w='full' h='full' p={{base:'3', md:'10'}} spacing='5'  border='2px' borderColor={bgColor} borderRadius='xl' boxShadow='md'>
      <Heading as='h4' size='lg' textAlign='center'>{title}</Heading>
      {tasks?.map((task,idx) => {
        return (
          <TaskItem key={task.id} task={task} check={true} idx={idx}/>
        )
      })}
      {tasks?.length === 0 && <Text w='80%' fontSize='lg' textAlign='center'>{fallBackText}</Text>}
    </VStack>

  )
}

