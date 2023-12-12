export default function ListItem({ item, onSetItems }) {
  return (
    <li>
      <div className="list-item">
        <p>
          <span>{item.quantity}</span> {item.itemName}: $
          {item.price * item.quantity}
        </p>
        <button onClick={() => onSetItems(item)}>×</button>
      </div>
    </li>
  );
}
