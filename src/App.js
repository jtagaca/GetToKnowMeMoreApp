import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";
import { scroller } from "react-scroller";
import Conversation from "./compoents/Conversation";
import questions from "./compoents/question.json";
import Button from "react-bootstrap/Button";
import "./App.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function showModal(id) {
    // Implement
    console.log();
    // check if the id is in the questions array
    // if it is, set the state to true
    // if it is not, set the state to false
    // if the state is true, show the modal
    // if the state is false, hide the modal
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        console.log("found");
        console.log(questions[i]);
        let tempArr = [];
        tempArr.push(questions[i]);

        setCurrentQuestion(tempArr);
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
          console.log(commandData.qId);
          console.log(commandData);
        },
      });
    }
  }, []);
  return (
    <div className="App">
      {/* make a button that calls showmodal
       */}
      {/* <Button variant="primary" onClick={() => showModal(4)}>
        Hey
      </Button> */}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        {currentQuestion.length > 0 ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{currentQuestion[0].question}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* align the photo to the middle of the div
               */}
              <div className="align-mid">
                <img
                  width={650}
                  height={369}
                  src={currentQuestion[0].image}
                  alt="answer"
                />
              </div>
              <p>{currentQuestion[0].answer}</p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </>
        ) : null}
      </Modal>

      <Conversation />
    </div>
  );
}

export default App;
