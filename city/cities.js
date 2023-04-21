function getAllCities() {
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/cities",
        // processing when calling data successfully
        success: function (foreseen) {
            console.log(foreseen);
            // redraw the board
            let content = ""
            for (let i = 0; i < foreseen.length; i++) {
                content += `<tr>
                                <td>${foreseen[i].name}</td>
                                <td>${foreseen[i].country}</td>
                                <td>${foreseen[i].area}</td>
                                <td>${foreseen[i].population}</td>
                                <td>${foreseen[i].gdp}</td>
                                <td>${foreseen[i].description}</td>
                                <td>
                                    <button onclick="detail(${foreseen[i].id})">View</button>
                                    <button>
                                        <a style="text-decoration: none; color: black" href="edit.html?id=${foreseen[i].id}">Edit</a>
                                    </button>
                                    <button onclick="deleteCityById(${foreseen[i].id})">delete</button>
                                </td>
                            </tr>`
            }
            document.getElementById('content').innerHTML = content;
        }
    });
    event.preventDefault();
}
getAllCities();

function addNewCity() {
    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;
    let area = document.getElementById("area").value;
    let population = document.getElementById("population").value;
    let gdp = document.getElementById("gdp").value;
    let description = document.getElementById("description").value;
    if (name === "" || country === "" || area === "" || population === "" || gdp === "" || description === "") {
        alert("Do not leave the fields to enter!")
    } else if (name === null || country === null || area === null || population === null || gdp === null || description === null) {
        alert("Do not leave the fields to enter!")
    } else {
        let newCity = {
            "name": name,
            "country": country,
            "area": area,
            "population": population,
            "gdp": gdp,
            "description": description,
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newCity),
            url: "http://localhost:8080/cities/create",
            success: function (foreseen) {
                getAllCities();
            }
        });
    }
    event.preventDefault();
}

function deleteCityById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cities/delete/" + id,
        success: function () {
            getAllCities();
        }
    });
}

function updateCityById() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;
    let area = document.getElementById("area").value;
    let population = document.getElementById("population").value;
    let gdp = document.getElementById("gdp").value;
    let description = document.getElementById("description").value;
    if (name === "" || country === "" || area === "" || population === "" || gdp === "" || description === "") {
        alert("Do not leave the fields to enter!")
    } else if (name === null || country === null || area === null || population === null || gdp === null || description === null) {
        alert("Do not leave the fields to enter!")
    } else {
        let newCity = {
            "id": id,
            "name": name,
            "country": country,
            "area": area,
            "population": population,
            "gdp": gdp,
            "description": description,
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(newCity),
            url: "http://localhost:8080/cities/edit/" + id,
            success: function (foreseen) {
                getAllCities();
            }
        });
    }
    event.preventDefault();
}

function detail(id){
    $.ajax({
        url: "http://localhost:8080/cities/view/" + id,
        type: "GET",
        success(data) {
            showDetail(data)
            $("#viewDetail").show()
        }
    })
}

function showDetail(data){
    let context = ` <h1>City Detail</h1> 
                  <p>City Name: ${data.name} </p><br>
                  <p>Country:${data.country} </p><br>
                  <p>Area: ${data.area} </p><br>
                  <p>Population: ${data.population} </p><br>
                  <p>GDP: ${data.gdp} </p><br>
                  <p>Description: ${data.description} </p><br>
                  <button onclick="backHome()">Back to list City</button>
                 `
    document.getElementById("viewDetail").innerHTML = context
    $("#display").hide()
}

function backHome() {
    $("#viewDetail").hide()
    $("#display").show()
    event.preventDefault()
}