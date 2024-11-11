import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import { useCallback, useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import PropTypes from "prop-types";
import { api } from "../../../services/api";

import Pop from "../../../components/Modal/Pop";
import NewCateg from "../../../components/Modal/NewCateg";

var start = 
{
  id: "0",
  title: "",
  description: "",
  assignedTo: "",
  status: "pending",
  category: "",
}

export default function Board({ tasks, setTasks }) {
  const [modalShow, setModalShow] = useState(false);
  const [newModalShow, setNewModalShow] = useState(false);
  const [categ, setCateg] = useState([])

  const zeraStart = () => {    
    start = {
      id: "0",
      title: "",
      description: "",
      assignedTo: "",
      status: "pending",
      category: "",
    }
  }

  
  const restCall = async (endpoint, httpMethod, dados) => {
    try {

      var resp;
      
      //console.log("--->>> CHAMADA GET BOARD")
      //console.log("### dados = ", tasks)
      
      if (httpMethod === "GET") {
        resp = await api.get(endpoint, {
          headers: { "content-type": "application/json" }
        });
        
        setTasks(resp.data);
        //console.log("### GET EM BOARD = ", resp.data)

        zeraStart();
        
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

      //console.log("RESPONSE ***AXIOS***: ", resp.data)
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseNewModal = () => {
    setNewModalShow(false);
  }
  
  const handleClose = () => {
    setModalShow(false);
  };

  const newPost = async () => {
    setNewModalShow(false);
    
    //console.log("--->>> CHAMADA API AXIOS - POST MODAL")
    //console.log("--->>> start = ", start)
    

    await api.post("tasks", start, {
      headers: { "content-type": "application/json" }
    })
    .then((response) => {
      //console.log(response.data);
      if (!response || !response.data) {
        //console.log('FALHA');
        return;
      }
      if (response.status === 200 || response.status === 304 || response.status === 201) {
        //console.log("--->>> RETORNO POST: ", response.data)

        //const resp = [...response.data]
        
        //setTasks(resp);

        restCall("tasks", "GET", null);
        categories();
        
      }
      else {
        //console.log("-> STATUS: ", response.status);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      //console.log('FINALLY');        
      
      //console.log("ATUALIZA TABELA APÓS O POST")
      restCall("tasks", "GET", null);
    });

  };

  const newTask = () => {
    setModalShow(false);
    
    
    if (start.category === "new") {
      //console.log("NEW TASK NO BOARD");
      setNewModalShow(true)
    }
    else{
      newPost()
    }
  };

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tasks.rows.length) {
        return;
      }
      
      //restCall(`tasks/${id}`, "DELETE", null);
      try {
        await api.delete(`/tasks/${id}`, {
          headers: { "content-type": "application/json" }
        });
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks.rows.length, setTasks]
  );
  

  const categories = () => {
    const ajustado = [];

    tasks.rows.map((item) => {
      //console.log(" --->>> " + JSON.stringify(item))
      
      if (ajustado.findIndex((x) => x === JSON.stringify(item.category)) === -1) {
        ajustado.push(JSON.stringify(item.category))
      }        
    })
    
    ajustado.map((item, index) => {
      ajustado.splice(index, 1, item.slice(1, item.length-1));
    })

    ajustado.sort((a, b) => a-b)//ORDENA NÚMEROS

    if(isNaN(ajustado.at(0))) {
      ajustado.sort((a, b) => a.localeCompare(b))//ORDENA STRINGS
    }

    ajustado.push("new");

    //console.log(" -> BOARD ajustado = " + ajustado)
    
    setCateg(ajustado);
    //console.log(" --->>> AJUSTANDO")
    
  }
  
  useEffect(() => {
    //console.log("--->>> BOARD TASKS: ", tasks.rows)
    categories();
  },[tasks])
  
  return (
    <div id="board-wrapper">
      <Button onClick={ () => {
          if(categ.length === 1) {
            //console.log("CLICANDO TASK -> categories: ", categ)

            categories();            
          }
          setModalShow(true)
        }
      }>
        <FaPlus />
        Add Task
      </Button>

      <Table data={tasks} handleDeleteRow={handleDeleteRow} />

      <Pop
        show={modalShow}
        onHide={handleClose}
        restapi={newTask}
        categor={categ}
        data={start}
        cabecalho="Add new Task"
      />

      <NewCateg
        show={newModalShow}
        onHide={handleCloseNewModal}
        restapi={newPost}
        data={start}
        cabecalho="Add new Category"
      />
      
    </div>
  );
}

Board.propTypes = {
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
};
