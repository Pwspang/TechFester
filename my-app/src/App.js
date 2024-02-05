import React from 'react';
import { useState, useEffect } from "react";
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
import { FunctionTable } from './Components/displayFunction';


Axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

function App() {
  const [filename, setFileName] = useState(null);
  const [data, setData] = useState({});


  useEffect(() => {
    console.log(filename);
    console.log(data);
  }, [filename]);

  const deleteFilename = () => {
    setFileName(null);
  }
  

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
        <div style={{"display":"flex", "flexDirection":"row", "justifyContent": "center"}}>
        <Header />
      <ColorModeSwitcher justifySelf="flex-end" />
        </div>
      </GridItem>
      <GridItem pl='2' area={'main'}>
      {filename == null? <UploadFile setName={setFileName} setInfo={setData} /> : 
      <FunctionTable data={data} fileName={filename} deleteFilename={deleteFilename} />}
      </GridItem>
      <GridItem pl='2' area={'footer'}>
      
      </GridItem>
    </Grid>
    </Box>
    </ChakraProvider>
    );
  }
  
  export default App;
  