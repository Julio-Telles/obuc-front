import { FaPlus } from "react-icons/fa";

import PropTypes from "prop-types";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef } from "react";


export default function NewCateg( props ){

  const categoria = useRef()

  const handleTask = () => {    
    props.data.category = categoria.current.value;

    //console.log("categoria = ", categoria.current.value)

    if (categoria.current.value === "" || categoria.current.value === "new") {
      alert("Insira uma categoria válida")      
    }
    else{
      //console.log("CATEGORIES NEW CATEGORY CLICADO = ", props.data)
      
      props.data.category = categoria.current.value;

      //console.log("NOVA CATEGORIA -> ", props.data.category)

      props.rest();

      props.onHide();
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

      <Form.Group className="mb-1" controlId="formBasicText" >
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter a new category" ref={categoria} />
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

NewCateg.propTypes = {
  onHide: PropTypes.func.isRequired,
  rest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
