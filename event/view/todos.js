let template

const createNewTodoNode = () => {
  if(!template) {
    template = document.getElementById('todo-item')
  }
  
  return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index, events) => {
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

    element.querySelector('input.toggle').dataset.index = index
    element.querySelector('button.destroy').dataset.index = index

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

  

  export default (targetElement, { todos }, events) => {
    const newTodoList = targetElement.cloneNode(true)

    newTodoList.innerHTML = ''

    todos
      .map((todo, index) => getTodoElement(todo, index, events))
      .forEach(element => {
        newTodoList.appendChild(element)
      })

    // 이벤트 위임을 통해 각 todoItem이 아닌 부모 요소에서 캐치한다
    newTodoList.addEventListener('click', e => {
      if(e.target.matches('button.destroy')) {
        events.deleteItem(e.target.dataset.index)
      }
      else if(e.target.matches('input.toggle')) {
        events.toggleItem(e.target.dataset.index)
      }
    })
      
    return newTodoList
  }