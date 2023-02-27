import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { successToast, errorToast } from "./toast";
import axios from "axios";

function AddTodo() {
  let task;

  async function addTask() {
    try {
      const response = axios.post("http://localhost:4000/add", { tasks: task });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const inputRef = useRef();

  const handleChange = (e) => {
    task = e.target.value;
  };
  const handleClick = () => {
    //posting the new task to the backend database - WIP
    if (task === undefined) {
      errorToast("Please enter a Task");
    } else {
      //show a toast on sending the post request
      addTask();
      successToast("Task successfully created");
      //clearing the input field
      console.log(task);
      setTimeout(() => (inputRef.current.value = ""), 500);
    }
  };
  return (
    <div className="my-5 border border-secondary rounded">
      <InputGroup className="">
        <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
        <Form.Control
          ref={inputRef}
          placeholder="Add Task"
          aria-label="Todo"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="success"
          id="button-addon1"
          onClick={(e) => handleClick(e)}
        >
          Add Task
        </Button>
      </InputGroup>
    </div>
  );
}

export default AddTodo;
