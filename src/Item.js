function Item(props) {
    return <div className={'item'} id={props.id}>
        <span>{props.text}</span>
        <button onClick={props.delete}>Delete</button>
    </div>
}

export default Item;