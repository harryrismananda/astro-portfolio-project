# API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Create a new user account for CMS access.

**Request Body:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  },
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400`: Missing required fields
- `409`: Username or email already exists
- `500`: Server error

---

### Login
**POST** `/api/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Error Responses:**
- `400`: Missing username or password
- `401`: Invalid credentials
- `500`: Server error

---

## Projects Endpoints

### Get All Projects
**GET** `/api/project`

Fetch all projects with optional filtering and pagination.

**Query Parameters:**
- `category` (optional): Filter by category
- `status` (optional): Filter by status (e.g., "active", "completed")
- `limit` (optional): Number of items to return
- `skip` (optional): Number of items to skip (for pagination)

**Example:**
```
GET /api/project?category=web&status=active&limit=10&skip=0
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce solution",
      "image": "https://example.com/image.jpg",
      "images": ["url1", "url2"],
      "technologies": ["React", "Node.js", "MongoDB"],
      "features": ["Shopping cart", "Payment integration"],
      "githubUrl": "https://github.com/user/project",
      "liveUrl": "https://project.com",
      "status": "active",
      "category": "web",
      "duration": "3 months",
      "team": "Solo",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-15T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 15,
    "limit": 10,
    "skip": 0
  }
}
```

---

### Create Project
**POST** `/api/project`

Create a new project. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "My New Project",
  "description": "A detailed description of the project",
  "image": "https://example.com/main-image.jpg",
  "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
  "technologies": ["React", "TypeScript", "Tailwind CSS"],
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project-demo.com",
  "status": "active",
  "category": "web",
  "duration": "2 months",
  "team": "4 members"
}
```

**Required Fields:**
- `title`: string
- `description`: string
- `technologies`: string[] (at least one)

**Optional Fields:**
- `image`: string
- `images`: string[]
- `features`: string[]
- `githubUrl`: string
- `liveUrl`: string
- `status`: string (default: "active")
- `category`: string
- `duration`: string
- `team`: string

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My New Project",
    "description": "A detailed description",
    "technologies": ["React", "TypeScript"],
    ...
  },
  "message": "Project created successfully"
}
```

**Error Responses:**
- `400`: Missing required fields or validation error
- `401`: Unauthorized (missing or invalid token)
- `500`: Server error

---

### Get Project by ID
**GET** `/api/project/:id`

Fetch a single project by its ID.

**Example:**
```
GET /api/project/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Project Title",
    "description": "Project description",
    ...
  }
}
```

**Error Responses:**
- `400`: Invalid project ID
- `404`: Project not found
- `500`: Server error

---

### Update Project
**PUT** `/api/project/:id`

Update an existing project. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
You can send only the fields you want to update:
```json
{
  "title": "Updated Title",
  "status": "completed",
  "liveUrl": "https://new-url.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "status": "completed",
    ...
  },
  "message": "Project updated successfully"
}
```

**Error Responses:**
- `400`: Invalid project ID
- `401`: Unauthorized
- `404`: Project not found
- `500`: Server error

---

### Delete Project
**DELETE** `/api/project/:id`

Delete a project by ID. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Example:**
```
DELETE /api/project/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid project ID
- `401`: Unauthorized
- `404`: Project not found
- `500`: Server error

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
});
const { data: { token } } = await loginResponse.json();

// Create Project (with auth)
const createResponse = await fetch('/api/project', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Description here',
    technologies: ['React', 'Node.js']
  })
});

// Get all projects (no auth needed)
const projectsResponse = await fetch('/api/project?limit=10');
const { data: projects } = await projectsResponse.json();

// Update project (with auth)
const updateResponse = await fetch('/api/project/507f1f77bcf86cd799439011', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    status: 'completed'
  })
});

// Delete project (with auth)
const deleteResponse = await fetch('/api/project/507f1f77bcf86cd799439011', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Authentication Flow

1. **Register** a new admin user via `/api/auth/register`
2. **Login** to get a JWT token via `/api/auth/login`
3. **Store** the token securely (e.g., in localStorage or a cookie)
4. **Include** the token in the `Authorization` header for protected endpoints:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

---

## Notes

- All endpoints return JSON responses
- Timestamps (`createdAt`, `updatedAt`) are automatically managed by MongoDB
- The middleware protects all routes except public ones (/, /portfolio, /login, /register, /resume)
- JWT tokens should be kept secure and have an expiration time
