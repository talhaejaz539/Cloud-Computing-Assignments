
$(document).ready(function() {

    var message = document.querySelector('#message')
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
                    $('#dataList tbody')
                    $(rows).appendTo('#dataList tbody')
                }
                else {
                    message.innerHTML = "There is no data in the Database."
                }
                setTimeout(() => {
                    message.innerHTML = ""
                }, 3000)
            }
        })
    })

})