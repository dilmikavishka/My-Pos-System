$('#home-nav').on('click', () => {
    $('#home').css('display', 'block');
    $('#manageCustomer').css('display', 'none');
    $('#manageItem').css('display', 'none');
    $('#manageOrder').css('display', 'none');

    $('#home').addClass('active-page');
    $('#manageCustomer').removeClass('active-page');
    $('#manageItem').removeClass('active-page');
    $('#manageOrder').removeClass('active-page');
});

$('#customer-nav, #customer_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#manageCustomer').css('display', 'block');
    $('#manageItem').css('display', 'none');
    $('#manageOrder').css('display', 'none');

    $('#home').removeClass('active-page');
    $('#manageCustomer').addClass('active-page');
    $('#manageItem').removeClass('active-page');
    $('#manageOrder').removeClass('active-page');
});

$('#item-nav').on('click', () => {
    $('#home').css('display', 'none');
    $('#manageCustomer').css('display', 'none');
    $('#manageItem').css('display', 'block');
    $('#manageOrder').css('display', 'none');

    $('#home').removeClass('active-page');
    $('#manageCustomer').removeClass('active-page');
    $('#manageItem').addClass('active-page');
    $('#manageOrder').removeClass('active-page');
})

$('#order-nav').on('click', () => {
    $('#home').css('display', 'none');
    $('#manageCustomer').css('display', 'none');
    $('#manageItem').css('display', 'none');
    $('#manageOrder').css('display', 'block');

    $('#home').removeClass('active-page');
    $('#manageCustomer').removeClass('active-page');
    $('#manageItem').removeClass('active-page');
    $('#manageOrder').addClass('active-page');
})

$('#manageCustomer').css('display', 'none');
$('#manageItem').css('display', 'none');
$('#manageOrder').css('display', 'none');

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        var navbarToggler = document.querySelector('.navbar-toggler');
        var navbarCollapse = document.querySelector('.navbar-collapse');


        if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});