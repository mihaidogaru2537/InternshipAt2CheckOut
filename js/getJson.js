
var url = 'http://private-32dcc-products72.apiary-mock.com/product';
var myProducts;
var quantityVector;

var checkoutCol = document.getElementById('col_checkout');
var mesaj_checkout = document.getElementById('mesaj_checkout');

var tableNamesTag;
var totalRowTag;
var totalValueTag;
var linieTag;
var totalTextTag;

var nrCart = 0;
var totalValue = 0;

var noProducts = "There are no products in your shopping cart!";
var someProducts = "Products in your shopping cart";

var idx = 0;

var lista = document.getElementById('lista_produse');
var prouctTilesVector = new Array();

function createItemRow(id) {
    var newItem = document.createElement('div');
    newItem.classList.add("row", "selected-item");
    newItem.id = 'item' + id;
    return newItem;
}

function createItemName(index) {
    var newItem = document.createElement('div');
    newItem.classList.add('col-lg-5', 'product_name');

    var text = document.createElement('span');
    text.innerHTML = myProducts[index].name;
    text.setAttribute('title', myProducts[index].description);

    newItem.appendChild(text);

    return newItem;
}

function onRemoveItemFromCart(index) {
    nrCart--;
    var removedItem = document.getElementById('item'+index);
    removedItem.parentNode.removeChild(removedItem);

    lista.appendChild(prouctTilesVector[index]);

    if (nrCart == 0) {
        mesaj_checkout.innerHTML = noProducts;
        linieTag.parentNode.removeChild(linieTag);
        totalRowTag.parentNode.removeChild(totalRowTag);
        tableNamesTag.parentNode.removeChild(tableNamesTag);

        linieTag = null;
        totalRowTag = null;
        tableNamesTag = null;
        totalTextTag = null;
        totalValueTag = null;

        createCheckoutItems();
    }

}

function createItemButton(index) {
    var span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    var btn = document.createElement('button');
    btn.classList.add('close', 'product_button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Close');
    btn.appendChild(span);

    btn.onclick = function () {
        onRemoveItemFromCart(index);
    };

    var newItem = document.createElement('div');
    newItem.classList.add('col-lg-3');
    newItem.appendChild(btn);

    return newItem;
}



function onInputChange(index) {
    var val = document.getElementById('value' + index);
    var quantity = document.getElementById('quantity' + index);
    var prevQuantity = quantityVector[index];

    var newQuantity = quantity.value;

    //if the value inserted is not valid, don't do anything.
    if (isNaN(newQuantity)) {
        return;
    }

    if (newQuantity == null) {
        return;
    }

    if (newQuantity == '') {
        return;
    }

    //calculate how much you need to add to totalPrice, depending on the previous quantity
    var toUpdateTotalSum = (parseFloat(newQuantity) - prevQuantity) * parseFloat(myProducts[index].price);
    toUpdateTotalSum = Number(toUpdateTotalSum.toFixed(2));
    updateTotalPrice(toUpdateTotalSum);

    //updating the quantity vector
    quantityVector[index] = parseFloat(newQuantity);

    var totalSum = parseFloat(newQuantity) * parseFloat(myProducts[index].price);
    totalSum = Number(totalSum.toFixed(2));
    val.innerHTML = '' + totalSum;
}

function createItemQuantity(index) {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('product_quantity');
    input.oninput = function () {
        onInputChange(index);
    };
    input.defaultValue = '1';
    input.id = 'quantity' + index;

    var newItem = document.createElement('div');
    newItem.classList.add('col-lg-2');
    newItem.appendChild(input);
    return newItem;
}

function updateTotalPrice(value) {
    //update the total price tag
    totalValue = parseFloat(totalValue) + value;
    totalValue = Number(totalValue.toFixed(2));

    var item = document.getElementById('totalValue');

    item.innerHTML = '$' + totalValue;
}

function createItemValue(index) {
    var value = document.createElement('div');
    value.classList.add('col-lg-2', 'product_value');
    value.innerHTML = '$' + myProducts[index].price;
    value.id = 'value' + index;

    updateTotalPrice(parseFloat(myProducts[index].price));

    return value;
}

function createCartTile(id) {
    var vectorAux = id.split("tile");
    var index = vectorAux[1];
    quantityVector[index] = 1;

    var itemRow = createItemRow(index);

    var itemName = createItemName(index);
    var deleteButton = createItemButton(index);
    var quantityInput = createItemQuantity(index);
    var itemValue = createItemValue(index);

    itemRow.appendChild(itemName);
    itemRow.appendChild(deleteButton);
    itemRow.appendChild(quantityInput);
    itemRow.appendChild(itemValue);

    return itemRow;
}

