import ListItem from "./ListItem";

export default function ShoppingList({ items, onSetItems, sort }) {
  let sortedItems;
  if (sort === "input") sortedItems = items.slice();
  if (sort === "highToLow")
    sortedItems = items
      .slice()
      .sort((a, b) => b.price * b.quantity - a.price * a.quantity);
  if (sort === "lowToHigh")
    sortedItems = items
      .slice()
      .sort((a, b) => a.price * a.quantity - b.price * b.quantity);

  return (
    <div className="list-container">
      <ul className="list">
        {sortedItems.map((item) => (
          <ListItem key={item.id} item={item} onSetItems={onSetItems} />
        ))}
      </ul>
    </div>
  );
}
