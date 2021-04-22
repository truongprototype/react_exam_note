import './App.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Item from "./components/Item";
import Recycle from "./components/Recycle";

function App() {
    const sampleData = [{id: -1, text: 'Note 1'}, {id: -2, text: 'Note 2'}, {id: -3, text: 'Note 3'}];
    const [listOfNotes, setListOfNotes] = useState(sampleData);
    const inputValue = useRef();
    const increasedId = useRef(0);
    const [countItem, setCountItem] = useState(0);
    const [isCountEdit, setIsCountEdit] = useState(false);
    const [isShowList, setIsShowList] = useState(true);

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
        setCountItem(countItem + 1);
    }

    const saveNoteEdit = (id, newText) => {
        const newList = listOfNotes.map(item => {
            if (item.id === id) {
                item.text = newText;
            }
            return item;
        });
        setListOfNotes(newList);
        if (isCountEdit) {
            setCountItem(countItem + 1);
        }
    }

    const inputKeyUp = (event) => {
        if (event.keyCode === 13) {
            addNewNote();
        }
    }

    const changeCheckbox = useCallback(() => {
        setIsCountEdit(!isCountEdit);
    }, [isCountEdit]);

    const renderList = listOfNotes.map((item) => {
        return <Item
            key={item.id}
            id={item.id}
            text={item.text}
            delete={() => deleteNote(item.id)}
            save={saveNoteEdit}
        />
    });

    const recycle = useMemo(() => <Recycle
        isCountEdit={isCountEdit}
        count={countItem}
        changeCheckbox={changeCheckbox}
    />, [isCountEdit, countItem, changeCheckbox]);

    return (
        <div className="App">
            {recycle}
            <div className={'userPanel'}>
                <input className={'userInput'} type={'text'} ref={inputValue} onKeyUp={inputKeyUp}/>
                <button onClick={addNewNote}>Add</button>
            </div>
            <button onClick={() => setIsShowList(!isShowList)} >Toggle list</button>
            {isShowList
                ? <>{renderList}</>
                : null
            }

        </div>
    );
}

export default App;
