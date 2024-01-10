import { useRef } from "react";
import ListItem from "./ListItem";

// export default function ShoppingList({ items, onSetItems, sort }) {
//   let sortedItems;
//   if (sort === "input") sortedItems = items.slice();
//   if (sort === "highToLow")
//     sortedItems = items
//       .slice()
//       .sort((a, b) => b.price * b.quantity - a.price * a.quantity);
//   if (sort === "lowToHigh")
//     sortedItems = items
//       .slice()
//       .sort((a, b) => a.price * a.quantity - b.price * b.quantity);

//   return (
//     <div className="list-container">
//       <ul className="list">
//         {sortedItems.map((item) => (
//           <ListItem key={item.id} item={item} onSetItems={onSetItems} />
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function ShoppingList({
  lists,
  onDeleteItem,
  currentList,
  setCurrentList,
  translateValue,
  setTranslateValue,
  translatex,
  addedItem,
}) {
  const listsNeeded = lists.length;

  function handlePrevious() {
    if (currentList !== 1) {
      setCurrentList((cur) => cur - 1);
      setTranslateValue((translateValue) => translateValue + translatex);
    }
  }

  function handleNext() {
    if (currentList < listsNeeded && lists.length > 0) {
      setCurrentList((cur) => cur + 1);

      setTranslateValue((translateValue) => translateValue - translatex);
    }
  }

  return (
    <div className="list-container">
      <div className="details-title">
        <h3>Quantity</h3>
        <h3>Item name</h3>
        <h3>Total price</h3>
        <h3>Input date</h3>
      </div>
      <div
        className="lists"
        style={{
          transform: `translateX(${translateValue}rem)`,
          transition: "all 0.3s",
        }}
      >
        {lists.map((list, i) => (
          <List
            key={i}
            list={list}
            onDeleteItem={onDeleteItem}
            index={i}
            addedItem={addedItem}
          />
        ))}
      </div>

      {listsNeeded > 1 && (
        <ButtonContainer>
          <Button onClick={handlePrevious}>◂</Button>(
          <span>
            Page {currentList} of {listsNeeded}
          </span>
          )<Button onClick={handleNext}>▸</Button>
        </ButtonContainer>
      )}
    </div>
  );
}

function List({ list, onDeleteItem, addedItem }) {
  return (
    <ul className="list">
      {list.map((item, i) => (
        <ListItem
          key={i}
          item={item}
          onDeleteItem={onDeleteItem}
          addedItem={addedItem}
        />
      ))}
    </ul>
  );
}

function ButtonContainer({ children }) {
  return <div className="button-container">{children}</div>;
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
