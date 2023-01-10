import * as Blockly from "blockly";

import { log, sleepFunction } from "./code";

Blockly.defineBlocksWithJsonArray([
  {
    type: "click_event",
    message0: "sobald Quadrat %1 %2 angeklickt wird %3 %4",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "variable",
        check: "Number",
      },
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
      "Der Inhalt von diesem Block wird dann ausgeführt, wenn ein Quadrat angeklickt wird.",
    helpUrl: "",
  },
  {
    type: "highlightsquare",
    message0: "Quadrat hervorheben %1",
    args0: [
      {
        type: "input_value",
        name: "index",
        check: "Number",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Hebt eine der quadratischen Tasten hervor.",
    helpUrl: "",
  },
  {
    type: "result",
    message0: "zeige Ergebnis: %1",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["richtig", "correct"],
          ["falsch", "incorrect"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["click_event"] = (block) => {
  let variable = Blockly.JavaScript.valueToCode(
    block,
    "variable",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  let statements = Blockly.JavaScript.statementToCode(block, "statement");

  return `{
    document.querySelectorAll(".squareButton").forEach((element) => {
      element.addEventListener("mousedown", async (event) => {
        ${variable} = Number.parseInt(event.target.getAttribute("data-id"));
        ${log(`"Quadrat Nummer " + ${variable} + " wurde angeklickt."`)}

        ${statements}
      })
    })
  }`;
};

Blockly.JavaScript["highlightsquare"] = (block) => {
  let value_index = Blockly.JavaScript.valueToCode(
    block,
    "index",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  return `{
    ${sleepFunction}
    const index = ${value_index} - 1;
    const squares = document.querySelectorAll(".squareButton");

    squares[index].classList.add("active");
    await sleep(300);
    squares[index].classList.remove("active");
    await sleep(300);
  }\n`;
};

Blockly.JavaScript["result"] = (block) => {
  let dropdown = block.getFieldValue("type");

  return `{
    ${sleepFunction}
    ${log(dropdown === "correct" ? "'Richtig!'" : "'Falsch!'")}
    document.getElementById("inputField").classList.add("${dropdown}");
    await sleep(200);
    document.getElementById("inputField").classList.remove("${dropdown}");
  }\n`;
};
