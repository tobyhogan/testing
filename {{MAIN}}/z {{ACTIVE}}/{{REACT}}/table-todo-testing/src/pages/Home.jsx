import React, { useState, useEffect, useRef } from 'react';
import supabase from "../../supabaseClient";

import AppContext from '../appContext';

import '../App.css'

import DataTable from '../components/Table';



function Home() {

  const [fetchError, setFetchError] = useState(null);

  const [todos, setTodos] = useState(null);

  const [todoLogs, setTodoLogs] = useState(null);

  const [input, setInput] = useState("");

  const [listUpdated, setListUpdated] = useState(0);

  const [session, setSession] = useState(null);



  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

    });

  }, [])






  async function addTodo() {

    var inputFormatted = input;



    const { data, error } = await supabase
      .from('todos')
      .insert({ title: inputFormatted})
      .select()


    const { error1 } = await supabase
    .from('todo-completions')
    .insert({ id: data[0].id})

    setListUpdated(listUpdated + 1);



  }

  async function toggleTodo(todo) {



      if (todo.is_completed) {
        const { error } = await supabase
          .from('todos')        
          .update({ is_completed: 'FALSE' })
          .eq('id', todo.id)

      } else if (!todo.is_completed) {

        const { error } = await supabase
          .from('todos')    
          .update({ is_completed: 'TRUE' })
          .eq('id', todo.id) 

      }


  }

  async function deleteTodo(id) {

    console.log("delete todo func")

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    const { error1 } = await supabase
    .from('todo-completions')
    .delete()
    .eq('id', id)

    setListUpdated(listUpdated + 1)

  }




  useEffect(() => {


    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select()

        

        if (error) {
          setFetchError('Could not fetch todos')
          setTodos(null)
          console.log(error)

        }
        if (data) {
          setTodos(data)
          setFetchError(null)
        
        }
    }


      fetchTodos()


  }, [listUpdated])



  

  useEffect(() => {
    const fetchTodoLogs = async () => {
      const { data, error } = await supabase
        .from('todo-completions')
        .select()

        if (error) {
          setFetchError('Could not fetch todo log')
          setTodoLogs(null)
          console.log(error)

        }
        if (data) {
          setTodoLogs(data)
          setFetchError(null)
        }


    }

    fetchTodoLogs()

  }, [listUpdated])

  function RenderTable() {

    if (todos && todoLogs) {

      try {

        return (
          <DataTable todos={todos} todoLogs={todoLogs} deleteTodo={deleteTodo} toggleTodo={toggleTodo}></DataTable>
        )        

      } catch (error) {

        console.log("11 could not render table, data not available")

      }


    } else {
      console.log("1.2 could not render table, data not available")
    }
    
  }



  return (
    <div className='flex-row w-fit m-auto mt-5'>

      <h3 className='text-2xl underline text-center'>Your Habits:</h3>

      <div className='flex border-2 border-black rounded-xl m-5 px-3 items-center w-fit'>

        <p>Habit Name:</p>
        <input onInput={e => setInput(e.target.value)} value={input} type='text' className='border-2 h-7 ml-2 border-black'></input>
        <button className='m-3 px-2 bg-gray-200 border-2' onClick={addTodo}>Add New Habit</button>

      </div>

      <RenderTable></RenderTable>


    </div>



  );

}

export default Home