function pickNewType(entry){

    $.ajax({
        type: "POST",
        url: "/moreresults",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function(){
            $('.loadingDiv').show();
        },
        complete: function(){
            $('.loadingDiv').hide();
        },
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

    $( ".relationshipDiv" ).delay( 8000 ).fadeIn(600)
    $( ".inputWrapper" ).delay( 8000 ).fadeIn(600)

    pickNewType(secondEntry)
    $("#getRelationshipButton").click(function(){

        if ($.trim($(".thirdQuestionInputBox").val()) === "") {
            $(".thirdQuestionInputBox").focus();
            return false;
          }
        else{

        let thirdEntry = $(".thirdQuestionInputBox").val().trim();
        window.location.href= ("/relationship/" +thirdEntry)
        }
    })

    $(".thirdQuestionInputBox").keyup(function() {
        if (event.which === 13) {
            event.preventDefault();
            $("#getRelationshipButton").click();
           
          }
    })

    $("#reload").click(function(){
        document.location.reload(true)
    })

})