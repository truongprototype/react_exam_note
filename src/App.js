import './App.css';
import {useRef, useState} from "react";
import Item from "./Item";

function App() {
    const sampleData = [{id: -1, text: 'Note 1'}, {id: -2, text: 'Note 2'}, {id: -3, text: 'Note 3'}];
    const [listOfNotes, setListOfNotes] = useState(sampleData);
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
        inputValue.current.value = '';
        inputValue.current.focus();
    }

    const deleteNote = (id) => {
        const newList = listOfNotes.filter(item => {
            return item.id !== id;
        });
        setListOfNotes(newList);
    }

    const saveNoteEdit = (id, newText) => {
        const newList = listOfNotes.map(item => {
            if (item.id === id) {
                item.text = newText;
            }
            return item;
        });
        setListOfNotes(newList);
    }

    const inputKeyUp = (event) => {
        if (event.keyCode === 13) {
            addNewNote();
        }
    }

    const renderList = listOfNotes.map((item) => {
        return <Item
            key={item.id}
            id={item.id}
            text={item.text}
            delete={() => deleteNote(item.id)}
            save={saveNoteEdit}
        />
    });

    return (
        <div className="App">
            <div className={'userPanel'}>
                <input className={'userInput'} type={'text'} ref={inputValue} onKeyUp={inputKeyUp}/>
                <button onClick={addNewNote}>Add</button>
            </div>
            {renderList}
        </div>
    );
}

export default App;
