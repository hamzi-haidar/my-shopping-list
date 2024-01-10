export default function ListItem({ item, onDeleteItem, addedItem }) {
  return (
    <li id={item.id}>
      <div className="list-item">
        <div className="item-detail">
          <span>{item.quantity}</span>
          <p>{item.itemName}</p>
          <p>$ {item.price * item.quantity}</p>
        </div>
        <p className="item-date">
          {new Date(item.id).toLocaleDateString()}
          {" - "}
          {new Date(item.id).toLocaleTimeString()}
        </p>
        <button className="item-btn" onClick={() => onDeleteItem(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}
