# Recipe Server

Welcome to the Recipe Server! This project is designed to provide a simple web interface for surfacing recipes written in the CookLang format. The backend of the application is built using the Go programming language, while the frontend is developed using vanilla React (based on create-react-app). This readme will guide you through setting up the development environment and provide an overview of the project structure and important details.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Recipe Server is a platform that allows users to access and share recipes written in the CookLang format. CookLang is a custom language for writing cooking recipes, making it easy to describe ingredients, steps, and other details in a human-readable way.

## Features

- Browse a collection of recipes written in CookLang.
- Search for recipes based on ingredients, cuisine, or keywords.
- View detailed information for each recipe, including ingredients and steps.
- Responsive web design for optimal use on both desktop and mobile devices.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Go (1.21+)
- Node.js (18+)
- yarn (1.x)

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/brendanmckenzie/recipe-server.git
   cd recipe-server
   ```

2. **Backend Setup:**

   - Install Go dependencies:
     ```
     go mod download
     ```

3. **Frontend Setup:**
   - Install npm packages for the React frontend:
     ```
     cd cook-ui
     yarn
     ```

## Project Structure

The project follows a standard structure for separating the frontend and backend:

```
recipe-server/
├── ./                 # Go backend code
│   ├── main.go
│   ├── ...
├── cook-ui/           # React frontend code
│   ├── public/
│   ├── src/
│   ├── ...
├── README.md
```

- The root directory contains the Go code for the web server and API endpoints.
- The `cook-ui` directory contains the React code for the user interface, components, and styles.

## Running the Application

1. **Start the Backend:**

   ```
   RECIPE_DIR="/path/to/folder/containing/.cook/files"
   go run .
   ```

2. **Start the Frontend:**

   ```
   cd cook-ui
   yarn start
   ```

3. Access the application in your web browser at `http://localhost:3000`.

## Building the Application

RUn `make` in the root directory to build the server.

This will produce a single binary - `recipe-server` - with the frontend embedded. The binary can be run directly to start the server.

## Contributing

Contributions to this project are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
