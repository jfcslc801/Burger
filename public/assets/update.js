$("#update").on("submit", function (event) {
    event.preventDefault();
    var updateDev = $("#updateDev").val();
    console.log(updateDev);
    $.ajax({
        url: "/burgers/devour/" + updateDev,
        type: "PUT",
    }).then(function (res) {
        location.reload();
    })
})
