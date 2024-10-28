import {customer_arr} from "../db/database.js";
import CustomerModel from "../models/customerModel.js";
import {validateMobile,validateEmail} from "../util/validation.js";

let select_customer_index = null;
function clearfiled() {
    $('#fullName').val("");
    $('#address').val("");
    $('#customer-email').val("");
    $('#customer-mobile').val("");
}

const loadCustomers = () => {
    $('#customerTable').empty();
    customer_arr.map((item, index) => {
        let data = `<tr><td>${item.name}</td><td>${item.address}</td><td>${item.email}</td><td>${item.mobile}</td></tr>`
        $('#customerTable').append(data);
    });
}

$("#customer-save-button").on("click", function () {
    let name = $('#fullName').val();
    let address = $('#address').val();
    let email = $('#customer-email').val();
    let mobile = $('#customer-mobile').val();

    if (name.length===0){
        Swal.fire("Please enter name!");
    }else if(address.length===0){
        Swal.fire("Please enter address!");
    }else if (!validateEmail(email)){
        Swal.fire("Invalided email already exists!");
    }else if (!validateMobile(mobile)){
        Swal.fire("Please enter current mobile number!");
    }else {
        Swal.fire({
            title: "Do you want to save!!.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                let customer = new CustomerModel(
                    customer_arr.length+1,
                    name,
                    address,
                    email,
                    mobile
                );
                customer_arr.push(customer);
                clearfiled();
                loadCustomers();

                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

});

$("#customerTable").on('click','tr',function(){
    select_customer_index = $(this).index();

    let customer_obj = customer_arr[select_customer_index];

    let selectCustomer = customer_obj;
    $('#fullName').val(selectCustomer.name);
    $('#address').val(selectCustomer.address);
    $('#customer-email').val(selectCustomer.email);
    $('#customer-mobile').val(selectCustomer.mobile);

});

$("#customer-update-button").on("click", function(){
    let name = $('#fullName').val();
    let address = $('#address').val();
    let email = $('#customer-email').val();
    let mobile = $('#customer-mobile').val();

    if (name.length===0){
        Swal.fire("Please enter name!");
    }else if(address.length===0){
        Swal.fire("Please enter address!");
    }else if (!validateEmail(email)){
        Swal.fire("Invalided email already exists!");
    }else if (!validateMobile(mobile)){
        Swal.fire("Please enter current mobile number!");
    }else {
        Swal.fire({
            title: "Do you want to update!!.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Update",
            denyButtonText: `Don't update`
        }).then((result) => {
            if (result.isConfirmed) {
                let customer = new CustomerModel(
                    customer_arr.length+1,
                    name,
                    address,
                    email,
                    mobile
                );
                customer_arr[select_customer_index] = (customer);
                loadCustomers();
                clearfiled();
                Swal.fire("Update!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not update", "", "info");
            }
        });

    }
});

$("#customer_delete_button").on("click", function(){
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
            let index = select_customer_index;
            customer_arr.splice(index,1);
            loadCustomers();
            clearfiled();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});