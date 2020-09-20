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
  <div class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <div class="container">
            <div class="row">

              <div class="col">
                <form method="post" action="/doneTask/:${task.id}">
                  <input type="submit" value="Done" class="btn btn-primary" onclick="taskDone(${task})">
                </form>
              </div>

              <div class="col">
              </div>
                <form method="post" action="/deleteTask/:${task.id}">
                  <input type="submit" value="Delete" class="btn btn-danger">
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
    body: JSON.stringify({ status: 'done' })
  };

  fetch(`/taskDone/:${task.id}`, payload)
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

/*
<form action="/tasks/${task.id}/done" method="POST">
        <a href="javascript:;" onclick="parentNode.submit();" class="card-link">Done</a>
      </form>
*/
