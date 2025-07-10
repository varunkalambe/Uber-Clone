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
- `fullname.lastname` (string, required)
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
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

#### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2NjY2NjY2NjY2NjY2NjY2NiIsImlhdCI6MTY5MDAwMDAwMH0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
  "user": {
    "_id": "666666666666666666666666",
    "firstname": "John",
    "lastname": "Doe",
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
        "msg": "Invalid Email",
        "param": "email",
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

Authenticates a user using email and password. Returns a JWT token and the user object on success. Also sets a cookie with the token.

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
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

#### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2NjY2NjY2NjY2NjY2NjY2NiIsImlhdCI6MTY5MDAwMDAwMH0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
  "user": {
    "_id": "666666666666666666666666",
    "firstname": "John",
    "lastname": "Doe",
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
        "msg": "Invalid Email",
        "param": "email",
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
- A cookie named `token` is also set with the JWT token.

---

# User Profile Endpoint Documentation

## Endpoint

**GET** `/users/profile`

## Description

Retrieves the profile information of the currently authenticated user. Requires a valid JWT token.

## Authentication

This endpoint requires authentication. Include the JWT token in one of the following ways:

- **Authorization Header:** `Authorization: Bearer <jwt_token>`
- **Cookie:** `token=<jwt_token>`

## Request Body

No request body required.

## Responses

### Success

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user_id>",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
  ```

#### Example Response

```json
{
  "_id": "666666666666666666666666",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

### Unauthorized

- **Status:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Unauthorized access"
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

- Authentication is required via JWT token.
- Returns the user object associated with the provided token.

---

# User Logout Endpoint Documentation

## Endpoint

**GET** `/users/logout`

## Description

Logs out the currently authenticated user by clearing the token cookie and adding the token to a blacklist to prevent reuse.

## Authentication

This endpoint requires authentication. Include the JWT token in one of the following ways:

- **Authorization Header:** `Authorization: Bearer <jwt_token>`
- **Cookie:** `token=<jwt_token>`

## Request Body

No request body required.

## Responses

### Success

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Example Response

```json
{
  "message": "Logged out successfully"
}
```

### Unauthorized

- **Status:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Unauthorized access"
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

- Authentication is required via JWT token.
- The token cookie is cleared from the browser.
- The token is added to a blacklist to prevent future use.
- After logout, the token becomes invalid for all future requests.

---

# Captain Registration Endpoint Documentation

## Endpoint

**POST** `/captain/register`

## Description

Registers a new captain with required personal and vehicle information. Returns a JWT token and captain data upon successful registration.

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "blue",
    "plate": "XYZ789",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required, min 3 characters)
- `fullname.lastname` (string, required)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)
- `vehicle.color` (string, required, min 3 characters)
- `vehicle.plate` (string, required, min 3 characters)
- `vehicle.capacity` (number, required, min 1)
- `vehicle.vehicleType` (string, required, one of: `car`, `motorcycle`, `auto`)

## Responses

### Success

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "665a1f2b3c4d5e6f7a8b9c0d",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "blue",
        "plate": "XYZ789",
        "capacity": 3,
        "vehicleType": "car"
      },
      "status": "inactive"
    }
  }
  ```

#### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "665a1f2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "XYZ789",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Color must be at least of 3 characters",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Vehicle type must be car, motorcycle or auto",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

### Email Conflict

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exists with this email"
  }
  ```

### Missing Fields Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "All fields are required"
  }
  ```

## Notes

- **Password Security:** Passwords are hashed using bcrypt before storage.
- **JWT Token:** Valid for 1 day (`expiresIn: '1d'`).
- **Default Status:** New captains are registered as inactive.
- **Response Filtering:** Password field is never returned (`select: false` in schema).