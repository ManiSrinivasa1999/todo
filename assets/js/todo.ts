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
          const addTask=document.getElementById("task") as HTMLDivElement; //getting the value
          
        }
      };
      const controller = {
        addTaskValue : () => {
          document.write('addTask');
        },
        init : () => {
          view.init();
        }
      };
      controller.init();
    }
  }
)();//anonymous function