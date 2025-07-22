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
    type: "highlight_squares",
    message0: "Quadrate hervorheben %1",
    args0: [
      {
        type: "input_value",
        name: "indexes",
        check: "Array",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Hebt mehrere der quadratischen Tasten hervor.",
    helpUrl: "",
  },
  {
    type: "create_grid",
    message0: "erstelle Raster: %1",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["3 × 3", "3"],
          ["4 × 4", "4"],
          ["5 × 5", "5"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "reset_selection",
    message0: "setze Auswahl zurück",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "list_includes",
    message0: "Element %1 %2 in der Liste %3 ?",
    args0: [
      {
        type: "input_value",
        name: "element",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "list",
        check: "Array",
      },
    ],
    output: null,
    colour: 255,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "return",
    message0: "Aktuellen Block abbrechen",
    previousStatement: null,
    colour: 20,
    tooltip: "",
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
    window.click_handler = async () => {
      ${variable} = Number.parseInt(event.target.getAttribute("data-id"));
      ${log(`"Quadrat Nummer " + ${variable} + " wurde angeklickt."`)}

      ${statements}
    };

    document.querySelectorAll(".squareButton").forEach((element) => {
      element.addEventListener("mousedown", window.click_handler)
    })
  }`;
};

javascriptGenerator["highlight_squares"] = (block) => {
  let value_indexes = javascriptGenerator.valueToCode(
    block,
    "indexes",
    javascriptGenerator.ORDER_ATOMIC
  );

  return `{
    ${sleepFunction}
    const ids = ${value_indexes}.map((square_id) => square_id - 1);
    const squares = document.querySelectorAll("[data-app='pattern'] .squareButton");

    ids.forEach((id) => squares[id].classList.add("active"));
    await sleep(1000);
    ids.forEach((id) => squares[id].classList.remove("active"));
    await sleep(300);
  }\n`;
};

// Needs to re-register the custom click_handler.
javascriptGenerator["create_grid"] = (block) => {
  let dropdown = block.getFieldValue("type");

  return `{
    const size = Number.parseInt(${dropdown});
    const label = ["", "", "", "three", "four", "five"];
    const field = document.querySelector(".inputField[data-app='pattern']");
    field.innerHTML = ""

    for (let index = 0; index < size * size; index++) {
      const button = document.createElement("button");
      button.className = "squareButton " + label[size];
      button.setAttribute("data-id", index + 1);
      button.setAttribute("data-event", "");
      button.addEventListener("click", () => button.classList.add("active"));
      button.addEventListener("click", window.click_handler);
      field.appendChild(button);
    }
  }\n`;
};

javascriptGenerator["reset_selection"] = (_block) => {
  return `{
    document
      .querySelectorAll(".squareButton")
      .forEach((button) => button.classList.remove("active"));
  }\n`;
};

javascriptGenerator["list_includes"] = (block) => {
  let element = javascriptGenerator.valueToCode(
    block,
    "element",
    javascriptGenerator.ORDER_ATOMIC
  );
  let list = javascriptGenerator.valueToCode(
    block,
    "list",
    javascriptGenerator.ORDER_ATOMIC
  );

  return [`${list}.includes(${element})`, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator["return"] = (_block) => "return;\n";
