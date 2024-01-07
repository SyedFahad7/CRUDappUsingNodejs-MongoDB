## *CRUD using Node.js & MongoDB* 

This repository houses a straightforward CRUD (Create, Read, Update, Delete) application leveraging MongoDB as its underlying database.


## Directory Structure

- controllers: 
  - Handles incoming requests from the client, communicating with models to retrieve and update data.
  
- models: 
  - Houses MongoDB schema and models for the application.
  
- routes: 
  - Manages routes, directing incoming requests to the correct controller.
  
- services: 
  - Contains additional services used by the application.
  
- test: 
  - Includes test files for the application.
  
- .gitignore: 
  - Specifies files and directories to be ignored by Git during commits and pushes.
  
- README.md: 
  - Provides information about the application and instructions on how to use it.
  
- app.js: 
  - Serves as the entry point for the application, setting up the server and middleware.
  
- package-lock.json: 
  - Automatically generated for npm operations modifying node_modules or package.json.
  
- package.json: 
  - Specifies dependencies and scripts for the application.

## Deployment

To run the application, clone the repository:
```
git clonehttps://github.com/SyedFahad7/CRUDappUsingNodejs-MongoDB
```
Then navigate towards the root directory and Run `npm install` to install the necessary dependencies
```
cd crud-with-mongodb
npm install
```
Afterward, execute `npm start` to initiate the server.
```
npm start
```


## Authors

- [@Fahad](https://github.com/SyedFahad7)

