import {useState} from "react";
import {useExpenseContext} from "../contexts/ExpenseContext.jsx";

export function AddForm({ children, words }) {
    const { categories, dispatch, nextId } = useExpenseContext();

    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newCategory, setNewCategory] = useState('Food');

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName || !newAmount) return;

        const newExpense = {
            id: nextId,
            name: newName,
            amount: Number(newAmount),
            category: newCategory,
        };

        dispatch({type: 'add', payload: newExpense});
    }

    return (
        <div>
            <p className="SectionTitle">{words.add}</p>
            <form onSubmit={handleSubmit} className="AddForm">
                <div>
                    <label>Name</label>
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="Input" />
                </div>
                <div>
                    <label>Amount</label>
                    <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} className="Input" />
                </div>
                <div>
                    <label>Category</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="Input">
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                {children} {/* Add button */}
            </form>
        </div>
    );
}