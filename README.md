# To-Do List Application
This To-Do List application provides a simple yet powerful interface to manage tasks efficiently. Built with Node.js and Express for the backend, MongoDB for data storage, Mongoose for object data modeling, and TailwindCSS for a responsive frontend design, it offers a sleek user experience across all devices.

## Features
- Task Management: Create, read, update, and delete tasks.
- Due Dates: Assign due dates to tasks.
- Task Completion Toggle: Mark tasks as completed or pending.
- Responsive Design: A mobile-friendly UI that adapts to various screen sizes.

## Getting Started

### Prerequisites
- Node.js (version 14 or later recommended)
- MongoDB (local or remote instance)
- npm (Node Package Manager)

### Installation
- Clone the repository
``` bash 
git clone https://jferreiros.com/to-do-ikigai.git
cd project
```

- Install dependencies
```bash
npm install
``` 

- Configure Environment Variables
Create a .env file in the root directory and add the following variables:
```bash
MONGODB_URI=your_mongodb_uri
PORT=3000 # or any port of your choice
```
Replace your_mongodb_uri with the connection string to your MongoDB database.

## Run the Application
```bash
npm start
```
The server will start, and you can access the application at http://localhost:3000 or another port if you specified a different one.

## Usage
- Adding a Task: Use the input form on the homepage to add new tasks.
- Viewing Tasks: Tasks are listed with their titles, descriptions, due dates, and completion status.
- Editing Tasks: Click on a task to edit its details.
- Deleting Tasks: Use the delete button beside each task to remove it from the list.
