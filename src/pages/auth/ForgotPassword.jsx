import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, Link, Stack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { Link as ReachLink } from 'react-router-dom'
import { useAuth } from '../../context'
const CMdEmail = chakra(MdEmail)

const ForgotPassword = () => {

    const [email,setEmail] = useState('')

    const { forgotPassword, loading } = useAuth()
    const { colorMode } = useColorMode()
    const blueColor = colorMode === 'light' ? 'blue.600'  : 'blue.500'

    const isValidEmail =email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? true
      : false;

    const handleForgotPassword = (e) => {
        e.preventDefault()
        forgotPassword(email)
    }

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg={blueColor} />
        <Heading color={blueColor}>Forgot Your Password</Heading>
        <Text fontSize='lg' textAlign='center' px='4'>We will send you an Email with password reset link.</Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={colorMode === 'light' ? "whiteAlpha.900" : "gray.700"}
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CMdEmail color="gray.300" />}
                  />
                  <Input 
                  type="email" 
                  placeholder="email address" 
                  isInvalid={!isValidEmail && email}
                  errorBorderColor='red.300'
                  onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
                <FormHelperText>
                  {email && !isValidEmail && <Text color='red.500'>Email is invalid</Text>}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                disabled={!isValidEmail}
                isLoading={loading}
                onClick={handleForgotPassword}
              >
                Send Email
              </Button>
              <Text textAlign='center'>Please check your SPAM folder</Text>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Back to{" "}
        <Link as={ReachLink} to='/login' color={blueColor} href="#" fontWeight='bold'>
          Login
        </Link>
      </Box>
    </Flex>
  )
}

export default ForgotPassword
