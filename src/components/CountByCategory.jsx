import {useState} from "react";
import {useExpenseContext} from "../contexts/ExpenseContext.jsx";
import {ListOnClick} from "./ListOnClick.jsx";
import {FilterByCategory} from "./FilterByCategory.jsx";
import {Button} from "./Button.jsx";

export function CountByCategory({ words }) {
    const { expenses, categories } = useExpenseContext();

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
                <FilterByCategory selectedCategory={selectedCategory} >
                    <Button onClick={handleClose}>{words.close}</Button>
                </FilterByCategory>
            )}
        </div>
    );
}