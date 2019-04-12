
$(function () {
    let cartList = $('#cartList')
    let totalqty = $('#totalqty')
    let totalprice = $('#totalprice')
    let itemsList = JSON.parse(localStorage.getItem('itemsList'))
    console.log(itemsList)
    if (jQuery.isEmptyObject(itemsList)||(itemsList==null)) {
        $('#emptyList').show();
    } else {
        console.log("List not Empty")
        $('#cartItemsSec').show();
        var totalQ = 0;
        var totalP = 0;
        for (i of itemsList) {
            totalQ += i.quantity;
            totalP += i.product.price
            cartList.append(createCartList(i))
        }
        console.log(totalP + " " + totalQ)
        totalqty.text(`Total Quantity : ${totalQ}`)
        totalprice.text(`Total Price : ${totalP}`)
    }
})