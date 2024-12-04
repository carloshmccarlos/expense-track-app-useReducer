import {createContext, useContext, useReducer} from "react";
import {categories, initialExpenses} from "../../public/data.js";

const ExpenseContext = createContext({});

const initialData = {
    expenses: initialExpenses,
    selectedItem: initialExpenses[0],
    view: 'detail',
    nextId: initialExpenses.length + 1,
    categories: categories,
};

function reducer(state, action) {
    switch (action.type) {
        case 'select':
            return {
                ...state,
                selectedItem: action.payload,
            };
        case 'add':
        { const newExpenses = [...state.expenses, action.payload];

            return {
                ...state,
                expenses: newExpenses,
                view: 'detail',
                nextId: state.nextId + 1,
                selectedItem: newExpenses[newExpenses.length - 1],
            }}
        case 'delete':
        { const newExpenses = state.expenses.filter(expense => expense.id !== state.selectedItem.id);

            return {
                ...state,
                expenses: newExpenses,
                selectedItem: newExpenses[0],
            }}

        case 'update':
        {
            const newExpenses = state.expenses.map(expense =>
                expense.id === action.payload.id ? action.payload : expense
            );

            return {
                ...state,
                expenses: newExpenses,
                view: 'detail',
                selectedItem: action.payload,
            };}

        case 'viewAdd':
            return {
                ...state,
                view: 'add',
            };
        case 'viewUpdate':
            return {
                ...state,
                view: 'update',
            };
        case 'viewDetail':
            return {
                ...state,
                view: 'detail',
            };
        default:
            return state;
    }
}


export function ExpenseProvider({ children }) {
    const [{ expenses, selectedItem, view, nextId, categories }, dispatch] = useReducer(reducer, initialData);

    return (
        <ExpenseContext.Provider value={
            {
                expenses,
                selectedItem,
                view,
                nextId,
                dispatch,
                categories,
            }
        }>
            {children}
        </ExpenseContext.Provider>
    )
}

export function useExpenseContext() {
    const context = useContext(ExpenseContext);

    if (context === undefined) {
        throw new Error('useExpenseContext must be used within context');
    }

    return context;
}