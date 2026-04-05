# API Reference

Base URL (local): `http://localhost:8000`  
Base URL (production): `https://mentotutor.com`

All API responses use **camelCase keys** and `Content-Type: application/json`.

---

## GET /health

Health check endpoint.

**Response 200**
```json
{ "status": "ok" }
```

---

## POST /api/v1/demo-bookings

Creates a new demo booking and sends admin email notification.

**Request Body**
```json
{
  "date": "2026-04-10",
  "time": "14:00",
  "timezone": "Asia/Kolkata",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "contactNo": "+91-9876543210",
  "country": "India",
  "source": "Google",
  "grade": "Grade 7-9",
  "subject": "Math",
  "topic": "Algebra Basics",
  "additionalInfo": "optional field"
}
```

**Response 201**
```json
{
  "message": "Demo booking created successfully",
  "data": {
    "id": 1,
    "date": "2026-04-10",
    "time": "14:00",
    "timezone": "Asia/Kolkata",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "contactNo": "+91-9876543210",
    "country": "India",
    "source": "Google",
    "grade": "Grade 7-9",
    "subject": "Math",
    "topic": "Algebra Basics",
    "additionalInfo": "optional field",
    "createdAt": "2026-04-05T06:46:28+00:00"
  }
}
```

**Response 422 (validation failure)**
```json
{
  "message": "Validation failed",
  "errors": {
    "firstName": "First name is required",
    "email": "Valid email is required"
  }
}
```

**Side effects:** Sends an email to `ADMIN_EMAIL` via Brevo SMTP. Email failure does NOT fail the booking — it is logged to `storage/logs/laravel.log`.

---

## GET /api/v1/demo-bookings

Returns all bookings, newest first.

**Response 200**
```json
{
  "data": [
    {
      "id": 1,
      "date": "2026-04-10",
      ...
      "createdAt": "2026-04-05T06:46:28+00:00"
    }
  ]
}
```

---

## POST /api/v1/users

Creates a new user. Email must be unique.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210"
}
```

**Response 201**
```json
{
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "createdAt": "2026-04-05T06:46:28+00:00",
    "updatedAt": "2026-04-05T06:46:28+00:00"
  }
}
```

**Response 422 (duplicate email)**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Email already exists"
  }
}
```

---

## GET /api/v1/users

Returns all users, newest first.

**Response 200**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9876543210",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## Quick curl test commands

```bash
# Health
curl http://localhost:8000/health

# Create booking
curl -s -X POST http://localhost:8000/api/v1/demo-bookings \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-04-10","time":"14:00","timezone":"Asia/Kolkata","firstName":"Test","lastName":"User","email":"test@test.com","contactNo":"+91-123","country":"India","source":"Google","grade":"Grade 7-9","subject":"Math","topic":"Algebra","additionalInfo":""}'

# List bookings
curl http://localhost:8000/api/v1/demo-bookings

# Create user
curl -s -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+91-999"}'

# List users
curl http://localhost:8000/api/v1/users
```
