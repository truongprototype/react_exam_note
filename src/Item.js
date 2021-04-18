import {useRef, useState} from "react";

function Item(props) {
    const [editState, setEditState] = useState(false);
    const inputEdit = useRef(null);

    const edit = async () => {
        await setEditState(true);
        inputEdit.current.focus();
    }

    const cancel = () => {
        setEditState(false);
    }

    const save = () => {
        props.save(props.id, inputEdit.current.value);
        setEditState(false);
    }

    const inputKeyUp = (event) => {
        if (event.keyCode === 13) {
            save();
        }
    }

    return (
        <div className={'item'} id={props.id}>
            {editState
                ? <input type={'text'} ref={inputEdit} defaultValue={props.text} onKeyUp={inputKeyUp} />
                : <span>{props.text}</span>
            }

            <div className={'action'}>
                {editState ? (
                    <>
                        <button onClick={save}>Save</button>
                        <button onClick={cancel}>Cancel</button>
                    </>
                )
                    : <button onClick={edit}>Edit</button>
                }
                <button onClick={props.delete}>Delete</button>
            </div>
        </div>
    );
}

export default Item;