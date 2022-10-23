export const logMessage = (message, type = "info") => {
  let element = document.createElement("p");
  element.innerText = message;
  element.className = type;

  let console = document.getElementById("console");
  console.insertBefore(element, console.firstElementChild);
};

/**
 * Removes all event listeners for each element with the attribute `data-event`.
 */
export const removeAllListeners = () => {
  document.querySelectorAll("[data-event]").forEach((element) => {
    let clone = element.cloneNode(true);
    element.replaceWith(clone);
  });
};
