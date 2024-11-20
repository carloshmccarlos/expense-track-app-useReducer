import './App.css';
import { useState, useReducer } from "react";
import { categories, initialExpenses } from "../public/data.js";

// Utility button component
function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className="button">{children}</button>
    );
}

// Utility component for clickable list items
function ListOnClick({ onClick, className, children }) {
    return (
        <li onClick={onClick} className={className}>
            {children}
        </li>
    );
}

// Renders the list of expense names, highlighting the selected item
function NameTable({ expenses, dispatch, selectedItem, children }) {
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

// Renders detailed information about the selected expense
function Detail({ selectedItem, children }) {
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

// Renders a summary of total expenses by category and allows category filtering
function CountByCategory({ expenses, categories, dispatch, selectedItem, words }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleClose = () => setSelectedCategory(null);

    return (
        <div>
            <p className="SectionTitle">{selectedCategory ? words.nameByCategory : words.countByCategory}</p>
            {!selectedCategory ? (
                <ul className="CountByCategory">
                    {categories.map(category => (
                        <ListOnClick
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="Item"
                        >
                            {category}: {expenses
                            .filter(expense => expense.category === category)
                            .reduce((sum, expense) => sum + expense.amount, 0)}$
                        </ListOnClick>
                    ))}
                </ul>
            ) : (
                <FilterByCategory
                    selectedCategory={selectedCategory}
                    expenses={expenses}
                    dispatch={dispatch}
                    selectedItem={selectedItem}
                >
                    <Button onClick={handleClose}>{words.close}</Button>
                </FilterByCategory>
            )}
        </div>
    );
}

// Shows a list of expenses filtered by the selected category
function FilterByCategory({ dispatch, selectedCategory, expenses, children, selectedItem }) {
    const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);

    return (
        <div>
            <NameTable
                dispatch={dispatch}
                expenses={filteredExpenses}
                selectedItem={selectedItem}
            />
            {children} {/* Close button */}
        </div>
    );
}

// Form component to add a new expense with name, amount, and category inputs
function AddForm({ categories, dispatch, nextId, children, words }) {
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

// Form component to update details of an existing expense
function UpdateForm({ selectedItem, dispatch, children, words }) {
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

// Dropdown for selecting the app's language
function LanguageChoice({ onSetLanguage, language }) {
    return (
        <select
            className={'language-choice'}
            onChange={e => onSetLanguage(e.target.value)}
            value={language}
        >
            <option value="english">English</option>
            <option value="chinese">中文</option>
        </select>
    );
}

// Text dictionary for multilingual support
const localeWords = {
    english: {
        name: 'Name',
        detail: 'Detail',
        countByCategory: 'CountByCategory',
        nameByCategory: 'NameByCategory',
        add: 'Add',
        update: 'Update',
        delete: 'Delete',
        close: 'Close',
        cancel: 'Cancel',
    },
    chinese: {
        name: "名称",
        detail: "详情",
        countByCategory: "按类别统计",
        nameByCategory: '按类别分类',
        add: "添加",
        update: "更新",
        delete: "删除",
        close: "关闭",
        cancel: "取消"
    }
};

const initialData = {
    expenses: initialExpenses,
    selectedItem: initialExpenses[0],
    view: 'detail',
    nextId: initialExpenses.length + 1,
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



// Main app component
function App() {
    const [{ expenses, selectedItem, view, nextId }, dispatch] = useReducer(reducer, initialData);
    const [language, setLanguage] = useState('english');
    const words = localeWords[language];

    return (
        <div className="App">
            <LanguageChoice language={language} onSetLanguage={setLanguage} />
            <div className="MainTableContainer">
                <NameTable
                    selectedItem={selectedItem}
                    expenses={expenses}
                    dispatch={dispatch}
                >
                    <p className="SectionTitle">{words.name}</p>
                </NameTable>
                <Button onClick={() => dispatch({type: view === 'add' ? 'viewDetail' : 'viewAdd'})}>
                    {view === 'add' ? words.close : words.add}
                </Button>
            </div>

            <div className="DetailContainer">
                {view === 'detail' && selectedItem && (
                    <Detail key={selectedItem} selectedItem={selectedItem}>
                        <p className="SectionTitle">{words.detail}</p>
                        <Button onClick={() => dispatch({type: 'viewUpdate'})}>{words.update}</Button>
                        <Button onClick={() => dispatch({type: 'delete'})}>{words.delete}</Button>
                    </Detail>
                )}
                {view === 'add' && (
                    <AddForm
                        words={words}
                        categories={categories}
                        dispatch={dispatch}
                        nextId={nextId}
                    >
                        <Button>{words.add}</Button>
                    </AddForm>
                )}
                {view === 'update' && selectedItem && (
                    <UpdateForm
                        key={selectedItem.id}
                        words={words}
                        selectedItem={selectedItem}
                        dispatch={dispatch}
                    >
                        <Button>{words.update}</Button>
                        <Button onClick={() => dispatch({type: 'viewDetail'})}>{words.cancel}</Button>
                    </UpdateForm>
                )}
            </div>

            <div className="CountByCategoryContainer">
                <CountByCategory
                    dispatch={dispatch}
                    expenses={expenses}
                    categories={categories}
                    selectedItem={selectedItem}
                    words={words}
                />
            </div>
        </div>
    );
}

export default App;
