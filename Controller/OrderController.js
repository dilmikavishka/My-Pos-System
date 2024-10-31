import { customer_arr } from "../db/database.js";
import { item_arr } from "../db/database.js";
import { order_arr} from "../db/database.js";
import OrderModel from "../models/orderModel.js";

const customerIdSelect = $('#customerId-Order');
const customerNameInput = $("#customerName");
const itemIdSelect = $("#ItemId-Order");
const itemDescription = $("#itemDescription");
const itemQuantity = $("#qtyOnHand");

let subTotal = 0;
let netTotal = 0;

const loadCustomerData = () => {
    customerIdSelect.empty();
    customer_arr.map(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = `Customer: ${customer.id}`;
        customerIdSelect.append(option);
    });
};

const loadItemData = () =>{
    itemIdSelect.empty();
    item_arr.map(item =>{
        const option = document.createElement("option");
        option.value = item.itemId;
        option.textContent = `Item: ${item.itemId}`;
        itemIdSelect.append(option);
    })
}
customerIdSelect.on("change", function() {
    const selectedId = parseInt(this.value, 10);
    const selectedCustomer = customer_arr.find(customer => customer.id === selectedId);

    if (selectedCustomer) {
        customerNameInput.val(selectedCustomer.name);
    } else {
        customerNameInput.val('');
    }
});

itemIdSelect.on("change", function() {
    const selectedId = parseInt(this.value, 10);
    const selectedItem = item_arr.find(item => item.itemId === selectedId);

    if (selectedItem) {
        itemQuantity.val(selectedItem.itemQty);
        itemDescription.val(selectedItem.itemName);
    } else {
        itemQuantity.val('')
        itemDescription.val('')
    }
})

$("#addToCartBtn").on("click", function () {
    const selectedItemId = itemIdSelect.val();
    const selectedItemDescription = itemDescription.val();
    const availableQty = itemQuantity.val();
    const orderingQty = parseFloat($("#orderingQty").val());
    const customerName = customerNameInput.val();

    const selectedItem = item_arr.find(item => item.itemId == selectedItemId);
    const itemPrice = selectedItem ? parseFloat(selectedItem.itemPrice) : 0;
    const totalPrice = orderingQty * itemPrice;

    const tableRow = $("<tr>");
    tableRow.append($("<td>").text(selectedItemId));
    tableRow.append($("<td>").text(selectedItemDescription));
    tableRow.append($("<td>").text(availableQty));
    tableRow.append($("<td>").text(orderingQty));
    tableRow.append($("<td>").text(totalPrice.toFixed(2)));
    tableRow.append($("<td>").text(customerName));

    $("#itemsList").append(tableRow);

    itemIdSelect.val('');
    itemDescription.val('');
    itemQuantity.val('');
    $("#orderingQty").val('');
    customerNameInput.val('');
});

$('#itemsList').on('click', 'tr', function () {
    const price = parseFloat($(this).find('td:nth-child(5)').text());
    if (!isNaN(price)) {
        subTotal += price;
        netTotal = subTotal;
        $('#subTotal').text(subTotal.toFixed(2));
        $('#netTotal').text(netTotal.toFixed(2));
    }
});

$('#discount').on('input', function () {
    const discount = parseFloat($(this).val()) || 0;
    netTotal = subTotal - discount;
    $('#netTotal').text(netTotal.toFixed(2));
});

$('#cash').on('input', function () {
    const cash = parseFloat($(this).val()) || 0;
    const balance = cash - netTotal;
    $('#balance').val(balance.toFixed(2));
});

$('#placeOrderBtn').on('click', function () {
    const discount = parseFloat($('#discount').val()) || 0;
    const cash = parseFloat($('#cash').val()) || 0;
    const balance = parseFloat($('#balance').val()) || 0;

    if ($('#itemsList tr').length === 0) {
        alert('No items in the order. Please add items to the cart.');
        return;
    }

    if (cash < netTotal) {
        alert('Insufficient cash to complete the order.');
        return;
    }

    const orderItems = [];

    $('#itemsList tr').each(function () {
        const itemId = $(this).find('td:nth-child(1)').text();
        const description = $(this).find('td:nth-child(2)').text();
        const qty = $(this).find('td:nth-child(3)').text();
        const orderingQty = $(this).find('td:nth-child(4)').text();
        const price = $(this).find('td:nth-child(5)').text();

        orderItems.push({ itemId, description, qty, orderingQty, price });
    });

    const order = new OrderModel(
        order_arr.length+1,
        orderItems,
        subTotal,
        discount,
        netTotal,
        cash,
        balance);
    order_arr.push(order);
    addOrderToHistory(order);

    alert('Order placed successfully!');

    resetOrderForm();
    console.log(order_arr);
});

function addOrderToHistory(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.orderNo}</td>
        <td>${order.subTotal}</td>
        <td>${order.discount}</td>
        <td>${order.netTotal}</td>
        <td>${order.items.map(item => `${item.itemId} (${item.orderingQty})`).join(', ')}</td>
    `;
    document.getElementById('orderHistoryList').appendChild(row);
}

function resetOrderForm() {
    subTotal = 0;
    netTotal = 0;
    $('#subTotal').text('0');
    $('#netTotal').text('0');
    $('#discount').val('');
    $('#cash').val('');
    $('#balance').val('');
    $('#itemsList').empty();
}


$("#order-nav").on('click', function(){
    loadItemData();
    loadCustomerData();
    console.log(JSON.stringify(customer_arr));
});
