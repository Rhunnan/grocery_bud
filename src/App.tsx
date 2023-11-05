import React, { useState, useEffect } from 'react';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


interface ListItem {
  id: string;
  title: string;
}

const getLocalStorage = (): ListItem[] => {
  const list = localStorage.getItem('list');
  if (list !== null) {
    return JSON.parse(list) as ListItem[];
  } else {
    return [];
  }
};



function App() {
 

  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ListItem[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<string | null>(null);
  
  const notifyEmpty = () => toast.warning("Please Enter a Value");
  const notifyAdded = () => toast.success("Successfuly Added");
  const notifyEditSucc = () => toast.success("Successfuly Edited");
  const notifyRemove = () => toast.warning("Successfuly Remove Item");





  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name) {
      notifyEmpty();
    } else if (name && isEditing) {
      setList((prevList) =>
        prevList.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      notifyEditSucc();
    } else {
      notifyAdded();
      const newItem: ListItem = { id: new Date().getTime().toString(), title: name };
      setList((prevList) => [...prevList, newItem]);
      setName('');
    }
  };

 

  const clearList = (): void => {
 setList([]);
  };

  const removeItem = (id: string): void => {
    notifyRemove();
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  


  

  const editItem = (id: string): void => {
    const specificItem = list.find((item) => item.id === id);

    if (specificItem) {
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title);
    }

  };
  

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>

        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
          <ToastContainer/>

        </div>
      )}
    </section>
  );
}

export default App;
