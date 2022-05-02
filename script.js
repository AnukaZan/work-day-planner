
//set today's date
$("#currentDay").text(moment().format("dddd, MMMM DD"));

function auditTime(){
    //get current time
    var timeNow = moment().hour();
    
    //check every time block
    $(".time-block").each(function(){
        var taskTime = parseInt($(this).attr("id"));
        
        //if the time in the task has passed
        if (taskTime < timeNow){
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        } else if (taskTime === timeNow){ //if time is now
            $(this).removeClass("future");
            $(this).addClass("present");
            $(this).removeClass("past");
        } else{ //otherwise, if time is future
            $(this).addClass("future");
            $(this).removeClass("present");
            $(this).removeClass("past");
        }
    })
}


 //if saveBtn is clicked
$(".saveBtn").on("click", function(){
    var text = $(this).siblings("textarea").val(); //retrieve info in textarea
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, text);
})



$(document).ready(function(){
    auditTime(); //check if time has passed or not

    //load tasks
    $("#9 .text").val(localStorage.getItem("9"));
    $("#10 .text").val(localStorage.getItem("10"));
    $("#11 .text").val(localStorage.getItem("11"));
    $("#12 .text").val(localStorage.getItem("12"));
    $("#13 .text").val(localStorage.getItem("13"));
    $("#14 .text").val(localStorage.getItem("14"));
    $("#15 .text").val(localStorage.getItem("15"));
    $("#16 .text").val(localStorage.getItem("16"));
    $("#17 .text").val(localStorage.getItem("17"));
});