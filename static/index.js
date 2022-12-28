

$(document).ready(function(){

    $(".firstQuestionInputBox").focus();
    
    $("#findOutButton").click(function(){

        if ($.trim($(".firstQuestionInputBox").val()) === "") {
            $(".firstQuestionInputBox").focus();
            return false;
          }
        else{

        let firstEntry = $(".firstQuestionInputBox").val().trim();
        window.location.href= ("/results/" +firstEntry)
      
        }
    });

    $(".firstQuestionInputBox").keyup(function() {
        if (event.which === 13) {
            event.preventDefault();
            $("#findOutButton").click();
           
          }
    })
})