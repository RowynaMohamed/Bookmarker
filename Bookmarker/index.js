var siteName = document.getElementById("sitename");
var siteURL = document.getElementById("siteurl");

var websitesData;

if (localStorage.getItem("websitesData") === null) {
    websitesData = [];
} else {
    websitesData = JSON.parse(localStorage.getItem("websitesData"));
    displayData();
}

function addLink() {
    if (!validateURL()) {
        alert("Invalid URL");
        return;
    }

    var siteInfo = {
        sitename: siteName.value,
        siteurl: siteURL.value
    };

    websitesData.push(siteInfo);
    localStorage.setItem("websitesData", JSON.stringify(websitesData));
    displayData();
    clearInput();
}

function clearInput() {
    siteName.value = "";
    siteURL.value = "";
}

function displayData() {
    var data = "";

    for (var i = 0; i < websitesData.length; i++) {
        data += `<tr>
            <td>${i + 1}</td>
            <td>${websitesData[i].sitename}</td>
            <td>
                <a href="${websitesData[i].siteurl}" target="_blank">
                    <button class="btn btn-success visit">
                        <i class="fa-solid fa-eye"></i> Visit
                    </button>
                </a>
            </td>
            <td>
                <button onclick="deleteBookmark(${i})" class="btn btn-danger delete">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        </tr>`;
    }

    document.getElementById("tdata").innerHTML = data;
}

function deleteBookmark(i) {
    websitesData.splice(i, 1);
    localStorage.setItem("websitesData", JSON.stringify(websitesData));
    displayData();
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

function validateURL() 
{
    return urlRegex.test(siteURL.value);
}

