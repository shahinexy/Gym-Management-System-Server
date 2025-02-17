# Gym Management system
The Gym Management System streamlines class scheduling and membership with Admin, Trainer, and Trainee roles. Admins manage trainers and schedules, Trainers conduct classes, and Trainees book sessions. Limits: 5 classes/day, 10 trainees/class. JWT authentication ensures security, while robust error handling prevents overbooking and unauthorized actions.

**Live Server Link:** https://gym-management-system-cyan.vercel.app/

- **Admin Login Credential** 
  - Email: shahin@gmail.com 
  - Password: Shahin123

**ER Diagram Link:** https://lucid.app/lucidchart/0676a86b-3242-43eb-8920-3e35e28bac03/edit?viewport_loc=-1702%2C-757%2C3260%2C1541%2C0_0&invitationId=inv_d0782d1d-699e-4c8b-83ef-19c8ed763f88

#### I have added a Postman collection for API testing in the root directory of the project.

## Key Features

### Role-Based Access Control  
- **Admin:** Manages trainers, schedules classes, and assigns trainers.  
- **Trainer:** Conducts assigned classes and views schedules but cannot modify them.  
- **Trainee:** Creates and manages profiles, books available classes, and cancels bookings if needed.  

### Class Scheduling  
- Maximum of 5 class schedules per day.  
- Each class lasts 2 hours**.  
- Admins handle scheduling and trainer assignments.  
- A maximum of 10 trainees per class; additional bookings are restricted.  

### Booking System  
- Trainees can book classes if slots are available.  
- A trainee cannot book multiple classes in the same time slot.  
- Trainees can cancel their bookings when necessary.  

### Security & Access Control  
- JWT-based authentication ensures secure access control.  
- Unauthorized users are restricted from performing specific actions.  

### Error Handling & Business Rules Enforcement  
- Prevents overbooking and scheduling beyond the daily limit.  
- Handles validation errors and unauthorized access attempts.  

## Technology used

1.  Backend: Node.js, Express.js, TypeScript
2.  DataBase: MongoDB and Mongoose
3.  Tools: cloudinary, Zod, EsLint

## Check API Endpoint

### Authentication

**Create User: (POST)** <br>
`/api/users/create-admin` <br>
`/api/users/create-trainer` <br>
`/api/users/create-trainee` <br>
**Request Body:**

```
{
    "name": {
        "firstName": "Example",
        "middleName": "A.",
        "lastName": "Doe"
    },
    "age": 21,
    "gender": "male",
    "email": "example@gmail.com",
    "password": "Example123"
}
```

**Login User: (POST)**
`/api/auth/login` <br>
**Request Body:**

```
{
    "email": "texample@gmail.com",
    "password": "Example1234"
}
```
### Class Schedule

**Create Class Schedule: (POST)**
`/api/class-schedules/create-class-schedule` <br>
**Request Body:**

```
{
    "days": [
        "Sun",
        "Mon"
    ],
    "startTime": "10:00",
    "endTime": "12:00",
    "trainer": "67b35048069168baad07601d"
}
```

**Get All Class Schedule: (GET)**
`/api/class-schedules` <br>

**Get Single Class Schedule: (GET)**
`/api/class-schedules/:id` <br>

**Update Class Schedule: (PATCH)**
`/api/class-schedules/:id` <br>

**Delete Class Schedule: (DELETE)**
`/api/class-schedules/:id` <br>

**Assign Trainee Into Class Schedule: (PUT)**
`/api/class-schedules/:id/assign-trainee` <br>

**My Class Schedule: (Get)**
`/api/class-schedules/my-class-schedule` <br>

**Request Body:**

```
{
    "trainees": [
        "65b4f3e8a3b2c7d9f1e45609"
    ]
}
```

**Remove Trainee From Class Schedule: (DELETE)**
`/api/class-schedules/:id/remove-trainee` <br>

**Request Body:**

```
{
    "trainees": [
        "65b4f3e8a3b2c7d9f1e45609"
    ]
}
```

### Booking Schedule

**Book Schedule: (POST)**
`/api/bookings/book-schedule` <br>

**Request Body:**

```
{
    "classSchedule": "67b3343ef7223b22bb973291"
}
```

**Cancel Booked Schedule: (POST)**
`/api/bookings/cancel-schedule` <br>

**Request Body:**

```
{
    "classSchedule": "67b3343ef7223b22bb973291"
}
```

**Get All Booked Schedule: (GET)**
`/api/bookings` <br>

**My Booked Schedule: (GET)**
`/api/bookings/my-booked-schedules` <br>

## Project Set-Up Instructions

#### 1. Clone the Repository

```
https://github.com/shahinexy/Gym-Management-System-Server.git
```

#### 2. Install Dependencies

```
npm install
```

#### 3. Set up Environment variables create an .env file in the root directory and include the following

```
NODE_ENV=development
PORT=4000
DATABASE_URL=mongodb+srv:mongodb://localhost:27017
BCRYPT_SALT_ROUND=12
JWT_ACCESS_SECRET=a3f7b6c9d8e2f41509bc7da6e......
JWT_ACCESS_EXPIRES_IN=1d
```

#### 4. Run the server in development mode

```
npm run dev
```