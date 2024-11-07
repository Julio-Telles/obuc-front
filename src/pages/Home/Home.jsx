import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Kanban from "./Kanban/Kanban";


export default function Home() {

  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "Responsible", column: "assignedTo" },
      { label: "Description", column: "description" },
      { label: "Status", column: "status" },
      { label: "Category", column: "category" },
    ],
    rows: [],
  });
/*
  const mockTags = {
    headers: [{ label: "Tag", column: "tag" }],
    rows: [
      { id: 1, tag: "Design" },
      { id: 2, tag: "Frontend" },
      { id: 3, tag: "Backend" },
    ],
  };
*/
  const restCall = async (endpoint, httpMethod, dados) => {
    try {

      var resp;
      
      //console.log("--->>> CHAMADA API AXIOS")
      console.log("### DADOS INICIAIS = ", dados)
      
      if (httpMethod === "GET") {
        resp = await api.get(endpoint, {
          headers: { "content-type": "application/json" }
        });
        
        setTasks(resp.data);
      }
      else if (httpMethod === "POST") {
        resp = await api.post(endpoint, JSON.stringify(dados), {
          headers: { "content-type": "application/json" }
        });
      }
      else if (httpMethod === "DELETE") {
        resp = await api.delete(endpoint, JSON.stringify(dados), {
          headers: { "content-type": "application/json" }
        });
      }
      else {
        resp = await api.patch(endpoint, JSON.stringify(dados), {
          headers: { "content-type": "application/json" }
        });
      }

      console.log("RESPONSE ***AXIOS***: ", resp.data)
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    restCall("tasks", "GET", null);

  }, []);

  useEffect(() => {
    setTasksTableData({
      headers: [
        { label: "Responsible", column: "assignedTo" },
        { label: "Description", column: "description" },
        { label: "Status", column: "status" },
        { label: "Category", column: "category" },
      ],
      rows: tasks,
    });
  }, [tasks, setTasks]);

  //const [tags, setTags] = useState(mockTags);

  //const statusOptions = [{ id: 1, value: "pending", label: "Pending" }];

  /*+++++++++++++++++++++++++++++++++++++*/
  //AQUI ADICINA A NOVA PÁGINA
  /*+++++++++++++++++++++++++++++++++++++*/
  const tabs = {
    board: (
      <Board
        //status={statusOptions}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    //tags: <Tags tags={tags} setTags={setTags} />,
    kanban: <Kanban />,
  };
  /*+++++++++++++++++++++++++++++++++++++*/
  /*+++++++++++++++++++++++++++++++++++++*/
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
