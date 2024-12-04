# Expense Tracker App

## Overview

This is a version with useContext and useReducer to manage the states.
The primary version is here: 
https://github.com/carloshmccarlos/expense-track-app

The demo: https://www.carloshmccarlos.dynv6.net/
---

## Features

1. **Add New Expenses**
   - Easily add a new expense with the details such as name, amount, and category.
   - The new expense is instantly displayed in the list, allowing you to keep track of it.

2. **Update Existing Expenses**
   - Modify details of any existing expense.
   - You can change the name, amount, or category of an expense.

3. **Delete Expenses**
   - Remove any expense from the list if it's no longer needed.
   - Selected expense will be deleted permanently.

4. **Expense Details**
   - View the details of any selected expense, including its name, amount, and category.

5. **Summary by Category**
   - View a breakdown of total expenses by category.
   - Click on a category to filter and view only the expenses in that particular category.

6. **Multilingual Support**
   - The app supports English and Chinese.
   - Users can change the language from a dropdown menu in the application.

## Components

### 1. **Button Component**
- A reusable button component used throughout the application.

### 2. **ListOnClick Component**
- A utility component for clickable list items, used in displaying the list of expenses and categories.

### 3. **NameTable Component**
- Displays the list of all expenses, allowing the user to select a specific expense to view in detail.

### 4. **Detail Component**
- Shows detailed information about the selected expense, along with buttons to update or delete it.

### 5. **CountByCategory Component**
- Provides a summary of total expenses by category and enables users to filter expenses by clicking on a category.

### 6. **FilterByCategory Component**
- Displays a list of expenses filtered by the selected category.

### 7. **AddForm Component**
- Allows users to add a new expense by entering details like name, amount, and category.

### 8. **UpdateForm Component**
- Provides a form to update details of an existing expense.

### 9. **LanguageChoice Component**
- Enables users to switch between English and Chinese for the app's user interface.

## State Management

- The application uses the `useReducer` hook for managing state. The state includes the list of expenses, the selected item, the current view (add, update, or detail), and the next available ID for a new expense.

- **Actions in Reducer**
   - `select`: Select an expense for viewing in detail or updating.
   - `add`: Add a new expense to the list.
   - `delete`: Delete the selected expense.
   - `update`: Update the details of the selected expense.
   - `viewAdd`, `viewUpdate`, `viewDetail`: Change the current view to add, update, or detail respectively.

## How to Use the Application

1. **Adding an Expense**: Click the "Add" button and fill in the name, amount, and category of the new expense. Submit the form to add it to the list.

2. **Viewing an Expense**: Click on any expense from the list to view its details.

3. **Updating an Expense**: Click the "Update" button in the detail view to modify the expense details.

4. **Deleting an Expense**: Click the "Delete" button in the detail view to remove the selected expense.

5. **Filtering by Category**: Click on any category in the "CountByCategory" section to see expenses that belong to that category.

6. **Switching Languages**: Use the language dropdown to switch between English and Chinese.

## Running the Application

1. **Install Dependencies**: Run the command below to install the necessary dependencies:
   ```bash
   npm install
   ```

2. **Start the Application**: Run the command below to start the app:
   ```bash
   npm start
   ```

3. **Access the Application**: Open your browser and go to `http://localhost:3000` to access the app.

## Folder Structure

- **src/**: Contains all the components and main application logic.
- **App.css**: Contains styling for the application.
- **data.js**: Contains initial data for categories and expenses.
- **public/**: Contains the app's public assets.

## Dependencies

- **React**: The application is built using React.
- **CSS**: Used for styling components.

## Future Improvements

1. **Persistent Storage**: Save expenses to local storage or connect to a backend to store data permanently.
2. **Search Functionality**: Add a search bar to quickly find specific expenses.
3. **Enhanced Filtering**: Provide additional filters such as date, range, and sorting.

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

---

Happy tracking! 😊

