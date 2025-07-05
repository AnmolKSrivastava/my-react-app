import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';

function App() {
  if(localStorage.getItem("todos") === null){
    localStorage.setItem("todos", JSON.stringify([]));
  }
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));

  const onDelete = (todoItem) => {
    console.log("I am onDelete of todo", todoItem);
    const newTodos = todos.filter((todo) => {
      return todo !== todoItem;
    });
    setTodos(newTodos);
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if(todos.length === 0){
      sno = 1;
    }
    else{
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
              </>
            )
          }}/>
          <Route exact path="/about" render={() => {
            return (
              <div className="container">
                <h3 className="text-center my-3">About</h3>
                <p>This is a Todo List app built with React to help you manage your tasks.</p>
              </div>
            )
          }}/>
          <Route path="*" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
              </>
            )
          }}/>
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