function createName() {
    var newItem = document.createElement('p');
    var newText = document.createTextNode(myProducts[idx].name);
    newItem.appendChild(newText);
    newItem.classList.add("nume_produs");

    return newItem;
}

function createPriceText() {
    var newItem = document.createElement('p');
    var newText = document.createTextNode('Price:');
    newItem.appendChild(newText);
    newItem.classList.add("pret_produs");

    return newItem;
}

function createPriceDigit() {
    var newItem = document.createElement('p');
    var newText = document.createTextNode('$' + myProducts[idx].price)
    newItem.appendChild(newText);
    newItem.classList.add("pret_digit");

    return newItem;
}


function insertAuxiliars() {
    checkoutCol.appendChild(tableNamesTag);
    checkoutCol.appendChild(linieTag);
    checkoutCol.appendChild(totalRowTag);
}

function removeFromList(id) {

    item = document.getElementById(id);

    if (nrCart == 0) {
        mesaj_checkout.innerHTML = someProducts;
        insertAuxiliars();
    }

    var cart_tile = createCartTile(id);
    var pos = 2 + nrCart;

    //checkoutCol.insertBefore(cart_tile, checkoutCol.lastElementChild);
    linieTag.insertAdjacentElement('beforebegin', cart_tile);

    //increase the number of items inside cart
    nrCart++;
    item.parentNode.removeChild(item);
}

function createAddButton() {
    var newItem = document.createElement('button');
    var newText = document.createTextNode('Add to cart');
    newItem.type = "button";
    newItem.appendChild(newText);
    newItem.classList.add("btn", "btn-success", "add_to_cart");
    var deletedId = 'tile' + idx;
    newItem.onclick = function() {
      removeFromList(deletedId);
    };

    return newItem;
}

function createRow(e1, e2, e3, e4) {
    var newItem = document.createElement('div');
    newItem.classList.add('row');

    newItem.appendChild(e1);
    newItem.appendChild(e2);
    newItem.appendChild(e3);
    newItem.appendChild(e4);

    return newItem;
}

function createTile(row) {
    var newItem = document.createElement('div');
    newItem.classList.add('tile');
    newItem.appendChild(row);
    newItem.id = 'tile' + idx;

    return newItem;
}
function createProducts() {
    for (var item in myProducts) {

        tag_nume = createName();
        tag_pret_text = createPriceText();
        tag_pret_digit = createPriceDigit();
        tag_button = createAddButton();
        tag_row = createRow(tag_nume, tag_pret_text, tag_pret_digit, tag_button);
        tag_tile = createTile(tag_row);

        lista.appendChild(tag_tile);
        prouctTilesVector.push(tag_tile);
        idx++;
    }
}

function createTableNames() {
    var value = document.createElement('div');
    var quantity = document.createElement('div');
    var product = document.createElement('div');
    var row = document.createElement('div');

    value.classList.add('col-lg-2');
    quantity.classList.add('col-lg-2');
    product.classList.add('col-lg-8');
    row.classList.add('row');

    value.innerHTML = 'Value';
    quantity.innerHTML = 'Quantity';
    product.innerHTML = 'Product';

    row.appendChild(product);
    row.appendChild(quantity);
    row.appendChild(value);

    return row;
}

function createLinie() {
    var newItem = document.createElement('hr');
    newItem.classList.add('linie-total');
    return newItem;
}

function createTotalText() {
    var newItem = document.createElement('p');
    newItem.innerHTML = 'Total:';
    newItem.classList.add('total-text');

    return newItem;
}

function createTotalValue() {
    var newItem = document.createElement('p');
    newItem.innerHTML = '$' + totalValue;
    newItem.classList.add('total-value');
    newItem.id = 'totalValue';

    return newItem;
}

function createTotalRow() {
    var newItem = document.createElement('div');
    newItem.classList.add("row", "total");


    newItem.appendChild(totalTextTag);
    newItem.appendChild(totalValueTag);

    return newItem;
}

function createCheckoutItems() {
    mesaj_checkout.innerHTML = noProducts;
    nrCart = 0;
    totalValue = 0;

    tableNamesTag = createTableNames();
    linieTag = createLinie();
    totalTextTag = createTotalText();
    totalValueTag = createTotalValue();
    totalRowTag = createTotalRow();
}

function onPageLoaded() {
    //Doing the GET request
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        myProducts = data;

        //The quantity vector, a slot for every different product.
        quantityVector = new Array(myProducts.length).fill(1);

        createProducts();
        createCheckoutItems();
    }).catch(function(e) {
        console.log("Something went wrong on the GET request.\n");
        console.log(e);
    });
}

window.addEventListener('load',
    function() {
        onPageLoaded();
    }, false);



