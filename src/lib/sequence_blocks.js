import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
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
    message0: "%1 %2 Millisekunden",
    args0: [
      {
        type: "field_label_serializable",
        name: "Millisekunden",
        text: "Warte",
      },
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

Blockly.JavaScript["highlightsquare"] = (block) => {
  let value_index = Blockly.JavaScript.valueToCode(
    block,
    "index",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `{\n${sleepFunction}const index = ${value_index} - 1;
    const squares = document.querySelectorAll(".squareButton");

    squares[index].classList.add("active");
    await sleep(300);
    squares[index].classList.remove("active");
    await sleep(300);\n}\n`;

  return code;
};

Blockly.JavaScript["sleep"] = function (block) {
  var value_millis = Blockly.JavaScript.valueToCode(
    block,
    "millis",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var code = `{\n${sleepFunction}await sleep(${value_millis});\n}\n`;
  return code;
};
