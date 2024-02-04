const fs = require('fs');
const acorn = require('acorn');

// Read the JavaScript file
const fileName = 'filetoupload.js'; // Replace with your file name
const code = fs.readFileSync(fileName, 'utf-8');

// Parse the code using Acorn
const ast = acorn.parse(code, { ecmaVersion: 2021, sourceType: 'module' });

// Function information array
const functions = [];

// Recursive function to traverse the AST and extract functions
function traverse(node) {
  if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
    const functionName = node.id ? node.id.name : 'anonymous';
    const args = node.params.map(param => param.name);
    functions.push({ name: functionName, arguments: args });
  }

  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      traverse(node[key]);
    }
  }
}

traverse(ast);

// Print the extracted functions and their arguments
functions.forEach(func => {
  console.log(`Function: ${func.name}`);
  console.log(`Arguments: ${func.arguments.join(', ')}`);
  console.log('--------------------------');
});
