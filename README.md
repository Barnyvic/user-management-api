# user-management-api
a simple user management node-express  REST API application. 

---

## Requirements

1.  Users should be able to create an account and login
2.  Users should be able to edit their profile 
3. Users should be able to upload their profile picture and the link should be returned as part of their profile information
4. User should be able to delete their account.

---
## Set-up

A detailed documentation of the api can be found here: API Documentation Run Project Locally

- Clone the project

- cd into the project's folder and run yarn to install dependencies

- Create a .env file and add all environment keys name

- Run yarn start to start the server using nodemon

- Run yarn dev to start the server using nodemon

- Run yarn build to build the project

- PORT = 4000


## HTTP Request
All API requests are made by sending a secure HTTPS request using one of the following methods:

- POST Create a resource
- GET Get a resource or list of resources
- PATCH updates a resource or list of resources
- PUT updates a resource or list of resources
- DELETE deletes a resource or list of resources
- For POST, the body of your request must be a JSON payload.
