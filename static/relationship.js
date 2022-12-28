function generateRelationship(entry){

    $.ajax({
        type: "POST",
        url: "/relationship",                
        dataType : "json",
        beforeSend: function(){
            $('.loadingDiv').show();
        },
        complete: function(){
            $('.loadingDiv').hide();
        },
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(entry),
        success: function(result){
            let all_data = result
            console.log(all_data)
            $.each(all_data, function(index, value){
                let listingResults =('<div class="listingResults">'+ value +'</div>')
                $(".displayResults").append(listingResults);
            })
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
        
    })

};

$(document).ready(function(){

    $( ".choicesDiv" ).delay( 8000 ).fadeIn(600)
    $( ".inputWrapper" ).delay( 8000 ).fadeIn(600)

    generateRelationship(newTopic)
    $("#choiceButton").click(function(){

        if ($.trim($(".fourthQuestionInputBox").val()) === "") {
            $(".fourthQuestionInputBox").focus();
            return false;
          }
        else{

        let fourthEntry = $(".fourthQuestionInputBox").val().trim();
        window.location.href= ("/choice/" +fourthEntry)
        }
    })

    $(".fourthQuestionInputBox").keyup(function() {
        if (event.which === 13) {
            event.preventDefault();
            $("#choiceButton").click();
           
          }
    })

    $("#reload").click(function(){
        document.location.reload(true)
    })

})