import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.defineBlocksWithJsonArray([
  {
    type: "change_question",
    message0: "ändere Frage zu %1",
    args0: [
      {
        type: "input_value",
        name: "text",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "answer",
    message0: "Antwort",
    output: "String",
    colour: 20,
    tooltip: "Aktueller Inhalt des Eingabefelds",
    helpUrl: "",
  },
  {
    type: "click_event",
    message0: "sobald „Fertig“ angeklickt wird %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "statement",
      },
    ],
    colour: 20,
    tooltip:
      "Der Inhalt von diesem Block wird dann ausgeführt, wenn die „Fertig“ Schaltfläche angeklickt wird.",
    helpUrl: "",
  },
]);

javascriptGenerator["change_question"] = (block) => {
  let text = javascriptGenerator.valueToCode(
    block,
    "text",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `document.getElementById('quizText').innerText = ${text};\n`;
};

javascriptGenerator["answer"] = (_block) => {
  return [
    "document.getElementById('quizInput').value",
    javascriptGenerator.ORDER_NONE,
  ];
};

javascriptGenerator["click_event"] = (block) => {
  let statements = javascriptGenerator.statementToCode(block, "statement");

  return `{
    document.getElementById("quizSubmitButton").addEventListener("click", async (event) => {
      ${statements}

      document.getElementById('quizInput').value = '';
    })
  }`;
};
