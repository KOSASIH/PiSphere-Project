# API Overview

The PiSphere API provides a set of endpoints for interacting with the PiSphere platform. It allows users to create proposals, vote, and manage their tokens.

## Base URL

[http://localhost:5000/api](http://localhost:5000/api) 


## Authentication

All API requests require authentication via a JSON Web Token (JWT). Users must log in to receive a token, which should be included in the `Authorization` header for subsequent requests.

## Endpoints

### 1. Create Proposal

- **POST** `/proposals`
- **Description**: Create a new proposal.
- **Request Body**:
  ```json
  1 {
  2   "title": "Proposal Title",
  3   "description": "Detailed description of the proposal",
  4   "funding": 1000
  5 }
  ```

  **Response**
  ```json
  1 {
  2   "success": true,
  3   "message": "Proposal created successfully",
  4   "proposalId": "12345"
  5 }
  ```

### 2. Vote on Proposal
- **POST** /proposals/:id/vote
- **Description**: Cast a vote on a specific proposal.
- **Request Body**:
  ```json
  1 {
  2   "vote": "yes" // or "no"
  3 }
  ```
  
**Response**:
  ```json
  1 {
  2   "success": true,
  3   "message": "Vote cast successfully"
  4 }
  ```

### 3. Get Proposals
- **GET** /proposals
- **Description**: Retrieve a list of all proposals.
- **Response**:
  ```json
  1 [
  2   {
  3     "id": "12345",
  4     "title": "Proposal Title",
  5     "description": "Detailed description",
  6     "status": "active"
  7   },
  8   ...
  9 ]
  ```

### 4. Get User Tokens
- **GET** /users/:id/tokens
- **Description**: Retrieve the token balance and transaction history for a user.
- **Response**:
  ```json
  1 {
  2   "balance": 100,
  3   "transactions": [
  4     {
  5       "id": "tx1",
  6       "amount": 10,
  7       "date": "2023-01-01"
  8     },
  9     ...
  10   ]
  11 }

## Error Handling
All API responses include a status code and a message. Common status codes include:

- 200 OK: Request was successful.
- 400 Bad Request: Invalid request parameters.
- 401 Unauthorized: Authentication failed.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: An error occurred on the server.

For more detailed API documentation, please refer to the individual endpoint files in this directory.

