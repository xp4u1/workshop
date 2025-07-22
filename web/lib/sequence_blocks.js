import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

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
]);

javascriptGenerator["click_event"] = (block) => {
  let variable = javascriptGenerator.valueToCode(
    block,
    "variable",
    javascriptGenerator.ORDER_ATOMIC
  );
  let statements = javascriptGenerator.statementToCode(block, "statement");

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

javascriptGenerator["highlightsquare"] = (block) => {
  let value_index = javascriptGenerator.valueToCode(
    block,
    "index",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `{
    ${sleepFunction}
    const index = ${value_index} - 1;
    const squares = document.querySelectorAll("[data-app='sequence'] .squareButton");

    squares[index].classList.add("active");
    await sleep(300);
    squares[index].classList.remove("active");
    await sleep(300);
  }\n`;
};
