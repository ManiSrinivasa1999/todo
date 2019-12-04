(document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var model = {};
        var view_1 = {
            init: function () {
                view_1.render();
            },
            render: function () {
                var addTask = document.getElementById("task"); //getting the value
                /*addTask.onkeypress = () => {
                  controller.addTaskValue();
                }*/
            }
        };
        var controller = {
            addTaskValue: function () {
            },
            init: function () {
                view_1.init();
            }
        };
        controller.init();
    }
})(); //anonymous function
