# VendoraX

VendoraX is a web application designed for renting, buying, and selling products. The platform allows users to manage their products, view products listed by others, and perform transactions such as buying and renting products. It features a modern, user-friendly interface built with React and TypeScript, powered by a robust backend using GraphQL, Prisma, and PostgreSQL.

---

## Features

### Part 1: Authentication
- **User Registration**: Users can register by providing their first name, last name, email, phone number, and password. 
  - **Validation**: Ensures that the email is unique (duplicates are not allowed), while allowing users to have the same phone number.
  - **Password Management**: Passwords are shown/hidden based on user preference.
- **User Login**: Users can log in using their email and password (basic authentication via JWT). Token-based authentication ensures security for user sessions.

### Part 2: Product Management
- **Add Product**: Users can add products using a multi-step form, ensuring a structured and guided product entry process.
  - **Autosave**: Product details are automatically saved while the user progresses through the form.
  - **Input Validation**: Zod is used for user input validation at each step of the form. The user cannot move to the next step if any validation error occurs.
- **Edit Product**: Users can edit their product information at any time. The form resets to the product’s current details when the user chooses to edit.
- **Delete Product**: Products can be soft-deleted, meaning the product status is changed to "DELETED" but it is not permanently removed from the database.
  - **Ownership Check**: Only the product’s owner can edit or delete it.
- **Product Categories**: Products are categorized under the following categories:
  - Electronics
  - Furniture
  - Home Appliances
  - Sporting Goods
  - Outdoor
  - Toys

### Part 3: Transactions
- **List All Products**: Users can view products listed by all other users. 
- **Rent Products**: Users can rent products, with the system ensuring no overlapping rental periods for a product.
- **Buy Products**: Users can buy products, and ownership is transferred upon successful purchase.
- **View Transactions**: Users can view all their transactions, whether they are the buyer, renter, or seller.
  - **Bought Products**: Displays a list of products the user has bought.
  - **Sold Products**: Displays products the user has sold.
  - **Rented Products**: Displays products the user has rented.
  - **Lent Products**: Displays products the user has lent.

### Part 4: Edge Cases and Solutions
- **Overlapping Rent**: If a user tries to rent a product that has overlapping rental periods, the system checks for availability before allowing the transaction.
- **Delete Product During Rent**: Soft delete is used when a product is deleted during a rental. The product status is updated to "DELETED", but it remains in the database, allowing the system to handle rented products correctly.
- **Empty Product Fields**: If a required field is left blank during product entry, validation prevents submission and prompts the user to fill in all fields.
- **Unauthorized Access**: Only the owner of a product can edit or delete it. This is enforced by checking the ownership of the product via the user ID associated with the product.

---

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Shadcn UI
- **State Management**: React's `useState` and `useEffect` hooks
- **Form Validation**: Zod for input validation during product form submission
- **Authentication**: JWT-based token authentication for user login

### Backend
- **Framework**: Node.js with Express.js
- **GraphQL**: Apollo Server for managing GraphQL queries and mutations
- **ORM**: Prisma for database management
- **Database**: PostgreSQL for storing user, product, and transaction data

### Development Tools
- **Containerization**: Docker for containerizing the backend, frontend, and PostgreSQL database
- **Package Management**: Yarn for managing dependencies
- **Version Control**: Git for source control

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

   This will build and start the frontend, backend, and PostgreSQL services. The backend will automatically connect to the PostgreSQL database.

3. **Access the application**  
   - **Frontend**: Open your browser and navigate to `http://localhost:5173` to access the VendoraX application.
   - **Backend GraphQL Playground**: Access the GraphQL Playground for API testing at `http://localhost:4000`.

4. **Handling Migration Errors**  
   If you encounter a migration error, you can apply migrations manually by following these steps:
   
   - First, check that all services are up and running by verifying the Docker containers:
     ```bash
     docker-compose ps
     ```
   
   - To apply migrations, run the following command inside the backend container:
     ```bash
     docker-compose exec backend npx prisma migrate deploy
     ```
   
   This command will apply any pending migrations to your PostgreSQL database.

5. **Shut down the services**  
   When you’re done, stop the services by running:
   ```bash
   docker-compose down
   ```
   This will stop and remove the backend, frontend, and database containers.

---

## Future Improvements

- Refine the frontend with additional features and animations.
- Add pagination for product and transaction listings to improve performance.
- Enhance the product search functionality with better filters.
- Implement image uploads for products to enhance listings.
