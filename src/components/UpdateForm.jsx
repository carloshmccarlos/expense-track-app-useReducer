import {useState} from "react";
import {useExpenseContext} from "../contexts/ExpenseContext.jsx";

export function UpdateForm({ children, words }) {
    const { selectedItem, dispatch, categories } = useExpenseContext();

    const [name, setName] = useState(selectedItem.name);
    const [amount, setAmount] = useState(selectedItem.amount);
    const [category, setCategory] = useState(selectedItem.category);

    function handleSubmit(e) {
        e.preventDefault();
        const updatedExpense = {
            ...selectedItem,
            name,
            amount: Number(amount),
            category,
        };

        dispatch({type: 'update', payload: updatedExpense});
    }

    return (
        <div>
            <p className="SectionTitle">{words.update}</p>
            <form onSubmit={handleSubmit} className="AddForm">
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="Input" />
                </div>
                <div>
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="Input" />
                </div>
                <div>
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="Input">
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {children} {/* Update and Cancel buttons */}
            </form>
        </div>
    );
}