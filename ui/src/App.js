import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputTitle = useRef(null);
  const inputInfo = useRef(null);

  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes', {
        withCredentials: false
      }).then(r => {
        console.log(r.data);
        setNotes(r.data);
      });
  }, [isUpdate]);

  const addNote = () => {
    axios.post('http://localhost:9090/api/note/add',
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value,
    },
    {
      withCredentials: false
    }
    ).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const deleteNote = (id) => {
    axios.delete(`http://localhost:9090/api/note/${id}`,
    {
      withCredentials: false
    }
    ).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  return (
    <div className="App">
      <div className="Box">
      <div>
        <label className="Label">Заголовок</label>
        <input className="Input" ref={inputTitle} type="text"/>
      </div>
      <div>
        <label className="Label">Описание</label>
        <input className="Input" ref={inputInfo} type="text"/>
      </div>
    </div>
      <button className="Button" onClick={() => addNote()}>Добавить</button>
    
    <div className="Flex">
    {!!notes && notes.map((note, index) => (
      
        <div className="Card">
          <div className="Title" key={'note_' + index}>{note.title}</div>
          <div className="Info" key={'note_' + index}>{note.info}</div>
          <button className="Button" onClick={() => deleteNote(note.id
            )}>УДАЛИТЬ</button>
        </div>
    ))}
    </div>

    </div>
  );
}

export default App;
