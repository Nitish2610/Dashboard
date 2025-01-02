# Dashboard Project

## Overview
The **Dashboard** project is a full-stack web application that provides authentication functionality, document upload capabilities, and various API integrations built with **Node.js** and **Express.js**. The project includes features like login, signup, forgot password, and a document management system.

## Features

### Authentication
- **Login**: Secure user authentication.
- **Signup**: Allows users to create accounts.
- **Forgot Password**: Enables users to reset their passwords securely via email with a token-based mechanism.

### Document Management
- **Document Upload**: Users can upload documents directly through the dashboard.
- **Action History**: A dedicated page to view all uploaded documents and interact with them via APIs (fetch, delete, etc.).

### APIs
The backend is built using **Node.js** and **Express.js**, providing robust API integrations for:
- **User Management**: APIs for login, signup, and password reset.
- **Document Management**: APIs for uploading, fetching, and deleting documents.
- Additional APIs can be integrated as needed.

## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **CSS**: For styling the components.

### Backend
- **Node.js**: For handling server-side logic.
- **Express.js**: For creating RESTful APIs.

### Database
- **MongoDB**: To store user credentials and document details.

### Libraries & Tools
- **Axios**: For making HTTP requests.
- **React Router**: For navigation.
- **Sonner**: For displaying toast notifications.
- **Multer**: For handling file uploads.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **bcrypt**: For hashing passwords.

## Installation

### Prerequisites
- Node.js installed on your system
- MongoDB connection (local or cloud-based, e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dashboard.git
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Usage

### Authentication
1. Create a new account via the **Signup** page.
2. Login using your credentials on the **Login** page.
3. If you forget your password, use the **Forgot Password** page to reset it.

### Document Management
1. Navigate to the **Dashboard**.
2. Upload a document using the **Upload Document** section.
3. View uploaded documents and manage them through the **Action History** page.


## Future Enhancements
- Role-based access control (e.g., Admin and User roles).
- Pagination for document listing.
- Enhanced search and filter capabilities.
- Integration with cloud storage services (e.g., AWS S3).

## License
This project is licensed under the MIT License.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git push origin feature-name
   ```
4. Submit a pull request.

## Contact
For any queries, feel free to contact:
- **Email**: nitishsharma09999@gmail.com
- **GitHub**: https://github.com/Nitish2610
