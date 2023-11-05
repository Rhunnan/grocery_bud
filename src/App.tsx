import React, { useState, useEffect } from 'react';
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
          {/* <List items={list} removeItem={removeItem} editItem={editItem} /> still planning to make this component*/} 
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
