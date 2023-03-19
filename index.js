const container = document.querySelector(".container")
const stringBox = document.querySelector(".string")

cellArr = "abcd".split("")

function createCells(length) {
  for (let i = 0; i < length; i++) {
    const cell = document.createElement("cell")
    cell.classList.add("cellBox")
    cell.setAttribute("draggable", "true")
    cell.setAttribute("ondragstart", "drag(event)")
    cell.id = i
    const createTextArea = document.createElement("textarea")
    createTextArea.textContent = cellArr[i]
    createTextArea.classList.add("cellText")
    createTextArea.maxLength = 1
    cell.append(createTextArea)
    if (i > 0) {
      const createHidden = document.createElement("div")
      createHidden.classList.add("hidden")
      cell.append(createHidden)
    }
    container.append(cell)
    stringBox.textContent = cellArr.join("")
  }
  //Hidden button functionality
  const hiddenButton = document.querySelectorAll(".hidden")
  hiddenButton.forEach(a => {
    a.addEventListener("click", () => {
      cellArr.splice(a.parentElement.id, 0, "")
      removeAllChildNodes(container)
      createCells(cellArr.length)
      animate(a.parentElement.id, "faded-out")
    })
  })
  //Textarea functionality
  const textarea = document.querySelectorAll(".cellText")
  textarea.forEach(t => {
    t.addEventListener("change", () => {
      cellArr[t.parentElement.id] = t.value
      stringBox.textContent = cellArr.join("")
    })
  })
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

//animation function
function animate(id, animation) {
  const findNew = document.getElementById(id)
  findNew.classList.add(animation)
  requestAnimationFrame(() => {
    findNew.classList.remove(animation)
  })
}

createCells(cellArr.length)

//drag and drop functions
function allowDrop(ev) {
  ev.preventDefault()
}
function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id)
  ev.target.classList.add("dragging")
}
function drop(ev) {
  var data = ev.dataTransfer.getData("Text")
  var el = document.getElementById(data)
  el.parentNode.removeChild(el)
  cellArr.splice(el.id, 1)
  removeAllChildNodes(container)
  createCells(cellArr.length)
}
