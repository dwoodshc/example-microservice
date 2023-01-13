var api = process.env.API_GATEWAY // get the API Gateway from the environment

$(document).ready(function() {
    $("#btn").click(function() {
        $.ajax({
            url: api + "/api/randomquote",
            type: "GET",
            dataType: "json",
            timeout: 3000,
            success: function(data) {
                $("#quote").removeClass('is-danger') 
                $("#quote").addClass('is-link')
                $("#quote").html(data.quote.quote + '</br><b>'+ data.quote.by +'</br></br><b>Service details - \['+ data.quote.details +'\]</b>'); 
            },
            error: function(xmlhttprequest, textstatus, message) {
                $("#quote").removeClass('is-link')
                $("#quote").addClass('is-danger')
                if(textstatus==="timeout") {
                    $( "#quote" ).html("got timeout");
                } else {
                    $( "#quote" ).html(message);
                }
            }
        })
    })



    $("#btnDave").click(function() {
        $.ajax({
            url: api + "/api/davequote",
            type: "GET",
            dataType: "json",
            timeout: 3000,
            success: function(data) {
                $("#quoteDave").removeClass('is-danger') 
                $("#quoteDave").addClass('is-link')
                $("#quoteDave").html(data.quote.quote + '</br></br><b>Service details - \['+ data.quote.details +'\]</b>'); 
            },
            error: function(xmlhttprequest, textstatus, message) {
                $("#quoteDave").removeClass('is-link')
                $("#quoteDave").addClass('is-danger')
                if(textstatus==="timeout") {
                    $( "#quoteDave" ).html("got timeout");
                } else {
                    $( "#quoteDave" ).html(message);
                }
            }
        })
    })



})