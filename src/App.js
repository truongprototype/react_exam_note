import './App.css';
import {useRef, useState} from "react";
import Item from "./Item";

function App() {
    const [listOfNotes, setListOfNotes] = useState([]);
    const inputValue = useRef();
    const increasedId = useRef(0);

    const addNewNote = () => {
        const inputText = inputValue.current.value;
        setListOfNotes([
            ...listOfNotes,
            {
                id: increasedId.current,
                text: inputText
            }
        ]);
        increasedId.current++;
    }

    const deleteNote = (id) => {
        const newList = listOfNotes.filter(item => {
            return item.id !== id;
        });
        setListOfNotes(newList);
    }

    const renderList = listOfNotes.map((item) => {
        return <Item
            key={item.id}
            id={item.id}
            text={item.text}
            delete={() => deleteNote(item.id)}
        />
    });

    return (
        <div className="App">
            <div className={'userPanel'}>
                <input type={'text'} ref={inputValue}/>
                <button onClick={addNewNote}>Add</button>
            </div>
            {renderList}
        </div>
    );
}

export default App;
