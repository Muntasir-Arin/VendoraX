# VendoraX

VendoraX is a web application designed for renting, buying, and selling products. The platform enables users to manage their products, view products listed by others, and perform transactions seamlessly. Built with modern technologies like React, GraphQL, and Prisma, VendoraX delivers an optimized user experience and robust backend functionality.

---

## Features

### Part 1: Authentication
- User Registration
- User Login (simple string matching for this challenge)

### Part 2: Product Management
- Add products using a multi-page form with the ability to navigate back and edit.
- Edit existing products.
- Delete products.
- Categorize products under:
  - Electronics
  - Furniture
  - Home Appliances
  - Sporting Goods
  - Outdoor
  - Toys

### Part 3: Transactions
- View all products listed by all users.
- Buy products (ownership is transferred upon transaction).
- Rent products.
- Display a dashboard of bought, sold, borrowed, and lent products.

---

## Tech Stack

### Frontend
- **Framework**: React
- **GraphQL Client**: Apollo Client with `inMemoryCache`
- **UI Library**: Mantine (or your choice of UI library)

### Backend
- **Framework**: Node.js with Express.js
- **GraphQL**: Apollo Server
- **ORM**: Prisma

### Database
- **Database**: PostgreSQL

### Development Tools
- **Version Control**: Git
- **Environment Management**: Docker
- **Package Management**: Yarn

---

## Installation and Setup

### Prerequisites
- Docker installed
- Node.js and Yarn installed

### Steps
1. **Clone the repository**  
   Clone the VendoraX repository to your local machine:
   ```bash
   git clone https://github.com/muntasir-arin/VendoraX.git
   cd vendorax
   ```

2. **Build and Start the Services**  
   Navigate to the project root directory and start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**  
   - **Frontend**: Open your browser and navigate to `http://localhost:5173` to access the VendoraX application.
   - **Backend GraphQL Playground**: Access the GraphQL Playground for API testing at `http://localhost:4000`.

5. **Shut down the services**  
   When you’re done, stop the services by running:
   ```bash
   docker-compose down
   ```
   This will stop and remove the backend and database containers.
