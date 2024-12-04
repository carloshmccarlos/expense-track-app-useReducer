import {useExpenseContext} from "../contexts/ExpenseContext.jsx";

export function Detail({ children }) {
    const { selectedItem } = useExpenseContext();

    return (
        <div className="Detail">
            {children[0]} {/* Header (e.g., title) */}
            <ul>
                {Object.entries(selectedItem).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                ))}
            </ul>
            {children[1]} {/* Update button */}
            {children[2]} {/* Delete button */}
        </div>
    );
}