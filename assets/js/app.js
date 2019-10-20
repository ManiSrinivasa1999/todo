(
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
)();