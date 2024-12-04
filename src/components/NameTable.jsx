import {useExpenseContext} from "../contexts/ExpenseContext.jsx";
import {ListOnClick} from "./ListOnClick.jsx";

export function NameTable({ children, expenses }) {
    const { selectedItem, dispatch } = useExpenseContext();

    return (
        <div>
            {children}
            <ul className="MainTable">
                {expenses.map(expense => (
                    <ListOnClick
                        key={expense.id}
                        onClick={() => dispatch({type: 'select', payload: expense})}
                        className={`Item ${selectedItem?.id === expense.id ? 'selected' : ''}`}
                    >
                        {expense.id} : {expense.name}
                    </ListOnClick>
                ))}
            </ul>
        </div>
    );
}