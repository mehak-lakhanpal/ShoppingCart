$(function () {
    var vendorId
    (function getDropDown() {
        $.get('/api/vendors', function (data) {
            for (d of data) {
                $('#productManufacturer').append($(`<li><a class="dropdown-item" id=${d.id}>${d.name}</a>`))

                $("a").click(function(){
                   // $('#productManufacturer').val($(this).text());
                    vendorId = $(this).attr("id")
                    return false;
                });
            }
        })
    })()
    
      refreshList()
    
    let productName = $('#productName')
   // let productManufacturer = $('#productManufacturer')
    let productPrice = $('#productPrice')
    let productQuant = $('#productQuant')
    $('#btnProductAdd').click(function () {
        addProduct(
            productName.val(),
            //productManufacturer.val(),
            productPrice.val(),
            productQuant.val(),
            vendorId,
            function (addedProduct) {
                window.alert("Added " + addedProduct.name + " to Database")
                refreshList()
                productName.val("")
                productPrice.val("")
                productQuant.val(0)
            }
        )
    })
})