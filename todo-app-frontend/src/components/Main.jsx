import React from "react";
import Header from "./Header";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function Main() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="m-1 m-md-5">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default Main;
