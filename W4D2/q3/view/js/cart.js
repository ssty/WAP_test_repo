$(() => {
    $.get('/count').done(data => { $('#cartCount').val(data); });
});