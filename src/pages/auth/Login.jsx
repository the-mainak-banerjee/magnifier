import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  useColorMode,
  Text,
  FormHelperText,
  useToast
} from "@chakra-ui/react";
import { Link as ReachLink, useLocation } from "react-router-dom"
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../context";

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail)

export const Login = () => {

  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
      email: '',
      password: ''
  })
  const { logIn,loading } = useAuth()
  const { colorMode } = useColorMode()
  const  toast = useToast()
  const blueColor = colorMode === 'light' ? 'blue.600'  : 'blue.500'

  const isValidEmail =formData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = formData.password.length > 6


  const handleLogin = (e) => {
      e.preventDefault()
      logIn(formData.email, formData.password)
  }

  const handleGuestLogin = () => {
    setFormData({
      email: 'smartwork@gmail.com',
      password: 'Smart_1999'
    })
    logIn('smartwork@gmail.com','Smart_1999')
  }

  const handleShowClick = () => setShowPassword(!showPassword);


  useEffect(() => {
    if(location?.state !== null){
      toast({
        title: `Please Login Or SignUp To Access ${location.state?.from?.pathname?.slice(1).toUpperCase()} Feature`
      })
    }

    // eslint-disable-next-line
  },[location.state])


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
        <Heading color={blueColor}>Welcome</Heading>
        <Text fontSize='lg' textAlign='center' px='4'>Get back to your account and start focusing on your goal</Text>
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
                  value={formData.email}
                  isInvalid={!isValidEmail && formData.email}
                  errorBorderColor='red.300'
                  onChange={(e) => setFormData(prevState =>({...prevState, email:e.target.value}))}/>
                </InputGroup>
                <FormHelperText>
                  {formData.email && !isValidEmail && <Text color='red.500'>Email is invalid</Text>}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={formData.password}
                    isInvalid={!isValidPassword && formData.password }
                    errorBorderColor='red.300'
                    onChange={(e) => setFormData(prevState =>({...prevState, password:e.target.value}))}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  {formData.password && !isValidPassword && <Text color='red.500'>Password should be more than 6 character</Text>}
                </FormHelperText>
              </FormControl>
              <Text onClick={handleGuestLogin} cursor='pointer' textAlign='right' color={blueColor} fontSize='lg'>Use guest login</Text>
              <Button
                variant="solid"
                colorScheme="blue"
                width="full"
                disabled={!isValidPassword || !isValidEmail}
                isLoading={loading}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link as={ReachLink} to='/' color={blueColor} href="#">
          Sign Up
        </Link>
      </Box>
      <Box>
        Forgot your password?{" "}
        <Link as={ReachLink} to='/forgotPassword' color={blueColor} href="#">
          Reset it here
        </Link>
      </Box>
    </Flex>
  );
};



