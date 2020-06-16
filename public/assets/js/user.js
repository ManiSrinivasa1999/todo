import {firebaseConfig} from './config.js';
(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const settings = document.getElementById('settings-menu');
      const profilePicture = document.getElementById('profile-picture');
      const userName = document.getElementById('user-name');
      const logout = document.getElementById('logout');
      const userEmail = document.getElementById('user-email');
      const taskText = document.getElementById('task-text');
      const addTask = document.getElementById('add-task');
      const taskList = document.getElementById('task-list');
      const doingList = document.getElementById('doing-list');
      const doneList = document.getElementById('done-list');
      const updateBox = document.getElementById('update-box');
      const updateText = document.getElementById('update-text');
      const saveUpdate = document.getElementById('save-update');
      const cancelUpdate = document.getElementById('cancel-update');
      const model = {
        user: {},
        taskList: {
          todo: [],
          doing: [],
          done: [],
        },
        todoList: [],
      };
      const view = {
        init: () => {
          addTask.onclick = () => {
            controller.addTaskToTodo();
          };
          settings.onclick = () => {
            settings.classList.toggle('is-active');
          };
          logout.onclick = () => {
            controller.logout();
          };
          cancelUpdate.onclick = () => {
            controller.closeUpdate();
          };
          saveUpdate.onclick = ()=> {
            controller.updateTodo();
          };
          view.render();
        },
        render: () => {
          profilePicture.src = model.user.photoURL;
          userName.innerHTML = model.user.displayName;
          userEmail.innerHTML =model.user.email;
          taskList.innerHTML = '';
          doingList.innerHTML ='';
          doneList.innerHTML ='';
          for (let i = 0; i < model.taskList.length; i += 1) {
            if (model.taskList[i].status === 'todo') {
              const card=document.createElement('div');
              card.classList.add('card', 'drag');
              card.setAttribute('draggable', 'true');
              const cardHeader = document.createElement('div');
              cardHeader.classList.add('card-header');
              const cardHeaderDeleteIcon = document.createElement('a');
              const cardHeaderEditIcon = document.createElement('a');
              const cardContent = document.createElement('div');
              cardContent.classList.add('card-content');
              cardContent.innerHTML=`<p class="title">
              ${model.taskList[i].text}
              </p>`;
              cardHeaderDeleteIcon.classList.add('card-header-icon');
              cardHeaderEditIcon.classList.add('card-header-icon');
              cardHeaderDeleteIcon.innerHTML = `
              <span class="icon">
              <i class="fas fa-trash" aria-hidden="true"></i>
              </span>`;
              cardHeaderEditIcon.innerHTML = `
              <span class="icon">
              <i class="fas fa-user-edit" aria-hidden="true"></i>
              </span>`;
              cardHeaderDeleteIcon.onclick = () =>{
                controller.deleteTodo(model.taskList[i].id);
              };
              cardHeaderEditIcon.onclick = () =>{
                controller.editTodo(
                    model.taskList[i].id,
                    model.taskList[i].text,
                );
              };
              cardHeader.appendChild(cardHeaderDeleteIcon);
              cardHeader.appendChild(cardHeaderEditIcon);
              card.appendChild(cardHeader);
              card.appendChild(cardContent);
              card.ondragstart=(evt)=>{
                evt.dataTransfer.setData('id', model.taskList[i].id);
              },
              taskList.appendChild(card);
              const footer = document.createElement('footer');
              footer.classList.add('card-footer');
              const ongoingButton = document.createElement('button');
              ongoingButton.classList.add(
                  'card-footer-item',
                  'button',
                  'ongoing',
                  'is-warning',
              );
              ongoingButton.innerText = 'Doing';
              ongoingButton.onclick = () => {
                controller.updateStatus(model.taskList[i].id, 'doing');
              };
              footer.appendChild(ongoingButton);
              const completedButton = document.createElement('button');
              completedButton.classList.add(
                  'card-footer-item',
                  'button',
                  'completed-todo',
                  'is-success',
              );
              completedButton.innerText = 'Closed';
              completedButton.onclick = () => {
                controller.updateStatus(model.taskList[i].id, 'done');
              };
              footer.appendChild(completedButton);
              taskList.appendChild(footer);
            } else if (model.taskList[i].status === 'doing') {
              const card=document.createElement('div');
              card.classList.add('card', 'drag');
              card.setAttribute('draggable', 'true');
              const cardHeader = document.createElement('div');
              cardHeader.classList.add('card-header');
              const cardHeaderDeleteIcon = document.createElement('a');
              const cardHeaderEditIcon = document.createElement('a');
              const cardContent = document.createElement('div');
              cardContent.classList.add('card-content');
              cardContent.innerHTML=`<p class="title">
              ${model.taskList[i].text}
              </p>`;
              cardHeaderDeleteIcon.classList.add('card-header-icon');
              cardHeaderEditIcon.classList.add('card-header-icon');
              cardHeaderDeleteIcon.innerHTML = `
              <span class="icon">
              <i class="fas fa-trash" aria-hidden="true"></i>
              </span>`;
              cardHeaderEditIcon.innerHTML = `
              <span class="icon">
              <i class="fas fa-user-edit" aria-hidden="true"></i>
              </span>`;
              cardHeaderDeleteIcon.onclick= () =>{
                controller.deleteTodo(model.taskList[i].id);
              };
              cardHeaderEditIcon.onclick= () =>{
                controller.editTodo(
                    model.taskList[i].id,
                    model.taskList[i].text,
                );
              };
              cardHeader.appendChild(cardHeaderDeleteIcon);
              cardHeader.appendChild(cardHeaderEditIcon);
              card.appendChild(cardHeader);
              card.appendChild(cardContent);
              card.ondragstart=(evt)=>{
                evt.dataTransfer.setData('id', model.taskList[i].id);
              },
              doingList.appendChild(card);
              const footer = document.createElement('footer');
              footer.classList.add('card-footer');
              const completedButton = document.createElement('button');
              completedButton.classList.add(
                  'card-footer-item',
                  'button',
                  'completed-todo',
                  'is-success',
              );
              completedButton.innerText = 'Closed';
              completedButton.onclick = () => {
                controller.updateStatus(model.taskList[i].id, 'done');
              };
              footer.appendChild(completedButton);
              doingList.appendChild(footer);
            } else if (model.taskList[i].status === 'done') {
              const card= document.createElement('div');
              card.classList.add('card');
              card.setAttribute('draggable', 'true');
              card.innerHTML=`
              <div class="card-content">
                  <p class="title">
                    ${model.taskList[i].text}
                  </p>
                </div>
              `;
              card.ondragstart=(evt)=>{
                evt.dataTransfer.setData('id', model.taskList[i].id);
              };
              doneList.appendChild(card);
            }
          }
          taskList.ondrop =(evt) => {
            evt.preventDefault();
            const id =evt.dataTransfer.getData('id');
            controller.updateStatus(id, 'todo');
          };
          taskList.ondragover=(evt)=>{
            evt.preventDefault();
          };
          doingList.ondrop =(evt) => {
            evt.preventDefault();
            const id =evt.dataTransfer.getData('id');
            controller.updateStatus(id, 'doing');
          };
          doingList.ondragover=(evt)=>{
            evt.preventDefault();
          };
          doneList.ondrop =(evt) => {
            evt.preventDefault();
            const id =evt.dataTransfer.getData('id');
            controller.updateStatus(id, 'done');
          };
          doneList.ondragover=(evt)=>{
            evt.preventDefault();
          };
        },
      };
      const controller = {
        handleOnDrop: ()=>{
          alert('drop');
        },
        editTodo: (id, text)=>{
          model.updateId = id;
          updateText.value = text;
          controller.openUpdate();
        },
        validateTodo: (text)=>{
          return text.length>0;
        },
        updateTodo: ()=>{
          if (!controller.validateTodo(updateText.value)) {
            alert('text have to be writeen');
            return;
          }
          db.collection('storeData').doc(model.updateId)
              .update({
                text: updateText.value,
              })
              .then(() => {
                controller.closeUpdate();
              })
              .catch(() => {
                alert('Please try later.');
              });
        },
        openUpdate: ()=>{
          updateBox.classList.add('is-active');
        },
        closeUpdate: ()=>{
          updateBox.classList.remove('is-active');
        },
        deleteTodo: (id)=>{
          db.collection('storeData').doc(id).delete().then(() => {
            alert('Document successfully deleted!');
          }).catch((error)=> {
            alert('Error removing document: ');
          });
        },
        updateStatus: (id, status) => {
          db.collection('storeData').doc(id)
              .update({
                status: status,
              })
              .then(() => {
              })
              .catch(() => {
                alert('Please try later.');
              });
        },
        addTaskToTodo: () => {
          if (taskText.value !== '') {
            db.collection('storeData').add({
              text: taskText.value,
              status: 'todo',
            })
                .then(() => {
                })
                .catch(() => {
                  alert('Please try later.');
                });
            view.render();
          } else {
            alert('Fill the text area');
          }
          taskText.value='';
        },
        logout: () => {
          firebase.auth().signOut();
        },
        setUser: (user) => {
          model.user = user;
          view.render();
        },
        setTodoList: (taskList) => {
          model.taskList = taskList;
          view.render();
        },
        init: () => {
          db.collection('storeData').onSnapshot(
              (docSnapshot) => {
                const todoList = [];
                docSnapshot.forEach((doc) => {
                  if (doc.exists) {
                    const taskList = doc.data();
                    taskList.id = doc.id;
                    todoList.push(taskList);
                  }
                });
                controller.setTodoList(todoList);
              },
              (err) => {
                alert(err);
              });
          view.init();
        },
      };
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          controller.setUser(user);
          controller.init();
          // ...
        } else {
          // User is signed out.
          window.location.href = './index.html';
          // ...
        }
      });
    }
  }
)();
