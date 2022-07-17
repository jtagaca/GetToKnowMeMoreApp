import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";
import { scroller } from "react-scroller";
import Conversation from "./compoents/Conversation";
import questions from "./compoents/question.json";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function showModal(id) {
    // Implement
    // check if the id is in the questions array
    // if it is, set the state to true
    // if it is not, set the state to false
    // if the state is true, show the modal
    // if the state is false, hide the modal
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        setCurrentQuestion(questions[i]);
        handleShow();
        return;
      }
    }
    handleClose();
  }
  const alanBtnInstance = useRef(null);
  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: "bb98a15b1e4868b02c31b391c6de2f392e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: (commandData) => {
          showModal(commandData.qId);
          console.log(commandData);
        },
      });
    }
  }, []);
  return (
    <div className="App">
      {currentQuestion.length > 0 ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{currentQuestion[0].question}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={currentQuestion[0].image} alt="answer" />
            <p>{currentQuestion[0].answer}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      ) : null}

      <Conversation />
    </div>
  );
}

export default App;
