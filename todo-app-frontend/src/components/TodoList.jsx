import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { successToast, errorToast } from "./toast";
import axios from "axios";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/taskSlice";

function TodoList() {
  // const [tasks, setTasks] = useState([]);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [editVal, setEditVal] = useState({});

  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:4000/get-list");
      dispatch(updateTasks(response.data));
      // setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask(id) {
    try {
      const response = await axios.patch(
        `http://localhost:4000/list/delete/${id}`,
        { status: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function completeTask(id) {
    try {
      const response = await axios.patch(
        `http://localhost:4000/get-list/completed/${id}`,
        { status: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  setTimeout(
    useEffect(() => {
      fetchTasks();
    }),
    36000000
  );

  const handleEdit = (i) => {
    // datas[i].tasks = "New Value"; // need to setup a modal here to take new input
    setEditVal(tasks[i]);
    setModalShow(true);
    setTimeout(() => {
      fetchTasks();
    }, 1000);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    // deleteTask(id);
    errorToast("Task Deleted");
    fetchTasks();
  };

  const handleComplete = (id) => {
    completeTask(id);
    //toast
    successToast("Task Completed! Yay!");
    fetchTasks();
  };
  return (
    <div>
      <EditModal
        show={modalShow}
        onHide={(e) => setModalShow(false)}
        value={editVal}
      />
      <div className="border border-secondary rounded">
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th className="col-md-1">Sl.No</th>
              <th className="col-md-6">Tasks</th>
              <th className="col-md-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((data, index) => {
              return data.isDeleted === false ? (
                data.isCompleted === true ? (
                  <tr className="bg-success">
                    <td>{index + 1}</td>
                    <td>
                      <del>{data.tasks}</del>
                    </td>
                    <td>
                      <Dropdown as={ButtonGroup}>
                        <Button
                          variant="warning"
                          onClick={(e) => handleEdit(index)}
                        >
                          Edit
                        </Button>

                        <Dropdown.Toggle
                          split
                          variant="dark"
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) => handleDelete(data._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.tasks}</td>
                    <td>
                      <Dropdown as={ButtonGroup}>
                        <Button
                          variant="success"
                          onClick={(e) => handleComplete(data._id)}
                        >
                          Mark Complete
                        </Button>

                        <Dropdown.Toggle
                          split
                          variant="dark"
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={(e) => handleEdit(index)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => handleDelete(data._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )
              ) : null;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TodoList;
