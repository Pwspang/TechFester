import React, { useState } from 'react';
import { Button, ButtonGroup, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';

export const UploadFile = ({setName, setInfo}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    
    const handleUpload = () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
    
          // Make a POST request to the server endpoint using Axios
          axios.post('/upload', formData)
            .then(response => {
              setName(response.data.filename);
              setInfo(response.data.data);
              // Handle the response as needed
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              // Handle errors
            });
        }
      };
    
    
    return (
        <div>
        <VStack spacing={3}>
        <Text fontSize='4xl'>Upload a JavaScript File to generate Testcases.</Text>
        <div style={{"display":"flex", "flexDirection":"row", "justifyContent": "center"}}>
        <input type="file" onChange={handleFileChange} />
        <Button colorScheme='facebook'  onClick={handleUpload}>Upload</Button>
        </div>
        </VStack>
        </div>
        );
    };
    