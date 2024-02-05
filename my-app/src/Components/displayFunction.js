import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Code,
  } from '@chakra-ui/react' 
import axios from 'axios';
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export const FunctionTable = ({data, fileName, deleteFilename}) => {

    const [selectFunction, setSelectFunction] = useState(-1);
    const [functionDescription, setFunctionDescription] = useState({});
    const [variableDescription, setVariableDescription] = useState({});
    const [testCase, setTestCase] = useState([]);
    const [jestCode, setJestCode] = useState("");

    const testClick = () => {
        console.log(testCase);
    }

    const handleClick = () => {

        if (functionDescription != {} && variableDescription != {}){
            //axios post request 
            axios.post('/generateTestCase', {
                function : functionDescription, 
                variable : variableDescription
            })
            .then(function (response) {
                setTestCase(response.data.result.testcases);
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            alert("Fields are Empty");
        }


    }

    const handleUpdate = (vName, value) => {
        setVariableDescription({...variableDescription, [vName]: value});
    }

    const generateJestFile = () => {
        axios.post('/generateJestCode', {
            case : testCase,
            func : functionDescription,
        })
        .then(function (response) {
            setJestCode(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    // Choose which function to generate test case for. 
    return (
        <>
            <div style={{"display":"flex", "flex-direction":"row", "justifyContent": "center"}}>
            <Text>{fileName}</Text>
            <IconButton marginLeft="2" aria-label='Delete File' icon={<DeleteIcon color="red.500" size="md" onClick={() => deleteFilename()} />} />
            </div>
            <List spacing={3} style={{"padding": "20px"}}>
                {selectFunction == -1 && data.map((e, i) => 
                    <ListItem key={i}><Button color="Facebook" onClick={()=>setSelectFunction(i)}>{e.name}</Button></ListItem>
                )}
            </List>
            {selectFunction != -1 && testCase.length == 0 && <VariableTable handleClick={handleClick} data={data} selectFunction={selectFunction} handleUpdate={handleUpdate} setFunctionDescription={setFunctionDescription} />}
            {testCase.length != 0 && 
                <TestCaseTable testCases={testCase} generateJestFile={generateJestFile} />
            }
            <div>
            {jestCode != "" && 
                <pre>
                <Code style={{"textAlign": "left", "padding": "10px"}}>{jestCode.data}</Code>
                </pre>
            }
            </div>
        </>
    );
};

export const TestCaseTable = ({testCases, generateJestFile}) => {
    return (
        <>
            <TableContainer>
                <Table>
                <TableCaption>Test Cases Generated</TableCaption>
                    <Thead>
                        <Tr>
                        {testCases.length != 0 && Object.keys(testCases[0].input).map((e,i) => 
                            <Th>{e}</Th> )}
                        <Th>Output</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {testCases.length != 0 && testCases.map((e, i) => 
                            <Tr>
                                {Object.keys(testCases[0].input).map((ele,id) => 
                                    <Th>{testCases[i].input[ele]}</Th>
                                )}
                                <Th>{e.output}</Th>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button colorScheme='teal' onClick={generateJestFile}>Generate JEST Code</Button>
        </>
    );
};

export const VariableTable = ({data, selectFunction, setFunctionDescription, handleUpdate, handleClick}) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Variable Name / Function Name</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data[selectFunction].arguments.map((e,i) => <Variable key={i} variableName={e} handleUpdate={handleUpdate} />)}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>{data[selectFunction].name}</Th>
                            <Th><Input placeholder='Enter Function Description' onChange={(e) => setFunctionDescription({[data[selectFunction].name]: e.target.value})} /></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Button colorScheme='teal' onClick={() => handleClick()} >Generate Test Cases</Button>
        </>
    );
}

export const Variable = ({variableName, handleUpdate}) => {
    return (
        <>
        <Tr>
        <Th>{variableName}</Th>
        <Th><Input placeholder='Enter Variable Description' onChange={(e) => handleUpdate(variableName, e.target.value)}/></Th>
        </Tr>
        </>
    );
}

    