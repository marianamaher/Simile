function getMetaphors(entry){

    $.ajax({
        type: "POST",
        url: "/results",                
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

    $( ".typeOfMetaphorsDiv" ).delay( 10000 ).fadeIn(600)
    $( ".inputWrapper" ).delay( 10000 ).fadeIn(600)

    getMetaphors(firstEntry)
    $("#generateMoreButton").click(function(){

        if ($.trim($(".secondQuestionInputBox").val()) === "") {
            $(".secondQuestionInputBox").focus();
            return false;
          }
        else{

        let secondEntry = $(".secondQuestionInputBox").val().trim();
        window.location.href= ('/moreresults/' +secondEntry)
        }

    })

    $(".secondQuestionInputBox").keyup(function() {
        if (event.which === 13) {
            event.preventDefault();
            $("#generateMoreButton").click();
           
          }
    })

    $("#reload").click(function(){
        document.location.reload(true)
    })


})