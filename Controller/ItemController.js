

function generateId() {
    return item_arr.length + 1;
}

const loadItems = () => {
    $("#item-tbody").empty();
    item_arr.map((item, index) => {
        let data = `<tr data-id="${index}">
                        <td>${item.itemId}</td>
                        <td>${item.itemName}</td>
                        <td>${item.itemQty}</td>
                        <td>${item.itemPrice}</td>
                        <td><button class="btn btn-danger delete-btn" data-id="${index}">Delete</button></td>
                    </tr>`;
        $("#item-tbody").append(data);

    });

}

function clearfiled() {
    console.log("clearfiled");
    $('#Item_Name').val('');
    $('#Item_qty').val('');
    $('#price').val('');
}


$("#item_save_button").on("click", function () {
    let itemId = generateId();
    let itemName = $("#Item_Name").val();
    let itemQty = $("#Item_qty").val();
    let itemPrice = $("#price").val();

    let item = {
        itemId: itemId,
        itemName: itemName,
        itemQty: itemQty,
        itemPrice: itemPrice
    };

    item_arr.push(item);
    loadItems();
    clearfiled();
});

