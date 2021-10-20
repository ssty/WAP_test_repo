$(() => {

    const clear = function () {
        $('#msg').text('');
    } 

    const updateCount = function() {
        $.get('/count').done(data => {
            $('#cartCount').text(data);
        });
    };
    updateCount();


    $('#addProduct').submit(e => {
        const data = {
            id: $('#id').val(),
            name: $('#name').val(),
            price: $('#price').val(),
            qty: $('#qty').val()
        };

        $.post({
            url: "/addToCart",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done(() => {
            $("#msg").text("Product added successfully");
            setTimeout(clear, 3000);
            updateCount();
        });

        e.preventDefault();
    });

});