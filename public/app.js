function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id="idCard_${task.id}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <div class="container">
            <div class="row">

              <div class="col">
                <form id="id_${task.id}" method="post" action="/doneTask/:${task.id}">
                  <input type="submit" value="Done" class="btn btn-primary" onclick="taskDone(${task})">
                </form>
              </div>

              <div class="col">
              </div>
                <form id="id_${task.id}" method="post" action="/deleteTask/:${task.id}">
                  <input type="submit" value="Delete" class="btn btn-danger" onclick="deleteTask(${task})>
                </form>
              </div>

          </div>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function taskDone(id) {
  console.log('Task is done', id);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: id})
  };

  fetch(`/doneTask/${id}`, payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {


     let html =  `
      <div id="idCard_${task.id}" class="card my-3">
        <div class="card-body">
          <p class="card-text">${task.description}</p>
          <div class="container">
                <div class="row">

                  <div class="col">
                    <form id="id_${task.id}" method="post" action="/doneTask/:${task.id}">
                      <input type="submit" value="Done" class="btn btn-primary" onclick="taskDone(${task.id})">
                    </form>
                  </div>

                  <div class="col">
                  </div>
                    <form id="id_${task.id}" method="post" action="/deleteTask/:${task.id}">
                      <input type="submit" value="Delete" class="btn btn-danger" onclick="deleteTask(${task})>
                    </form>
                  </div>

              </div>
        </div>
      </div>
      `;

      let id = 'id_' + task.id;
      document.getElementById(id).innerHTML = html;
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function editTask(task) {
  let html =
  `
  <div id="idCard_${task.id}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <div class="container">
            <div class="row">

              <div class="col">
                <form id="id_${task.id}" method="post" action="/doneTask/:${task.id}">
                  <input type="submit" value="Done" class="btn btn-primary" onclick="taskDone(${task.id})">
                </form>
              </div>

              <div class="col">
              </div>
                <form id="id_${task.id}" method="post" action="/deleteTask/:${task.id}">
                  <input type="submit" value="Delete" class="btn btn-danger" onclick="deleteTask(${task})>
                </form>
              </div>

          </div>
    </div>
  </div>
  `;

  let id = `id_${task.id}`;

  document.getElementById(id).innerHTML = html;
}

function deleteTask(id) {
  console.log('Task is deleted ajax', id);

  let payload = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: id})
  };


  fetch(`/deleteTask/${id}`, payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      let idCard = `idCard_${id}`;
      document.getElementById(idCard).remove();
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}



/*
<form action="/tasks/${task.id}/done" method="POST">
        <a href="javascript:;" onclick="parentNode.submit();" class="card-link">Done</a>
      </form>
*/
