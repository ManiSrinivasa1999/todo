(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const model = {
      
      };
      const view = {
        init : () => {
          view.render();
        },
        render : () => {
          const addTask=document.getElementById("task").value; //getting the value
          addTask.onkeypress = () => {
            controller.addTaskValue();
          }
        }
      };
      const controller = {
        addTaskValue : () => {

        },
        init : () => {
          view.init();
        }
      };
      controller.init();
    }
  }
)();//anonymous function