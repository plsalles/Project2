document.querySelectorAll('.edit-subtask-button').forEach(button => {
  button.onclick = async e => {
    const subTaskId = e.currentTarget.getAttribute('sub-task');

    const { data } = await axios.get(`http://localhost:3000/api/subtask?id=${subTaskId}`);

    const subTaskContainer = document.getElementById(`sub-task-${subTaskId}`);

    let optionsHTML = '';

    const statusOptions = [
      { value: 'TODO', text: 'To do' },
      { value: 'ONGOING', text: 'Ongoing' },
      { value: 'DONE', text: 'Done' },
      { value: 'CANCELED', text: 'Canceled' },
    ];

    statusOptions.sort((a, b) => {
      if (a.value === data.status) return -1;
      
      return 0;
    });

    statusOptions.forEach(option => {
      optionsHTML += `
        <option value=${option.value}>${option.text}</option>
      `;
    })

    subTaskContainer.innerHTML = `
      <form id="edit-subtask-form-${subTaskId}">
        <input type="text" name="title" placeholder="Digite o nome da sua sub-tarefa" value=${data.title}>
        <input type="text" name="description" placeholder="Digite a descrição da sua sub-tarefa" value=${data.description}>
        <select name="status">
          ${optionsHTML}
        </select>
        <input type="date" name="dueDate" value=${data.dueDate.split('T')[0]}>

        <button type="submit">Editar sub-tarefa</button>
      </form>
    `;

    document.getElementById(`edit-subtask-form-${subTaskId}`).onsubmit = async e => {
      e.preventDefault();
      const formElements = e.currentTarget.elements;
      const bodyRequest = {};

      for (let i = 0; i < formElements.length; i += 1) {
        const { name, value } = formElements[i];

        if (name) bodyRequest[name] = value;
      }

      await axios.post(`http://localhost:3000/api/subtask/${subTaskId}`, bodyRequest);

      window.location = `http://localhost:3000/task/detail/${data.task}`;
    };
  };
});