import React, {useState, useEffect} from 'react';

import {db} from './firebase';
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore';

import './App.css';
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 sm:mt-0 bg-purple-500 text-slate-100`,
  count: `text-center p-2`

}

function App() {

  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');

  // create todo 

  const createTodo = async (e) => {
    e.preventDefault()

    if(input === "") {
      alert('Please enter a valid todo')

      return


    }

    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })

    setInput('')


  };

  const createTodo1 = async (e) => {
    e.preventDefault()

    if(input === "") {
      alert('Please enter a valid todo')

      return


    }

    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      time_meditated: 0,
      uid: "null",

    })

    setInput('')


  };

  const addTime = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      time_meditated: 3,
      uid: "test",

    })
    

  }



  // read todo from firebase

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
  return () => unsubscribe()

  }, [])


  // update todo in firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })

  }

  const toggleComplete1 = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      time_meditated: todo.time_meditated + 3,
    })

  }


  return (
    <div className={style.bg}>

      <div className={style.container}>
        <h3 className={style.heading}>Tsting Ver: Meditation - Todo Conversion </h3>

        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete1}/>

          ))}
        </ul>

        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p> }
        

      </div>


    </div>
  );
}

export default App;
