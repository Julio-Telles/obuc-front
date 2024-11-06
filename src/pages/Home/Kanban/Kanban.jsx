import { useState, useEffect } from 'react';
import "./Kanban.css"
import Cards from "../../../components/Cards/Cards";
import { api } from "../../../services/api";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//SÓ SERVE PRA INICIAR A TABELA COM 1 ELEMENTO
const start = [
  {
    id: "",
    title: "",
    description: "",
    assignedTo: "",
    status: "",
    category: "",
  }
]
/*
const info = [
  {
    id: "1",
    title: "ação 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus posuere sem luctus dapibus. Duis massa mauris, accumsan ac lobortis a, luctus vel neque. Nam ac enim vitae arcu volutpat hendrerit quis sed nisi. Etiam elit eros, rhoncus ut neque vel, egestas vestibulum nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam aliquam semper luctus. Duis eget iaculis risus, non dapibus dui.  1",
    assignedTo: "Julio",
    status: "pending",
    category: "personal",
  },
  {
    id: "2",
    title: "task 2",
    description: "aowijeoiawnef aweofijaewoif 2",
    assignedTo: "Noix",
    status: "completed",
    category: "work",
  },
  {
    id: "3",
    title: "fazer 3",
    description: "aowijeoiawnef aweofijaewoif 3",
    assignedTo: "Ana",
    status: "pending",
    category: "personal",
  },
  {
    id: "4",
    title: "ação 4",
    description: "aowijeoiawnef aweofijaewoif 4",
    assignedTo: "Mãe",
    status: "completed",
    category: "work",
  },
  {
    id: "5",
    title: "task 5",
    description: "aowijeoiawnef aweofijaewoif 5",
    assignedTo: "Pai",
    status: "inProgress",
    category: "work",
  },
  {
    id: "6",
    title: "fazer 6",
    description: "aowijeoiawnef aweofijaewoif 6",
    assignedTo: "Irmão",
    status: "inProgress",
    category: "personal",
  },
  {
    id: "7",
    title: "nada 7",
    description: "aowijeoiawnef aweofijaewoif 7",
    assignedTo: "Vó",
    status: "completed",
    category: "saúde",
  },
]
*/
export default function Kanban() {
  const [info, setInfo] = useState([])
  const [pend, setPend] = useState([])
  const [ongo, setOngo] = useState([])
  const [done, setDone] = useState([])
  const [categ, setCateg] = useState([])

  useEffect(() => {

    const adjustment = () => {
      //console.log(" --->>> AJUSTANDO")
      
      const ajustado = []
      info.map((item) => {
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

      ajustado.push("all");
  
      //console.log(" -> " + ajustado)
      
      setCateg(ajustado);

    }
    
    const restCall = async () => {
      
      console.log("--->>> CHAMADA API AXIOS - KANBAN")
    
      await api.get("tasks", {
        headers: { "content-type": "application/json" }
      })        
      .then((response) => {
        console.log(response.data);
        if (!response || !response.data) {
          console.log('FALHA');
          return;
        }
        if (response.status === 200 || response.status === 304) {
          console.log("--->>> RETORNO: ", response.data)

          const resp = [...response.data]
          
          setInfo(resp)
          
          setPend(resp.filter((status) => status.status === "pending"))
          setOngo(resp.filter((status) => status.status === "inProgress"))
          setDone(resp.filter((status) => status.status === "completed"))
          
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
        
        adjustment()
      });

    }
    
    restCall()

  }, [])
  
  const tasks = (obj) => {
    //console.log("OBJ -> ", obj)
    return (
      <div>
        <>{obj.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.assignedTo} category={item.category} />)}</>
      </div>
      );
  };

const filtrar = (cat, opt) => {
  console.log("OPTION = ", opt);
  console.log("CATEGORY = ", cat);
  
  if(opt === "Pending"){
    //console.log("filtrando pending")
    if(cat == "all") {
      setPend(info.filter((status) => status.status === "pending"))
    }
    else{
      setPend(info.filter((status) => status.status === "pending" && status.category === cat))
    }
  }
  else if(opt === "inProgress"){
    //console.log("filtrando inProgress")
    if(cat == "all") {
      setOngo(info.filter((status) => status.status === "inProgress"))
    }
    else{
      setOngo(info.filter((status) => status.status === "inProgress" && status.category === cat))
    }
  }
  else if(opt === "Completed"){
    //console.log("filtrando Completed")
    //console.log("filtrando inProgress")
    if(cat == "all") {
      setDone(info.filter((status) => status.status === "completed"))
    }
    else{
      setDone(info.filter((status) => status.status === "completed" && status.category === cat))
    }
  }
}

const head = (options) => {
  return (
    <Dropdown value={options.value} options={categ} onChange={(e) => filtrar(e.value, options)} placeholder={options} className="p-column-filter" showClear style={{ minWidth: '12rem', border: "2px"}} />
    );
}

  return (
    <div id="kanban-wrapper">
    <h1>Kanban</h1>
      
    <Container>
      <Row>
        <Col xs={4}>
          <DataTable value={start} showGridlines >
              <Column field="category" header={head("Pending")} body={tasks(pend)}></Column>
          </DataTable>
        </Col>

        <Col xs={4}>
          <DataTable value={start} showGridlines >
              <Column field="category" header={head("inProgress")} body={tasks(ongo)}></Column>
          </DataTable>
        </Col>

        <Col xs={4}>
          <DataTable value={start} showGridlines >
              <Column field="category" header={head("Completed")} body={tasks(done)}></Column>
          </DataTable>
        </Col>
      </Row>

    </Container>

    </div>
  );
}


{/*
  const pendentes = () => {
    //console.log("PENDS -> ", pend)
    return (
      <div>
        <>{pend.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.assignedTo} category={item.category}/>)}</>
      </div>
      );
  };
  
  const andamento = () => {
    //console.log("PRONTOS -> ", pend)
    return (
      <div>
        <>{ongo.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.assignedTo} category={item.category}/>)}</>
      </div>
      );
  };

  const prontos = () => {
    //console.log("PRONTOS -> ", pend)
    return (
      <div>
        <>{done.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.assignedTo} category={item.category}/>)}</>
      </div>
      );
  };
*/}
  