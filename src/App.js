import { useState } from "react";
import LogIn from "./components/LogIn";
import Form from "./components/Form";
import ShoppingList from "./components/ShoppingList";
import TotalAndBalance from "./components/TotalAndBalance";
import Footer from "./components/Footer";

export default function App() {
  const [isLoggedIN, setIsLoggedIN] = useState(false);
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("input");
  const [closed, setClosed] = useState(true);

  const total =
    items.length > 0 &&
    items.reduce((acc, item) => acc + Number(item.price * item.quantity), 0);

  function handleLogIn(e) {
    e.preventDefault();
    if (!user || !balance) return;
    setIsLoggedIN(true);
  }

  function handleSetItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeletItem(item) {
    setItems((items) => items.filter((el) => (item.id === el.id ? "" : item)));
  }

  function handleClearList() {
    setItems([]);
  }
  function handleSetSort(e) {
    setSort(e.target.value);
  }
  function handleclosed() {
    setClosed(!closed);
  }

  return (
    <div className="app">
      <div className="header">
        <h1>MY SHOPPING LIST</h1>
      </div>
      {!isLoggedIN && (
        <LogIn
          onLogIn={handleLogIn}
          user={user}
          balance={balance}
          setUser={setUser}
          setBalance={setBalance}
        />
      )}

      {isLoggedIN && (
        <div className={`user-page ${closed ? "closed" : ""}`}>
          <Form user={user} onSetItems={handleSetItems} />

          <ShoppingList
            items={items}
            onSetItems={handleDeletItem}
            sort={sort}
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
