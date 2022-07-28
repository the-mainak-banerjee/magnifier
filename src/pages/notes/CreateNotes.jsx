import { Box } from '@chakra-ui/react'
import React from 'react'
import { NotesEditor } from '../../components/notes/NotesEditor'


export const CreateNotes = () => {

  return (
    <>
      <Box as='section' px={[5,10,16]} py='6.5rem'  >
        <NotesEditor/>
      </Box>
    </>
  )
}


