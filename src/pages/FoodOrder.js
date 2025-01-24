import { useState, useEffect } from "react";

function Stats({ items }) {
  //if there are no items return a message.
  if (!items.length) return <div>You need to add items.</div>;
  //if there are items continue with the logic below.
  //state can be dervided. Never use state variables for stated that can be calculated or derived to avoud complexit and re-renders.
  const numItems = items.length;
  const numChecked = items.filter((item) => item.checked).length;
  const percentage = Math.round((numChecked / numItems) * 100);
  return (
    <div>
      You have {numItems} items and checked {numChecked} ({percentage}%).
    </div>
  );
}

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

function AdditionalInfo({ children }) {
  return <p>{children}</p>;
}

export default function FoodOrder() {
  //Controlled elements in React are form elements (e.g., <input>, <textarea>, <select>) where React state controls the element's value.
  //The value of the element is determined by React's state or props, not the DOM.
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedItemMsg, setAddedItemMsg] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [sortBy, setSortBy] = useState("input"); //by default sorted in the sequence they were input, could also be description.
  const [showAddInfo, setShowAddInfo] = useState(false);

  let sortedItems;
  if (sortBy === "input") sortedItems = addedItems;
  //sort is mutating the array so we need slice to first copy it.
  if (sortBy === "description")
    sortedItems = addedItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "checked")
    sortedItems = addedItems
      .slice()
      .sort((a, b) => Number(a.checked) - Number(b.checked));

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setAddedItems([]);
  }

  /* (x) => !x: This is an anonymous function that takes the current value of showAddInfo (represented by x) and returns its negation.
  When you call setShowAddInfo((x) => !x), React will update the showAddInfo state to its opposite value:  */
  function handleShowAddInfo() {
    setShowAddInfo((x) => !x);
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
      <div style={{ display: "grid", placeItems: "center" }}>
        <ListAddedItems
          items={sortedItems}
          onDeleteItem={handleDelteItem}
          onToggleItem={handleToggleItem}
        />
      </div>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="checked">Sort by checked status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
      <Stats items={addedItems} />
      <div>
        <button onClick={handleShowAddInfo}>
          {showAddInfo ? "Hide add info" : "show add info"}
        </button>
        {showAddInfo && (
          <AdditionalInfo>This is additional info</AdditionalInfo>
        )}
      </div>
    </div>
  );
}
