let template

const createNewTodoNode = () => {
  if(!template) {
    template = document.getElementById('todo-item')
  }
  
  return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = todo => {
    const {
      text,
      completed
    } = todo

    const element = createNewTodoNode()

    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text

    if(completed) {
      element.classList.add('completed')
      element.querySelector('input.toggle').checked = true
    }

    return element
  
    // text로 되어있던 item을 template으로 변경한다.

    // return `
    //     <li ${completed ? 'class="completed"' : ''}>
    //       <div class="view">
    //         <input 
    //           ${completed ? 'checked' : ''}
    //           class="toggle" 
    //           type="checkbox">
    //         <label>${text}</label>
    //         <button class="destroy"></button>
    //       </div>
    //       <input class="edit" value="${text}">
    //     </li>`
  }
  
  export default (targetElement, { todos }) => {
    const newTodoList = targetElement.cloneNode(true)

    newTodoList.innerHTML = ''

    todos
      .map(getTodoElement)
      .forEach(element => {
        newTodoList.appendChild(element)
      })
      
    return newTodoList
  }