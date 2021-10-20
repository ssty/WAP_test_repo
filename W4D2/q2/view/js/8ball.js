$(() => {
    const clear = function () {
        $("#question").text("");
    } 
    const errorFn = function () {
        $("#question").val("Unable to reach server");
        setTimeout(clear, 5000);
    };

    $("#ask").submit(e => {
        $.get(
            "/8ball", {}
        ).done(answer => {
            $("#question").val(answer);
        }).fail(errorFn);
        e.preventDefault();
    });
});