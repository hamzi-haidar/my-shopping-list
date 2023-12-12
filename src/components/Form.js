import { useState } from "react";

export default function Form({ user, onSetItems }) {
  const [quantity, setQuantity] = useState(1);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const userFirstName = user.split(" ")[0];

  const userLastName =
    user.split(" ").length >= 2 ? user.split(" ").slice(-1)[0] : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!itemName || !price) return;
    const newItem = {
      id: Date.now(),
      itemName,
      price,
      quantity,
    };

    onSetItems(newItem);

    setQuantity(1);
    setItemName("");
    setPrice("");
  }

  return (
    <div className="form-container">
      <h2>
        Hello{" "}
        <span>
          {userFirstName.slice(0, 1).toUpperCase() +
            userFirstName.slice(1).toLowerCase()}{" "}
          {userLastName.slice(0, 1).toUpperCase() +
            userLastName.slice(1).toLowerCase()}
        </span>{" "}
        please add an item here
      </h2>

      <form className="form" onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        ></input>

        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <button>Add</button>
      </form>
    </div>
  );
}
