fetch("/api/weather").then((response) => {
    response.text().then(value => {
        document.getElementById("apitext").innerHTML = value;
    })
})