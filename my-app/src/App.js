import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import {UploadFile} from './Components/UploadFile';
import {Header} from './Components/Header';
import Axios from "axios";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

function App() {
  return (
    
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}   templateAreas={`"header"
    "main"
    "footer"`}
    h='200px'
    gap='1'
    fontWeight='bold'>
      <GridItem pl='2' area={'header'}>
      <Header />
      <ColorModeSwitcher justifySelf="flex-end" />
      </GridItem>
      <GridItem pl='2' area={'main'}>
      <VStack spacing={8}>
      <UploadFile />
      </VStack>
      </GridItem>
      <GridItem pl='2' area={'footer'}>
      
      </GridItem>
    </Grid>
    </Box>
    </ChakraProvider>
    );
  }
  
  export default App;
  