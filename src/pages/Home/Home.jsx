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

const restCall = async () => {
  var resp;
  
  console.log("--->>> CHAMADA GET HOME")
  //console.log("### DADOS INICIAIS = ", dados)

  await api.get("tasks", {
    headers: { "content-type": "application/json" }
  })        
  .then((response) => {
    
    console.log("### DADOS HOME = ", response.data)

    if (!response || !response.data) {
      console.log('FALHA');
      return;
    }
    if (response.status === 200 || response.status === 304) {
      //console.log("--->>> RETORNO HOME: ", response.data)

      resp = [...response.data]

      //console.log("--->>> resp HOME: ", resp)
      
      setTasks(resp);      
    }
    else {
      console.log("-> STATUS: ", response.status);
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => {
    //console.log('FINALLY');        
    
  });

}

  useEffect(() => {
    restCall();

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


/*

  const restCall = async (endpoint, httpMethod, dados) => {
    try {

      var resp;
      
      
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

      //console.log("RESPONSE HOME: ", resp.data)
      
    } catch (error) {
      console.error(error);
    }
  }

*/