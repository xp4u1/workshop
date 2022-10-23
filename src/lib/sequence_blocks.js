import * as Blockly from "blockly";

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
    type: "sleep",
    message0: "warte %1 Millisekunden",
    args0: [
      {
        type: "input_value",
        name: "millis",
        check: "Number",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
]);

const sleepFunction = `const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));\n`;
const log = (message) =>
  `let p = document.createElement("p", {});\np.innerText = ${message};\ndocument.getElementById("console").appendChild(p);\n`;

Blockly.JavaScript["click_event"] = (block) => {
  let variable = Blockly.JavaScript.valueToCode(
    block,
    "variable",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  let statements = Blockly.JavaScript.statementToCode(block, "statement");

  return `{
    document.querySelectorAll(".squareButton").forEach((element) => {
      element.addEventListener("click", async (event) => {
        ${variable} = event.target.getAttribute("bid");
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

Blockly.JavaScript["sleep"] = (block) => {
  let value_millis = Blockly.JavaScript.valueToCode(
    block,
    "millis",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  return `{\n${sleepFunction}await sleep(${value_millis});\n}\n`;
};
