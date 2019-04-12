$(function(){

    vendorRefreshList()

    $('#btnVendor').click(function () {
        let vendorName = $('#vendorName')
        addVendor(
            vendorName.val(),
            function (addedVendor) {
                vendorRefreshList()
                window.alert("Added " + addedVendor.name + " to Database")
                vendorName.val("")
            })
    })
})