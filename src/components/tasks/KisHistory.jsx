import { Badge, Box, Button, Container, Flex, Spacer, Text, useColorMode, VStack } from "@chakra-ui/react"
import { useKis } from "../../context/kis-context"
// import { v4 as uuid} from 'uuid'

export const KisHistory = ({ handleKisHistoryDisplay }) => {

    const { colorMode } = useColorMode()
    const { kisHistory } = useKis()

    return(
        <Container maxW="container.lg" p='0' mt='4'>
            <Flex align='center' gap={{base:'2', md:'0'}} direction={{base:'column', md:'row'}}>
                <Box textAlign={{base:'center',md:'left'}}>        
                    <Text fontSize={{base:'xl', md:'2xl'}}>KIS History</Text>
                    {/* <Text fontSize='sm'>(This Will Be Deleted After 1 Month.)</Text> */}
                </Box>
                <Spacer/>
                <Button onClick={handleKisHistoryDisplay}>Hide KIS History</Button>
            </Flex>
            <Flex flexWrap='wrap' gap='4' mt='4' justify='center'>
                {kisHistory.map(item => {
                    return(
                        <Container key={item.id} maxW='container.md' p='0' >
                            <VStack p='8' borderRadius='lg' boxShadow='md' bg={colorMode=== 'light' ? 'gray.50' : 'gray.700'}>
                                <Text fontSize='lg' fontWeight='bold'>Date :{item?.date}</Text>
                                {item?.tasks?.map((task,idx) => {
                                    return(
                                        <Text key={task.id} fontSize='xl' fontWeight='medium'>{idx+1}. {task.name}<Badge ml='1' fontSize='0.5em' colorScheme={task?.completed ? 'green' : 'red'}>{task.completed ? 'Completed' : 'Not Completed'}</Badge></Text>
                                    )
                                })}
                            </VStack>                
                        </Container>
                    )
                })}
                {kisHistory?.length === 0 && <Text fontSize='xl' fontWeight='medium'>You Don't Have Any KIS History</Text>}
                
            </Flex>
        </Container>
    )
}