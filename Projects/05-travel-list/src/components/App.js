import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((itemArray) => [...itemArray, item]);
    }

    function handleDeleteItem(id) {
        setItems((itemArray) => itemArray.filter( (item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((itemArray) => itemArray.map( (item) => item.id === id ? {...item, packed: !item.packed} : item));
    }

    function handleClearItems() {
        const confirmMessage = window.confirm("Are you sure you want to delete all items?");
        if (confirmMessage) setItems([]);
    }

  return (
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems}/>
        <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
        <Stats items={items}/>
      </div>
  );
}

