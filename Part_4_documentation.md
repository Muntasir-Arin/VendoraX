### Part 4: Implementation Documentation

#### Overview:
VendoraX is a platform for buying, selling, and renting products. I implemented core features such as user registration, login, product management, and rental/buy functionality. The system is designed to handle edge cases and ensures proper user access control and product status management.

#### Features Implemented:

1. **User Registration and Login**:
   - **Registration**: Users can register with their first name, last name, email, phone, password, and repeat password, as per the wireframe. The registration process checks for duplicate emails but allows users to have the same phone number. Password visibility toggle is included for better UX.
   - **Login**: Users can log in using their email and password. JWT-based authentication is used to manage sessions. If login is successful, a token is returned for subsequent requests.

2. **Product Management**:
   - **Add Product**: Users can add products via a multi-step form. The form is auto-saved and prevents the user from moving to the next step if validation errors exist. The form also supports navigation between steps, allowing users to go back and edit previous entries.
   - **Edit Product**: The product edit form auto-populates with existing product details, allowing users to modify and update their products.
   - **Delete Product**: Soft delete is implemented. Instead of removing products from the database, the product status is changed to “DELETED.” This ensures that if the product is rented or bought, its history is preserved while preventing further transactions.

3. **Rent and Buy**:
   - **Rent Product**: Users can rent products by specifying start and end dates. The system checks for overlapping rental dates to prevent double-booking. If rented, the product status remains "AVAILABLE" for future rentals.
   - **Buy Product**: Users can purchase products. A check is performed to ensure that a product is not in the "RENTED" status before allowing the purchase.
   - **Product Listings**: All products created by users are displayed. Products can be filtered by categories such as Electronics, Furniture, Home Appliances, etc.
   - **Transaction History**: Users can view their transaction history, including products they bought, rented, or lent.

#### Edge Cases and Solutions:
1. **Buying a Product While Rented**:
   - **Problem**: A user attempts to buy a product that is currently rented by another user.
   - **Solution**: The system checks whether the product is rented before allowing the purchase. If rented, the product cannot be bought.

2. **Product Deletion During Rental**:
   - **Problem**: A user deletes a product while it is rented to someone else.
   - **Solution**: Soft delete is implemented, so only the product's status is changed to "DELETED" without affecting the rental transaction. This preserves transaction history.

3. **Incomplete Product Information**:
   - **Problem**: Users may submit incomplete product information.
   - **Solution**: Frontend validation ensures all required fields are filled. If any field is left blank (e.g., product name or price), the form will prompt the user to fill in the missing fields.

4. **Unauthorized Access**:
   - **Problem**: Users may try to edit or delete products they do not own.
   - **Solution**: Each product is associated with a user ID (owner). The backend checks the user’s authentication and ensures they are the product owner before allowing edits or deletions.

5. **Overlapping Rental Dates**:
   - **Problem**: A user tries to rent a product during a period that overlaps with an existing rental.
   - **Solution**: The system checks the start and end dates of existing rentals for that product. If there is an overlap, the rental request is denied, preventing double booking.

#### Future Improvements:
1. **Refinement of Frontend**: The frontend design can be enhanced with more polished styling and animations, especially for loading states.
2. **Pagination**: Product and transaction lists should support pagination for better performance and user experience.
3. **Search and Filters**: Add more advanced product search and filtering capabilities to improve product discovery.
4. **Image Support**: Allow users to upload images for their products to improve the visual appeal of listings.
