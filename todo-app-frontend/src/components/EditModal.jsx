import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompletion,
  updateShowModal,
  updateTaskVal,
} from "../redux/taskSlice";
import { successToast } from "./toast";

function EditModal({ show, onHide, value }) {
  const { isCompleted, taskVal } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  let task = value.tasks;
  let completion = isCompleted;

  async function editTask(id) {
    try {
      const response = await axios.put(`http://localhost:4000/get-list/${id}`, {
        tasks: taskVal,
        status: completion,
      });
      console.log(task, completion);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTaskChange(e) {
    dispatch(updateTaskVal((task = e.target.value)));
  }

  function handleCompletionChange(e) {
    dispatch(updateCompletion(e.target.checked));
    console.log(isCompleted);
  }
  const handleEditCall = (id) => {
    editTask(id);
    console.log(`task: ${task}, completion: ${completion}`);
    dispatch(updateShowModal(false));
    successToast("Task edited successfully");
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder={value.tasks}
              defaultValue={value.tasks}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleTaskChange(e)}
            />
            <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
          </InputGroup>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Task Completed"
            placeholder={`${value.isCompleted}`}
            defaultChecked={value.isCompleted}
            defaultValue={value.isCompleted}
            className="mx-2 mx-md-3"
            onChange={(e) => handleCompletionChange(e)}
          />
          <p className="m-2 m-md-3">Are you sure you want to make changes ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => handleEditCall(value._id)}>Save</Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditModal;
