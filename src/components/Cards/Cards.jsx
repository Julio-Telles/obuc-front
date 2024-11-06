import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import PropTypes from "prop-types";

export default function Cards({ title, description, responsible, category}) {
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
            {title}
          </Card.Title>
          
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder=""
          style={{ height: '80px' }}
          >
            {description}
          </Form.Control>
      </FloatingLabel>

        </Card.Body>

      <FloatingLabel
        controlId="floatingTextarea"
        label="Responsible"
        className="mb-0"
      >
        <Form.Control as="email" placeholder="Leave a comment here" size='sm'>
          {responsible}
        </Form.Control>
      </FloatingLabel>
      
      <FloatingLabel
        controlId="floatingTextarea"
        label="Category"
        className="mb-0"
      >
        <Form.Control as="email" placeholder="Leave a comment here" size='sm'>
          {category}
        </Form.Control>
      </FloatingLabel>

        <Card.Body
          style={{ height: '40px', padding: '0px', alignContent: 'center'}}
        >
          <Button variant="primary" size='sm'>Editar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  responsible: PropTypes.string,
  category: PropTypes.string,
};
