import {useEffect} from "react";

const Recycle = (props) => {
    useEffect(() => {
        console.log('Trash rerender')
    });

    return (
        <>
            <input
                type='checkbox'
                defaultChecked={props.isCountEdit}
                onClick={props.changeCheckbox}
            /> Check edit as well.
            <div>Delete count: {props.count}</div>
        </>
    );
}

export default Recycle;