const container = document.querySelector(".container")
const stringBox = document.querySelector(".string")
const dropArea = document.querySelector(".drop-area")

cellArr = "abcd".split("")

function createCells(length) {
  for (let i = 0; i < length; i++) {
    const cell = document.createElement("cell")
    cell.classList.add("cellBox")
    cell.setAttribute("draggable", "true")
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
  //Drag and drop functionality
  const draggables = document.querySelectorAll(".cellBox")
  let allowDrop = false
  let currentId
  draggables.forEach(box => {
    box.addEventListener("dragstart", e => {
      dropArea.classList.add("drop-visible")
      currentId = box.id
    })

    box.addEventListener("dragend", e => {
      if (allowDrop && cellArr.length > 2) {
        container.removeChild(box)
        cellArr.splice(box.id, 1)
        removeAllChildNodes(container)
        createCells(cellArr.length)
        dropArea.className = "drop-area"
        allowDrop = false
      } else {
        dropArea.className = "drop-area"
        box.className = "cellBox"
      }
      currentId = undefined
    })
  })
  function changeCell(opacity) {
    if (currentId != undefined) {
      const boxID = document.getElementById(currentId)
      boxID.style.opacity = opacity
    }
  }
  dropArea.addEventListener("dragover", e => {
    e.preventDefault()
    if (cellArr.length > 2) {
      dropArea.classList.add("drop-visible")
      changeCell(0.3)
    } else {
      dropArea.classList.add("cannot-drop")
    }
    allowDrop = true
  })
  dropArea.addEventListener("dragleave", () => {
    dropArea.className = "drop-area"
    if (currentId != undefined) {
      const boxID = document.getElementById(currentId)
      changeCell(1)
    }
    allowDrop = false
  })
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
