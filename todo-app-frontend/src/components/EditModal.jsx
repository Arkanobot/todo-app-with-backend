import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function EditModal({ show, onHide, value, disabled }) {
  const handleEditCall = () => {
    console.log("this is edit call");
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
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              {...disabled}
              placeholder={value.tasks}
              defaultValue={value.tasks}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">Edit</InputGroup.Text>
          </InputGroup>
          <Form.Check
            {...disabled}
            type="switch"
            id="custom-switch"
            label="Task Completed"
            placeholder={`${value.isCompleted}`}
            defaultChecked={value.isCompleted}
            defaultValue={value.isCompleted}
            className="mx-2 mx-md-3"
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
