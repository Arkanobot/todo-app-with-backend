import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { successToast, errorToast } from "./toast";

function AddTodo() {
  let task;
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
      successToast("Task successfully created");
      //clearing the input field
      inputRef.current.value = "";
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
