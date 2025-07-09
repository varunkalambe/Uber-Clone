# User Registration Endpoint Documentation

## Endpoint

**POST** `/users/register`

## Description

Registers a new user. Requires first name, last name, email, and password. Returns a JWT token and the created user object on success.

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required, min 3 characters)
- `fullname.lastname` (string, required, min 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)

## Responses

### Success

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Other Errors

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Notes

- All fields are required.
- Email must be unique.
- Password is hashed before storage.
- On success, a JWT token is returned for authentication.

---

# User Login Endpoint Documentation

## Endpoint

**POST** `/users/login`

## Description

Authenticates a user using email and password. Returns a JWT token and the user object on success.

## Request Body

Send a JSON object in the following format:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)

## Responses

### Success

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

#### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2NjY2NjY2NjY2NjY2NjY2NiIsImlhdCI6MTY5MDAwMDAwMH0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
  "user": {
    "_id": "666666666666666666666666",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Invalid Credentials

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

### Other Errors

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Notes

- Email and password are required.
- On success, a JWT token is returned for authentication.