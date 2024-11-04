//import "./Modal.css";
//import { MdClose } from "react-icons/md";
//import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";

import PropTypes from "prop-types";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Pop({ isOpen, onClose, children, title, handleSubmit }) {
  if (!isOpen) {
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
    onClose();
  };

  return (    
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>

        <Modal.Body>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Responsible</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Describe your task" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Describe your category" />
      </Form.Group>
      

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary"><FaPlus />  Add Task</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>

    /*
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </header>
        <form onSubmit={onSubmit}>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button onClick={onClose} secondaryStyle>
              Close
            </Button>
            <Button typeSubmit>
              <FaPlus /> Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
    */
  );
}

Pop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
