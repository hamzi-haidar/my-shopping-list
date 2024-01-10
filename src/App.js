import { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import LogInWindow from "./components/LogInWindow";
import Form from "./components/Form";
import ShoppingList from "./components/ShoppingList";
import TotalAndBalance from "./components/TotalAndBalance";
import Footer from "./components/Footer";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const listLength = 4;
  const [isLoggedIN, setIsLoggedIN] = useState(false);
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [sort, setSort] = useState("default");
  const [closed, setClosed] = useState(true);
  const [currentList, setCurrentList] = useState(1);
  const [translateValue, setTranslateValue] = useState(0);
  const [items, setItems] = useLocalStorageState([], "items");
  const [isAdded, setIsAdded] = useState(false);

  let sortedItems;
  if (sort === "default") sortedItems = items.slice();
  if (sort === "input") sortedItems = items.slice().reverse();
  if (sort === "highToLow")
    sortedItems = items
      .slice()
      .sort((a, b) => b.price * b.quantity - a.price * a.quantity);
  if (sort === "lowToHigh")
    sortedItems = items
      .slice()
      .sort((a, b) => a.price * a.quantity - b.price * b.quantity);

  const lists = [];
  for (let i = 0; i < sortedItems.length; i += listLength) {
    lists.push(sortedItems.slice(i, i + listLength));
  }

  const translatex = 142;
  const addedItem = items[items.length - 1];
  const id = addedItem?.id;
  const addedlist = lists.filter((list) => list.includes(addedItem));
  const index = lists.indexOf(...addedlist);

  const total =
    items.length > 0 &&
    items.reduce((acc, item) => acc + Number(item.price * item.quantity), 0);

  function handleLogIn(e) {
    e.preventDefault();
    if (!user || !balance) return;
    setIsLoggedIN(true);
  }

  function handleSetItems(item) {
    setIsAdded(true);
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setIsAdded(false);
    setItems((items) => items.filter((item) => item.id !== id));
    if (currentList !== 1 && lists[currentList - 1].length === 1) {
      setTranslateValue((translateValue) => translateValue + translatex);
      setCurrentList((cur) => cur - 1);
    }
  }

  function handleClearList() {
    setItems([]);
    setTranslateValue(0);
    setCurrentList(1);
  }
  function handleSetSort(e) {
    setIsAdded(false);
    setSort(e.target.value);
  }
  function handleclosed() {
    setClosed(!closed);
  }

  useEffect(
    function () {
      if (isAdded) {
        setTranslateValue(index * -translatex);
        setCurrentList(index + 1);
      }
    },
    [index, items, isAdded]
  );

  useEffect(
    function () {
      const el = document.getElementById(id);
      if (el && isAdded) {
        el.classList.remove("show-item");
        el.classList.add("hide-item");
        setTimeout(() => {
          el.classList.remove("hide-item");
          el.classList.add("show-item");
        }, 50);
      }
    },
    [id, isAdded]
  );

  return (
    <div className="app">
      <div className="header">
        <h1>MY SHOPPING LIST</h1>
      </div>
      {!isLoggedIN && (
        <LogIn>
          <LogInWindow
            onLogIn={handleLogIn}
            user={user}
            balance={balance}
            setUser={setUser}
            setBalance={setBalance}
          />
        </LogIn>
      )}

      {isLoggedIN && (
        <div className={`user-page ${closed ? "closed" : ""}`}>
          <Form user={user} onSetItems={handleSetItems} items={items} />

          <ShoppingList
            lists={lists}
            onDeleteItem={handleDeleteItem}
            currentList={currentList}
            setCurrentList={setCurrentList}
            translateValue={translateValue}
            setTranslateValue={setTranslateValue}
            translatex={translatex}
            addedItem={addedItem}
          />

          <TotalAndBalance
            balance={balance}
            total={total}
            onSetClosed={handleclosed}
          />
          <Footer
            onClearList={handleClearList}
            onSetSort={handleSetSort}
            sort={sort}
          />
        </div>
      )}
    </div>
  );
}
