//=============================================================================
// JavaScript file to handle buttom presses
//
//=============================================================================
var api = process.env.API_GATEWAY // get the API Gateway from the environment

$(document).ready(function() {

    // Get a Quote
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

    // Get a Test String
    $("#btnTest").click(function() {
        $.ajax({
            url: api + "/api/test",
            type: "GET",
            dataType: "json",
            timeout: 3000,
            success: function(data) {
                $("#test").removeClass('is-danger') 
                $("#test").addClass('is-link')
                $("#test").html(data.test.string + '</br></br><b>Service details - \['+ data.test.details +'\]</b>'); 
            },
            error: function(xmlhttprequest, textstatus, message) {
                $("#test").removeClass('is-link')
                $("#test").addClass('is-danger')
                if(textstatus==="timeout") {
                    $( "#test" ).html("got timeout");
                } else {
                    $( "#test" ).html(message);
                }
            }
        })
    })
})