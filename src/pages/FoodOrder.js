import { useState, useEffect } from "react";

function DisplayAddedItem({ item, handleRemove }) {
  //calling the passed function to handle state in the parent component which manages the items
  function handleRemoveLocal(e) {
    //console.log(e);
    handleRemove(item);
  }

  return (
    <li>
      <span>
        {item.description} {item.quantity}
      </span>
      <button onClick={handleRemoveLocal}>X</button>
    </li>
  );
}

function ListAddedItems({ items, handleRemove }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <DisplayAddedItem
            item={item}
            key={item.id}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  );
}

export default function FoodOrder() {
  //Controlled elements in React are form elements (e.g., <input>, <textarea>, <select>) where React state controls the element's value.
  //The value of the element is determined by React's state or props, not the DOM.
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedItemMsg, setAddedItemMsg] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  //benefits of using a form submit instead of just a button event:
  //Automatically handles the "Enter" key to trigger submission, A <form> is the semantic HTML element for data submission.
  //It improves accessibility and indicates intent to the browser.
  function handleSubmit(e) {
    e.preventDefault(); //Stops a form submission from reloading the page.
    if (!description) return;
    const newItem = {
      description,
      quantity,
      id: Date.now(),
    };
    //console.log(newItem);
    handleAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleAddItem(newItem) {
    setAddedItemMsg(
      `The item ${newItem.description} has been added with a quantity of ${newItem.quantity}`
    );
    //in react we are not allowed to mutate state, React relies on immutable state to track changes efficiently.
    //React is all about immutability, never do this for state: setAddedItems(currentItems => currentItems.push(newItem));
    //Instead return a new Array and use spread.
    setAddedItems((currentItems) => [...currentItems, newItem]);
  }

  function handleRemove(itemToRemove) {
    setAddedItems((currentItems) =>
      currentItems.filter((item) => item !== itemToRemove)
    );
  }

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you want to order?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          //Controlled elements in React are form elements (e.g., <input>, <textarea>, <select>) where React state controls the element's value.
          //The value of the element is determined by React's state or props, not the DOM.
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <button>ADD</button>
      </form>
      <div>{addedItemMsg}</div>
      <div>
        <ListAddedItems items={addedItems} handleRemove={handleRemove} />
      </div>
    </div>
  );
}
