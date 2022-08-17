import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import convo from "./question.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: "10px",
    maxWidth: "600px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: "Helvetica",
  },
}));

function SimpleAccordion({ id, question, answer, image }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={id} className={classes.root}>
      <Accordion
        expanded={expanded}
        onClick={() => {
          console.log(image);
          setExpanded(!expanded);
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
      {expanded && (
        <img
          src={image}
          style={{
            width: "600px",
            height: "350px",
          }}
          alt=""
        />
      )}
    </div>
  );
}
function Conversation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        padding: "40px",
        backgroundColor: "#020120",
        height: "100%",
      }}
    >
      {convo.map((_question) => (
        <>
          <SimpleAccordion
            id={_question.id}
            question={_question.question}
            answer={_question.answer}
            image={_question.image}
          />
        </>
      ))}
    </div>
  );
}

export default Conversation;
