/*(
  document.onreadystatechange = () => {
    if(document.readyState === 'complete') {  
      const data = {
        pendingtasks : [],
        completetasks : [] 
      };
      const View = {
        init : () => {
          View.update();
        },
        update : () => {
          const task = document.getElementById("task").value;
          
        },
      };
      const controller = {
        pressenter : () => {
                    
        },
        init : () => {
          View.init();
        },
      };
      controller.init();
    }
  }
)();*/
(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const model = {
        pendingtasks : [],
        completedtasks : []
      };
      const View = {
        init : () => {
          View.update();
        },
        update : () => {
          const task = document.getElementById("task").value;
          //console.log(task);
        }
      };
      const controller = {
        pressenter : () => {
          task.onkeypress;
        },
        init : () => {
          View.init();
        },
      };
      controller.init();
    }
  }
)();
