export const sleepFunction = `const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));\n`;

/**
 * Logs a message to the user console.
 *
 * ```javascript
 * log("'Simple message'")
 * log("'1 + 1 is ' + (1 + 1)")
 * ```
 * @param message JavaScript statement
 */
export const log = (message) => `{
    let console = document.getElementById("console");
    let p = document.createElement("p", {});
    p.innerText = ${message};
    console.insertBefore(p, console.firstElementChild);
  }`;
