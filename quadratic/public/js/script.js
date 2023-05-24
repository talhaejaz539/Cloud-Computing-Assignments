
$(document).ready(function() {

    var msg = document.querySelector('#msg')
    var message = document.querySelector('#message')

    // Calling API of Solve on given values
    $("#submitForm").on('click', function(e) {
        e.preventDefault()
        var a = $("#valueA").val()
        var b = $("#valueB").val()
        var c = $("#valueC").val()
        if(a != "" && b != "" && c != "") {
            $.ajax({
                url: "/quadraticSolve" + "?a=" + a + "&b=" + b + "&c=" + c,
                type: "GET",
                success: function(data) {
                    if(data.error) {
                        msg.innerHTML = data.error
                    }
                    else if(data._id) {
                        msg.innerHTML = "Solved by Quadratic Formula. The solution is ("+data.FirstRoot+", "+data.SecondRoot+")"
                    }
                    else {
                        msg.innerHTML = "Could not connect to Database!"
                    }
                    setTimeout(() => {
                        msg.innerHTML = ""
                    }, 4000)
                } 
            })
        }
        else {
            msg.innerHTML = "All fields contain values!"
            setTimeout(() => {
                msg.innerHTML = ""
            }, 4000)
        }
    })

    // Calling API of Read all Database
    $('#readAllSolutions').on('click', function(e) {
        
        $.ajax({
            url: "/readAll",
            type: "GET",
            success: function(data) {
                if(data.error) {
                    message.innerHTML = data.error
                }
                else if(data.length > 0) {
                    var rows = ""
                    var i = 1
                    $.each(data, function() {
                        rows += "<tr><td>" + i + "</td><td>" + this.A + "</td><td>" + this.B + "</td><td>" + this.C + "</td><td>" + this.FirstRoot + "</td><td>" + this.SecondRoot + "</td></tr>"
                        i++
                    })
                    $('#dataList tbody').empty()
                    $(rows).appendTo('#dataList tbody')
                }
                else {
                    message.innerHTML = "There is no data in the Database."
                }
                setTimeout(() => {
                    message.innerHTML = ""
                }, 4000)
            }
        })
    })

})