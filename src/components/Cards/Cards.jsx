import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import PropTypes from "prop-types";

export default function Cards( props ) {
  return (
    <div>
      <Card style={{ width: '9rem' , padding: '0px', alignContent: 'center', textAlign: 'center' }}>
        <Card.Body
          style={{ padding: '0px' }}
        >
          <Card.Title 
            style={{backgroundColor: "#00be78", borderRadius: "4px", verticalAlign: 'center' }} 
            className="mb-0"
          >
            {props.title}
          </Card.Title>
          
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder=""
          style={{ height: '80px' }}
          value={props.description}
          readOnly
          >
            {props.description}
          </Form.Control>
      </FloatingLabel>

        </Card.Body>

      <FloatingLabel
        controlId="floatingTextarea"
        label="Responsible"
        className="mb-0"
      >
        <Form.Control as="email" placeholder="Leave a comment here" size='sm'>
          {props.responsible}
        </Form.Control>
      </FloatingLabel>
      
      <FloatingLabel
        controlId="floatingTextarea"
        label="Category"
        className="mb-0"
      >
        <Form.Control as="email" placeholder="Leave a comment here" size='sm'>
          {props.category}
        </Form.Control>
      </FloatingLabel>

        <Card.Body
          style={{ height: '40px', padding: '0px', alignContent: 'center'}}
        >
          <Button 
            style={{backgroundColor: "#00569e", fontFamily: "Montserrat, Arial", fontWeight: "bold", fontSize: "0.85rem", height: "36px" }}
            onClick={() => props.rest(props.id)}
          >Editar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

//{ id, title, description, responsible, category}
Cards.propTypes = {
  rest: PropTypes.func.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  responsible: PropTypes.string,
  category: PropTypes.string,
};
