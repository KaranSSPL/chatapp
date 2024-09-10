Welcome to ChatApp, a real-time chat application built using modern web technologies like Prisma for MongoDB and Pusher for real-time communication. Follow the steps below to set up and run the project on your local machine.

------------Getting Started---------------

Prerequisites:
Ensure you have the following installed on your system:

Node.js
MongoDB Atlas account (for database hosting)
Pusher account (for real-time communication)

Setup:

1.Clone the Repository:
git clone <repository-url>

2.Install Dependencies:
npm install

3.Database Configuration:
-Open the .env file in the chatapp folder.
-Replace the DATABASE_URL with your MongoDB Atlas connection string. For example:
DATABASE_URL="<URL>"

4.Next Auth Configuration:
NEXTAUTH_SECRET= ""

5.Pusher Configuration:
In the same .env file, configure your Pusher credentials.
PUSHER_APP_ID=<your-pusher-app-id>
NEXT_PUBLIC_PUSHER_APP_KEY=<your-pusher-key>
PUSHER_SECRET=<your-pusher-secret>

You can find these credentials in your Pusher Dashboard.

6.Node Environment Configuration:
NODE_ENV = "development"

7.Run the Application:
npm run dev
The application will be available at http://localhost:3000.

Technologies Used:

Prisma (MongoDB):
This project uses Prisma as an ORM for MongoDB. It manages the database schema and handles user data, conversations, and messages. The Prisma schema is already set up to work with MongoDB Atlas.

Pusher:
Pusher is integrated to enable real-time chat functionality through WebSockets. This allows users to send and receive messages instantly. For more information on how Pusher works, visit the Pusher Documentation.