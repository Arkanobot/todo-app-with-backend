import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { successToast, errorToast } from "./toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAddToDoTaskName,
  updatePriorityAddToDo,
} from "../redux/taskSlice";

function AddTodo() {
  const { priorityAddToDo, addToDoTaskName } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();
  const priority = ["High", "Medium", "Low"];

  async function addTask() {
    try {
      const response = axios.post("http://localhost:4000/add", {
        tasks: addToDoTaskName,
        prio: priorityAddToDo,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const inputRef = useRef();

  const handleChange = (e) => {
    // task = e.target.value;
    dispatch(updateAddToDoTaskName(e.target.value));
  };
  const handleClick = () => {
    //posting the new task to the backend database - WIP
    if (
      addToDoTaskName === undefined ||
      addToDoTaskName === "" ||
      addToDoTaskName === null
    ) {
      errorToast("Please enter a Task");
    } else {
      //show a toast on sending the post request
      addTask();
      successToast("Task successfully created");
      //clearing the input field
      setTimeout(() => (inputRef.current.value = ""), 500);
    }
  };

  const handlePrioritySetter = (item) => {
    dispatch(updatePriorityAddToDo(item));
  };
  return (
    <div className="my-5 border border-secondary rounded">
      <InputGroup className="">
        <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
        <Form.Control
          ref={inputRef}
          placeholder="Add Task here"
          aria-label="Todo"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChange(e)}
        />
        <DropdownButton
          variant="dark"
          title={priorityAddToDo}
          id="input-group-dropdown-1"
        >
          {priority.map((item) => {
            return item !== priorityAddToDo ? (
              <Dropdown.Item onClick={(e) => handlePrioritySetter(item)}>
                {item}
              </Dropdown.Item>
            ) : null;
          })}
        </DropdownButton>
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
