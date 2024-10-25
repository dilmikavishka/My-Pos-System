let customer_arr = [];

function generateId() {
    return customer_arr.length + 1;
}

const loadtablecustomers = () => {
    $("#item-tbody").empty();
    customer_arr.map((item, index) => {
        let data = `<tr data-id="${index}">
                        <td>${item.id}</td>
                        <td>${item.firstName}</td>
                        <td>${item.address}</td>
                        <td>${item.email}</td>
                        <td><button class="btn btn-danger delete-btn" data-id="${index}">Delete</button></td>
                    </tr>`;
        $("#customerTable").append(data);

    });

}

function clearfiled() {
    $('#fullName').val('');
    $('#customer-email').val('');
    $('#address').val('');
}

$("#customer-save-button").on("click", function () {
    const id = generateId();
    const name = $('#fullName').val();
    const address = $('#address').val();
    const email = $('#customer-email').val();

    let customer = {
        id: id,
        firstName: name,
        address: address,
        email: email
    };

    customer_arr.push(customer);
    loadtablecustomers();
    clearfiled();
});

