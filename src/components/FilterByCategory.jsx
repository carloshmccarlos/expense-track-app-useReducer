import {useExpenseContext} from "../contexts/ExpenseContext.jsx";
import {NameTable} from "./NameTable.jsx";

export function FilterByCategory({ selectedCategory, children }) {
    console.log(selectedCategory)
    const { expenses } = useExpenseContext();

    const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);

    return (
        <div>
            <NameTable
                expenses={filteredExpenses}
            />
            {children} {/* Close button */}
        </div>
    );
}