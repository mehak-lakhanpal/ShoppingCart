

function fetchProducts(done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}

function fetchVendors(done) {
    $.get('/api/vendors', function (data) {
        done(data)
    })
}

function addProduct(name, price, quantity, vendorId, done) {
    $.post('/api/products', {
        name: name,
        //  manufacturer:manuf,
        price: price,
        quantity: quantity,
        vendorId: vendorId
    }, function (data) {
        done(data)
    })
}
function refreshList() {
    fetchProducts(function (products) {
        if (jQuery.isEmptyObject(products) || (products == null)) {
            console.log("Empty")
            $('#productSec').hide()

            return
        }
        else {
            $('#productSec').show()
            console.log("Not empty")
        }
        $('#productList').empty()

        for (let product of products) {
            $('#productList').append(
                `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><button class="btn btn-danger" onclick="delProduct(${product.id})">X</button>
          </tr>`
            )
        }
    })
}

function delProduct(pid) {
    console.log("Button clicked" + pid)
    $.ajax({
        url: '/api/products',
        method: 'DELETE',
        data: {
            pid: pid
        },
        success: function (data) {
            console.log(data)
        },
        error: function (request, msg, error) {
            alert("Error deleting data")
        }
    });
    refreshList()
}

function addVendor(name) {

    $.post('/api/vendors', {
        name: name
    }, function (data) {
        done(data)
    })
}

function vendorRefreshList() {
    fetchVendors(function (vendors) {
        if (jQuery.isEmptyObject(vendors) || (vendors == null)) {
            console.log("Empty")
            $('#VendorSec').hide()
            return
        }
        else {
            $('#VendorSec').show()
            console.log("Not empty")
        }
        $('#vendorList').empty()

        for (let vendor of vendors) {
            $('#vendorList').append(
                `<tr>
            <td>${vendor.id}</td>
            <td>${vendor.name}</td>
            <td><button class="btn btn-danger" onclick="delVendor(${vendor.id})">X</button>
          </tr>`
            )
        }
    })
}

function delVendor(vid) {
    console.log("Button clicked" + vid)
    $.ajax({
        url: '/api/vendors',
        method: 'DELETE',
        data: {
            vid: vid
        },
        success: function (data) {
            console.log(data)
        },
        error: function (request, msg, error) {
            alert("Error deleting data")
        }
    });
    vendorRefreshList()

}

function createProductCard(product) {
    return $(` 
    <div class="col-3 card mx-2 p-4 ml-4 md-6">
        <h6 class="m-2">Product Name:&nbsp${product.name}</h4>
        <div class="m-2">Vendor:&nbsp${product.vendor.name}</div>
        <div class="m-2">Quantity:&nbsp${product.quantity}</div>
        <div class="row">
            <div class="col-sm-10 m-2">
            <b>Price:&nbspRs.${product.price}<b>
            </div>
        </div>
        <div class="row>
           <div class="col-sm-10">
            <button class="col btn btn-primary m-2 p-3"  onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        </div>
    </div>`
    )
}

function addToCart(productId) {
    let u = JSON.parse(localStorage.getItem("user"))
    console.log(u[0].id)
    var uid = (u[0].id)
    $.post('/api/cartitems', {
        uid: uid,
        productId: productId
    }, function (data) {
        console.log(data)
    })

    console.log("In add to cart" + productId)
}
function fetchCartItems(done) {
    let u = JSON.parse(localStorage.getItem("user"))
    console.log(u[0].id)
    var uid = (u[0].id)
    $.get(`/api/cartitems/${uid}`, function (data) {
        console.log("in fetch cart")
        console.log(data)
        done(data)
    })
}

function validateUser(name) {
    var result = null;
    $.ajax({
        url: `/api/users/${name}`,
        type: 'get',
        async: false,
        success: function (data) {
            result = data;
        }
    });
    console.log(result)
    return result;
}

function createCartList(item) {
    return $(
        `<tr>
    <td>${item.product.name}</td>
    <td>${item.product.vendor.name}</td>
    <td>${item.quantity}</td>
  </tr>`
    )
}
