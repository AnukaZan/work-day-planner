var tasks = {};
//set today's date
$("#currentDay").text(moment().format("dddd, MMMM DD"));


//check if time block has passed or not
var auditTask = function(taskEl){
    var date = $(taskEl).find("hour").text().trim(); //get date frp, task element
 
     var time = moment(date, "hA").format("h a"); //convert into moment   
 
     var nowTime = moment().format("h a"); //save current time as moment
     var timeDif = moment(nowTime,"h a").diff(moment(time,"h a")); //find difference

    $(taskEl).removeClass("past present future");

     if (timeDif > 0){//if time has passed
        $(taskEl).addClass("past");
     }

     else if (timeDif === 0){//if time is right now
        $(taskEl).addClass("present");
     }

     else{//if time is future
        $(taskEl).addClass("future");
     }
 };



var createTask = function(taskText){
    var listEl=$("list-item d-flex row mb-3");
    var listText = $(".col-10");

    var taskP = listText
        .text(taskText);

    auditTask(listEl);
};

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    //if nothing in localStorage, create new object to track all tasks
    if(!tasks){
        tasks = {
            text: []
        };
    }

    //loop over object properties
    $.each(tasks, function(task){
            createTask(task.text);
    });
};

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Clicking on p elements turns it into textarea
$(".list-item").on("click", "p", function(){
    //save current element's inner text content
    var text=$(this)
    .text() //save current element inner text content
    .trim();

    //make new textarea element
    var textInput = $("<textarea>")
    .addClass("textarea col-10")
    .val(text);//get current value

    //replace old with new input
    $(this).replaceWith(textInput)

    textInput.trigger("focus");
});

//Save Tasks
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Using Save Button
$(".list-item").on("click", "button", function(){
    var text = $(".textarea")
    .text()
    .trim();//save text in element as text

    var index = $(".list-item")
        .attr("id"); //get id

    tasks[index].text=text;
    saveTasks();   

   //create new p element as taskP
    var taskP = $("<p>") 
    .addClass("col-10")
    .text(text);

    //replace textarea with p element
    $(".textarea").replaceWith(taskP);
});

loadTasks();

setInterval(function(){
    $(".list-item").each( //loop every task with .list-item & express it as el
      auditTask(el)
    );
  }, (1000 * 60) * 30);

