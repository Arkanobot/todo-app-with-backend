import React, { useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { updateShowModal, updateTasks } from "../redux/taskSlice";
import ListTable from "./ListTable";

import Accordion from "react-bootstrap/Accordion";

function TodoList() {
  //fetching all the states from redux store
  const { tasks, showModal, editTaskVal } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  //setting the different priority tabs for accordion
  const priorities = ["High Priority", "Medium Priority", "Low Priority"];

  //function to fetch data fromt he Database / backend
  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:4000/get-list");
      dispatch(updateTasks(response.data));
      // setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //useEffect to fetch data on site load
  useEffect(() => {
    fetchTasks();
  }, [tasks, editTaskVal]);

  return (
    <div>
      <EditModal
        show={showModal}
        onHide={(e) => dispatch(updateShowModal(false))}
        value={editTaskVal}
      />
      <Accordion defaultActiveKey="0">
        {priorities.map((item, i) => {
          return (
            <Accordion.Item eventKey={`${i}`}>
              <Accordion.Header>{item.toUpperCase()}</Accordion.Header>
              <Accordion.Body>
                <ListTable tasks={tasks} priority={item} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default TodoList;
