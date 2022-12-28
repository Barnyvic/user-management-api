# user-management-api

a simple user management node-express REST API application.

---

## Requirements

1.  Users should be able to create an account and login
2.  Users should be able to edit their profile
3.  Users should be able to upload their profile picture and the link should be returned as part of their profile information
4.  User should be able to delete their account.

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

---

## Endpoints

---

<p> <b>Sign-up and Login Endpoints</b></p>

- Sign-up : <b>/api/auth/signup </b>,

- Login : <b>/api/auth/login</b>,

<p> <b>User Routes</b></p>

- getSingleUser : <b>/api/user/profile/:id</b>

- updateUser : <b>/api/user/updateprofile/:id </b>

- deleteUser : <b>/api/user/delete/:id </b>

- uploadProfilePicture : <b>/api/user/upload</b>

---

## Live Preview for the api

---

https://wild-gray-llama-cape.cyclic.app/

---

## Model

---

**User Model**

| User-Schema    | Datatypes |
| -------------- | :-------: |
| firstname      |  String   |
| lastname       |  String   |
| password       |  String   |
| email          |  String   |
| phoneNumber    |  String   |
| profilePicture |  String   |

---

## APIs

---

Signup User

- Route: /api/auth/signup
- Method: POST
- Body:

```
{
  "email": "Gift@example.com",
  "password": "aaaaa",
  "firstname": "Gift",
  "lastname": "Henry",
  "confirmPassword":"aaaaa",
  "phoneNumber":"098873764673",
}
```

- Responses

Success

```
{
    message: 'Signup successful',
    user: {
        id : 6363d816a2ee2e2486defc19
        "email": "Gift@example.com",
        "password": "aaaaa",
        "firstname": "Gift",
        "lastname": "Henry",
        "phoneNumber":"098873764673",
        "profilePicture": " "
    }
}
```

### Login User

- Route: /api/auth/login
- Method: GET
- Body:

```
{
  "password": "aaaaa",
  "email": "Gift@example.com",
}
```

- Responses

Success

```
{
    Token: 'hhhdbhdhjdywdkDUWGFYQDVQUJJVHjhsggwtvwbvvvvwahwjkjkagqjwgbqhhwhghahwhahjwh',
    Email: "Gift@example.com",
    Name:  "Gift Henry"
    id : 6363d816a2ee2e2486defc19
}
```

### update User

- Route: /api/user/profile/:id
- Method: PUT
- Authorization
  - Token
- Body

  ```
  {
   "firstname": "Gift",
      "lastname": "Barny",
      "phoneNumber":"0988737645673"
   }
  ```

- Response

  ```
  "message": [
        {
   id : 6363d816a2ee2e2486defc19
      "email": "Gift@example.com",
      "password": "aaaaa",
      "firstname": "Gift",
      "lastname": "Barny",
      "phoneNumber":"0988737645673"
  ```

  ### deleted blogs

- Route: /api/user/delete/:id
- Method: DELETE
- Authorization
  - Token
- Body

```
    {
      id : 6363d816a2ee2e2486defc19
     }
```

- Response

```
{
   "message": "Deleted Successfully"
}
```

### upload Image

- Route: /api/user/upload
- Method: PUT
- Authorization
  - Token
- Body

```
    {
      file : "dowloadimage.png"
     }
```

- Response

```
{
   "message": "picture uploaded successfully"
    user: {
        id : 6363d816a2ee2e2486defc19
        "email": "Gift@example.com",
        "password": "aaaaa",
        "firstname": "Gift",
        "lastname": "Henry",
        "phoneNumber":"098873764673",
        "profilePicture": "dowloadimage.png"
    }
}
```

### Get single User

- Route: /api/user/profile/:id
- Method: GET
- Authorization
  - Token
- Response

```
{
   "message": "User Data"
    user: {
        id : 6363d816a2ee2e2486defc19
        "email": "Gift@example.com",
        "password": "aaaaa",
        "firstname": "Gift",
        "lastname": "Barny",
        "phoneNumber":"0988737645673",
        "profilePicture": "dowloadimage.png"
    }
}
```

## Contributors

---

Barny victor
