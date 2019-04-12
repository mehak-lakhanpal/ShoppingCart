
$(function() {
    let productList = $('#product-list')
    let userName = $('#userName')

    $('#btnLogin').click(function () {
    var userobj =validateUser(userName.val())
    console.log(userobj)
        if(jQuery.isEmptyObject(userobj)||userobj==null ){
           
            alert("Invalid")
        }else{
            localStorage.setItem('user',JSON.stringify(userobj));
            console.log(JSON.parse(localStorage.getItem('user')));
            $('#viewcartbtn').show();
            fetchProducts(function(products){
                productList.empty()
                for(product of products){
                    productList.append(createProductCard(product))
                }
            })
        }
    })
    //setter
    $('#viewcartbtn').click(function(){
        console.log("here")
        fetchCartItems(function(items){
            console.log("fetched items")
            localStorage.setItem('itemsList',JSON.stringify(items))
            console.log(JSON.parse(localStorage.getItem('itemsList')));
        })
        window.location=`./display_cart.html`
    })
})

