import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { successToast, errorToast } from "./toast";
import axios from "axios";
import {
  updateShowModal,
  updateTaskVal,
  updateTasks,
  updateEditTaskVal,
} from "../redux/taskSlice";

function ListTable({ tasks, priority }) {
  //   const [editVal, setEditVal] = useState({});

  const dispatch = useDispatch();

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

  const handleEdit = (i) => {
    // datas[i].tasks = "New Value"; // need to setup a modal here to take new input
    dispatch(updateEditTaskVal(tasks[i]));
    dispatch(updateShowModal(true));
    dispatch(updateTaskVal(tasks[i].tasks));
    setTimeout(() => {
      fetchTasks();
    }, 1000);
  };

  const handleDelete = (id) => {
    deleteTask(id);
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
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th className="col-md-1">Sl.No</th>
            <th className="col-md-8">Tasks</th>
            <th className="col-md-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((data, index) => {
            return priority.includes(data.prio) ? (
              data.isDeleted === false ? (
                <tr>
                  <td
                    className={`${
                      data.isCompleted === true ? "bg-success text-white" : null
                    }`}
                  >
                    {index + 1}
                  </td>
                  {data.isCompleted === true ? (
                    <td className="bg-success text-white">
                      <del>{data.tasks}</del>
                    </td>
                  ) : (
                    <td>{data.tasks}</td>
                  )}

                  <td
                    className={`text-center ${
                      data.isCompleted === true ? "bg-success text-white" : null
                    }`}
                  >
                    {data.isCompleted === true ? (
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
                    ) : (
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
                    )}
                  </td>
                </tr>
              ) : null
            ) : null;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListTable;
