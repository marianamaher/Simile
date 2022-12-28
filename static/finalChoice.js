function getFinalChoice(entry){

    $.ajax({
        type: "POST",
        url: "/choice",                
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
                if(value==="Choose a valid option."){
                    let backButton = ('<br><button id="goBackButton">🔙</button>')
                    $(".displayResults").append(backButton);
                    $("#goBackButton").click(function(){
                        parent.history.back();
                    })
                }
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

    getFinalChoice(fourthEntry)

    
    $("#backToHomeButton").click(function(){
        window.location.href= ("/")
    
    })

    $("#reload").click(function(){
        document.location.reload(true)
    })


})