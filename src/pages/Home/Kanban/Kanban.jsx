import { useState, useEffect } from 'react';
import "./Kanban.css"
import Cards from "../../../components/Cards/Cards";

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
    description: "",
    responsible: "",
    status: "",
    category: "",
  }
]

const info = [
  {
    id: "1",
    title: "ação 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus posuere sem luctus dapibus. Duis massa mauris, accumsan ac lobortis a, luctus vel neque. Nam ac enim vitae arcu volutpat hendrerit quis sed nisi. Etiam elit eros, rhoncus ut neque vel, egestas vestibulum nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam aliquam semper luctus. Duis eget iaculis risus, non dapibus dui.  1",
    responsible: "Julio",
    status: "pending",
    category: "personal",
  },
  {
    id: "2",
    title: "task 2",
    description: "aowijeoiawnef aweofijaewoif 2",
    responsible: "Noix",
    status: "done",
    category: "work",
  },
  {
    id: "3",
    title: "fazer 3",
    description: "aowijeoiawnef aweofijaewoif 3",
    responsible: "Ana",
    status: "pending",
    category: "personal",
  },
  {
    id: "4",
    title: "ação 4",
    description: "aowijeoiawnef aweofijaewoif 4",
    responsible: "Mãe",
    status: "done",
    category: "work",
  },
  {
    id: "5",
    title: "task 5",
    description: "aowijeoiawnef aweofijaewoif 5",
    responsible: "Pai",
    status: "ongoing",
    category: "work",
  },
  {
    id: "6",
    title: "fazer 6",
    description: "aowijeoiawnef aweofijaewoif 6",
    responsible: "Irmão",
    status: "ongoing",
    category: "personal",
  },
  {
    id: "7",
    title: "nada 7",
    description: "aowijeoiawnef aweofijaewoif 7",
    responsible: "Vó",
    status: "done",
    category: "saúde",
  },
]

export default function Kanban() {
  const [pend, setPend] = useState([])
  const [ongo, setOngo] = useState([])
  const [done, setDone] = useState([])
  const [categ, setCateg] = useState([])

  useEffect(() => {
    setPend(info.filter((status) => status.status === "pending"))
    setOngo(info.filter((status) => status.status === "ongoing"))
    setDone(info.filter((status) => status.status === "done"))
    
    const ajustado = []
    info.map((item) => {
      //console.log(" --->>> " + JSON.stringify(item))
      
      if (ajustado.findIndex((x) => x === JSON.stringify(item.category)) === -1) {
        ajustado.push(JSON.stringify(item.category))
      }        
    })

    ajustado.sort((a, b) => a-b)//ORDENA NÚMEROS

    if(isNaN(ajustado.at(0))) {
      ajustado.sort((a, b) => a.localeCompare(b))//ORDENA STRINGS
    }

    console.log(" -> " + ajustado)
    
    setCateg(ajustado);

  }, [])
  
  const tasks = (obj) => {
    //console.log("OBJ -> ", obj)
    return (
      <div>
        <>{obj.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.responsible} category={item.category}/>)}</>
      </div>
      );
  };

const head = (options) => {
  return (     
    <Dropdown value={options.value} options={categ} onChange={(e) => alert("EM DESENVOLVIMENTO -> filtrar: " + e.value)} placeholder={options} className="p-column-filter" showClear style={{ minWidth: '12rem', border: "2px"}} />
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
              <Column field="category" header="Ongoing" body={tasks(ongo)}></Column>
          </DataTable>
        </Col>

        <Col xs={4}>
          <DataTable value={start} showGridlines >
              <Column field="category" header="Done" body={tasks(done)}></Column>
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
        <>{pend.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.responsible} category={item.category}/>)}</>
      </div>
      );
  };
  
  const andamento = () => {
    //console.log("PRONTOS -> ", pend)
    return (
      <div>
        <>{ongo.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.responsible} category={item.category}/>)}</>
      </div>
      );
  };

  const prontos = () => {
    //console.log("PRONTOS -> ", pend)
    return (
      <div>
        <>{done.map((item) => <Cards key={item.id} title={item.title} description={item.description} responsible={item.responsible} category={item.category}/>)}</>
      </div>
      );
  };
*/}
  