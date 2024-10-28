import {item_arr} from "../db/database.js";
import ItemModel from "../models/itemModel.js";

let item_select_index = null;

const loadItems = () => {
    $("#item-tbody").empty();
    item_arr.map((item, index) => {
        let data = `<tr><td>${item.itemName}</td><td>${item.itemQty}</td><td>${item.itemPrice}</td><td>${item.itemPrice}</td></tr>`;
        $("#item-tbody").append(data);

    });
}
function clearfiled() {
    $('#Item_Name').val('');
    $('#Item_qty').val('');
    $('#price').val('');
}

$("#item_save_button").on('click', function () {
    let itemName = $("#Item_Name").val();
    let itemQty = $("#Item_qty").val();
    let itemPrice = $("#price").val();

    if (itemName.length===0){
        Swal.fire("Please enter item name!");
    }else if(itemQty.length===0){
        Swal.fire("Please enter item Qty!");
    }else if (itemPrice.length===0){
        Swal.fire("please enter item price!");
    }else {
        Swal.fire({
            title: "Do you want to save!!.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                let items = new ItemModel(
                    item_arr.length+1,
                    itemName,
                    itemQty,
                    itemPrice
                );
                item_arr.push(items);
                clearfiled();
                loadItems();

                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }
});

$("#item-tbody").on('click','tr', function () {
    item_select_index = $(this).index();
    let item_obj = item_arr[item_select_index];

    let select_item = item_obj;
    $("#Item_Name").val(select_item.itemName);
    $("#Item_qty").val(select_item.itemQty);
    $("#price").val(select_item.itemPrice);
});

$("#item_update_button").on('click', function () {
    let itemName = $("#Item_Name").val();
    let itemQty = $("#Item_qty").val();
    let itemPrice = $("#price").val();

    if (itemName.length===0){
        Swal.fire("Please enter item name!");
    }else if(itemQty.length===0){
        Swal.fire("Please enter item Qty!");
    }else if (itemPrice.length===0){
        Swal.fire("please enter item price!");
    }else {
        Swal.fire({
            title: "Do you want to save!!.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                let items = new ItemModel(
                    item_arr.length+1,
                    itemName,
                    itemQty,
                    itemPrice
                );
                item_arr[item_select_index] = items;
                clearfiled();
                loadItems();
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
});

$("#item_delete_button").on('click', function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let index = item_select_index;
            item_arr.splice(index,1);
            loadItems();
            clearfiled();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});