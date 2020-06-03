import React from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vigenere from "./Vigenere";

const App = () => {
  const randomKey = () => {
    var size = 6;
    var charset = "abcdefghijklmnopqrstuvwxyz";
    var key = "";
    for (var i = 0; i < size; i++) {
      key += charset[Math.floor(Math.random() * charset.length)];
    }

    document.getElementById("key").value = key;
  };

  const sampleText = () => {
    const text =
      "It was the wont of the immortal gods sometimes to grant prosperity and long impunity to men whose crimes they were minded to punish in order that a complete reverse of fortune might make them suffer more bitterly";
    document.getElementById("text").value = text;
  };

  const encrypt = () => {
    const key = document.getElementById("key").value;
    const value = document.getElementById("text").value;
    const encrypted = Vigenere.encrypt(value, key);
    document.getElementById("encrypted").value = encrypted;
  };

  const decrypt = () => {
    const key = document.getElementById("key").value;
    const value = document.getElementById("encrypted").value;
    const decrypted = Vigenere.decrypt(value, key);
    document.getElementById("decrypted").style.display = "block";
    document.getElementById("label").style.display = "block";
    document.getElementById("decrypted").innerHTML = decrypted;
  };

  const crack = () => {
    const value = document.getElementById("encrypted").value;
    const cracked = Vigenere.crack(value, 10);
    document.getElementById("crack-label").style.display = "block";
    let list = document.getElementById("crack");
    for (let i = 0; i < cracked.length; ++i) {
      let li = document.createElement("ListGroup.Item");
      li.innerHTML = cracked[i][1];
      list.appendChild(li);
    }
  };
  return (
    <Container fluid>
      <Form className="mt-5">
        <Button variant="outline-primary" onClick={sampleText}>
          Sample Text
        </Button>
        <Form.Group controlId="exampleForm.ControlInput1" className="mt-3">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="5" id="text" />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Button variant="outline-success" onClick={randomKey}>
            Generate Random Key
          </Button>
          <InputGroup className="mb-3 mt-3">
            <FormControl
              placeholder="Encryption Key"
              aria-label="Encryption Key"
              aria-describedby="basic-addon2"
              id="key"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={encrypt}>
                Encrypt
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Cipher Text</Form.Label>
          <Form.Control as="textarea" rows="5" id="encrypted" />
        </Form.Group>
        <Button variant="outline-primary" onClick={decrypt}>
          Decrypt
        </Button>{" "}
        {"   "}
        <Button variant="outline-success" onClick={crack}>
          Crack
        </Button>
        <Form.Label id="label" className="mt-3" style={{ display: "none" }}>
          Decrypted Text
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          id="decrypted"
          className="mt-3"
          style={{ display: "none" }}
        />
        <Form.Label
          id="crack-label"
          className="mt-3"
          style={{ display: "none" }}
        >
          Crack Text
        </Form.Label>
        <ListGroup id="crack" style={{ display: "inlineBlock" }}></ListGroup>
      </Form>
    </Container>
  );
};

export default App;
