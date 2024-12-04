import './App.css';
import { useState } from "react";
import {localeWords} from "../data/localeWords.js";
import {LanguageChoice} from "./components/LanguageChoice.jsx";
import {NameTable} from "./components/NameTable.jsx";
import {Button} from "./components/Button.jsx";
import {useExpenseContext} from "./contexts/ExpenseContext.jsx";
import {Detail} from "./components/Detail.jsx";
import {AddForm} from "./components/AddForm.jsx";
import {UpdateForm} from "./components/UpdateForm.jsx";
import {CountByCategory} from "./components/CountByCategory.jsx";

// Main app component
function App() {
    const { expenses, selectedItem, view, dispatch } = useExpenseContext();

    const [language, setLanguage] = useState('english');
    const words = localeWords[language];

    return (
        <div className="App">
            <LanguageChoice language={language} onSetLanguage={setLanguage} />
            <div className="MainTableContainer">
                <NameTable expenses={expenses}>
                    <p className="SectionTitle">{words.name}</p>
                </NameTable>
                <Button onClick={() => dispatch({type: view === 'add' ? 'viewDetail' : 'viewAdd'})}>
                    {view === 'add' ? words.close : words.add}
                </Button>
            </div>

            <div className="DetailContainer">
                {view === 'detail' && selectedItem && (
                    <Detail words={words} key={selectedItem}>
                        <p className="SectionTitle">{words.detail}</p>
                        <Button onClick={() => dispatch({type: 'viewUpdate'})}>{words.update}</Button>
                        <Button onClick={() => dispatch({type: 'delete'})}>{words.delete}</Button>
                    </Detail>
                )}
                {view === 'add' && (
                    <AddForm words={words}>
                        <Button>{words.add}</Button>
                    </AddForm>
                )}
                {view === 'update' && selectedItem && (
                    <UpdateForm words={words} key={selectedItem}>
                        <Button>{words.update}</Button>
                        <Button onClick={() => dispatch({type: 'viewDetail'})}>{words.cancel}</Button>
                    </UpdateForm>
                )}
            </div>

            <div className="CountByCategoryContainer">
                <CountByCategory words={words}/>
            </div>
        </div>
    );
}

export default App;
