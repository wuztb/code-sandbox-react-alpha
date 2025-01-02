import { useState, useEffect } from "react";

function DisplayAddedItem({ item, onDeleteItem, onToggleItem }) {
  //calling the passed function to handle state in the parent component which manages the items
  //lifting up state to parent component
  /*
  function onDeleteItemLocal() {
    onDeleteItem(item);
  }
  */
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span>
        {item.description} {item.quantity}
      </span>
      {/* would not work because would only pass the event as an argument, 
      we need to pass the item <button onClick={onDeleteItem}>X</button> */}
      {/* would not work if we need more local logic 
      we need to pass the item <button onClick={onDeleteItemLocal}>X</button> */}
      <button onClick={() => onDeleteItem(item)}>X</button>
    </li>
  );
}

function ListAddedItems({ items, onDeleteItem, onToggleItem }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <DisplayAddedItem
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
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
  const numItem = addedItems.length; //state can be dervided. Never use state variables for stated that can be calculated or derived to avoud complexit and re-renders.

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

  function handleDelteItem(itemToDelete) {
    setAddedItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemToDelete.id)
    );
  }

  function handleToggleItem(id) {
    setAddedItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
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
        <ListAddedItems
          items={addedItems}
          onDeleteItem={handleDelteItem}
          onToggleItem={handleToggleItem}
        />
      </div>
    </div>
  );
}
