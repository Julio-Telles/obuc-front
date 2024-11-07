import { FaPlus } from "react-icons/fa";

import PropTypes from "prop-types";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRef } from "react";


export default function Pop( props ){
  const titulo = useRef()
  const descricao = useRef()
  const responsavel = useRef()
  const status = useRef()
  const categoria = useRef()

  const handleTask = () => {
    //console.log("CATEGORIES POP CLICADO = ", props.categories)
    props.data.title = titulo.current.value;
    props.data.description = descricao.current.value;
    props.data.assignedTo = responsavel.current.value;
    props.data.status = status.current.value;
    props.data.category = categoria.current.value;
/*
    console.log("titulo = ", titulo.current.value)
    console.log("descricao = ", descricao.current.value)
    console.log("responsavel = ", responsavel.current.value)
    console.log("status = ", status.current.value)
    console.log("categoria = ", categoria.current.value)
*/
    if (props.data.title === "" || props.data.description === "" || props.data.assignedTo === "") {
      alert("Preencha todos os campos corretamente")      
    }
    else{
      console.log("CATEGORIES POP CLICADO = ", props.data)
      props.rest();
    }
  }

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new task</Modal.Title>
      </Modal.Header>

      <Modal.Body>

      <Form.Group className="mb-1" controlId="formBasicEmail" >
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" placeholder="Enter a short title" ref={titulo} />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicEmail" >
        <FloatingLabel controlId="floatingTextarea2" label="Description" >
          <Form.Control type="textarea" placeholder="Describe your task" style={{ height: '60px' }} ref={descricao} />
        </FloatingLabel>
      </Form.Group>
      
      <Form.Group className="mb-1" controlId="formBasicEmail" >
        <Form.Label>Responsible</Form.Label>
        <Form.Control type="text" placeholder="Enter name" ref={responsavel} />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicText" >
        <Form.Label>Status</Form.Label>
        
        <Form.Select aria-label="Default select example" ref={status}>
          <option>pending</option>
          <option>inProgress</option>
          <option>completed</option>
          <option>obsolete</option>
        </Form.Select>
      </Form.Group>
      
      <Form.Group className="mb-1" controlId="formBasicText" >
        <Form.Label>Category</Form.Label>
        
        <Form.Select aria-label="Default select example" ref={categoria}>
          {props.categories.map((item, index) => (<option key={index}>{item}</option>))}
        </Form.Select>
      </Form.Group>

      
      </Modal.Body>

      <Modal.Footer>
        <Button 
          style={{backgroundColor: "#9E9E9E", borderColor: "#9E9E9E", fontFamily: "Montserrat, Arial", fontWeight: "bold", fontSize: "0.85rem", height: "38px" }} 
          onClick={() => props.onHide }
        >
          Close</Button>
        <Button
          style={{backgroundColor: "#00569e", fontFamily: "Montserrat, Arial", fontWeight: "bold", fontSize: "0.85rem", height: "38px" }} 
          onClick={handleTask}
        >
          <FaPlus />  Add Task
        </Button>
      </Modal.Footer>
    </Modal>
    
  );
}

Pop.propTypes = {
  onHide: PropTypes.func.isRequired,
  rest: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
