
var zutatOptionen = ['Whisky', 'Sirup', 'Zitronensaft', 'Sprudelwasser', 'Gin', 'Schaumwein'];

function zutatenZeileHinzufuegen(zutaten) {
    var table = document.getElementById("zutatenTabelle").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cells = [];
    for (var i = 0; i < 4; i++) {
        cells[i] = newRow.insertCell(i);
        if (i === 0) {
            var selectHTML = '<select onchange="zutatAuswahlChanged(this)">';
            selectHTML += '<option value="">Bitte wählen...</option>';
            zutatOptionen.forEach(function(zutat) {
                selectHTML += '<option value="' + zutat + '">' + zutat + '</option>';
            });
            selectHTML += '<option value="benutzerdefiniert">Benutzerdefiniert</option>';
            selectHTML += '</select><input type="text" style="display: none;">';
            cells[i].innerHTML = selectHTML;
        } else if (i === 1) {
            cells[i].innerHTML = '<input type="number" min="0">';
        } else if (i === 2) {
            cells[i].innerHTML = '<select>' +
                '<option value="">Bitte wählen...</option>' +
                '<option value="ml">ml</option>' +
                '<option value="g">g</option>' +
                '</select>';
        } else {
            cells[i].innerHTML = '<button onclick="zutatenZeileLoeschen(this)">Löschen</button>';
        }
    }
}


function zutatAuswahlChanged(select) {
    var input = select.nextElementSibling;
    input.style.display = select.value === 'benutzerdefiniert' ? 'inline-block' : 'none';
    input.value = '';
}

function zutatenZeileLoeschen(row) {
    var rowIndex = row.parentNode.parentNode.rowIndex;
    document.getElementById("zutatenTabelle").deleteRow(rowIndex);
}

function generiereJson() {
    var cocktailName = document.getElementById("cocktailName").value;
    var zutaten = [];
    var table = document.getElementById("zutatenTabelle").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var zutatSelect = rows[i].cells[0].getElementsByTagName("select")[0];
        var zutatInput = rows[i].cells[0].getElementsByTagName("input")[0];
        var zutat = zutatSelect.value === 'benutzerdefiniert' ? zutatInput.value : zutatSelect.value;
        var menge = rows[i].cells[1].getElementsByTagName("input")[0].value;
        var einheit = rows[i].cells[2].getElementsByTagName("select")[0].value;
        zutaten.push({zutat: zutat, menge: menge, einheit: einheit});
    }
    var zubereitung = document.getElementById("zubereitung").value;
    var rezept = {cocktailName: cocktailName, zutaten: zutaten, rezept: zubereitung};
    console.log(JSON.stringify(rezept));
}

function zeigeBenutzerdefinierteZutaten() {
    var benutzerdefinierteZutaten = [];
    var table = document.getElementById("zutatenTabelle").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var zutatSelect = rows[i].cells[0].getElementsByTagName("select")[0];
        if (zutatSelect.value === 'benutzerdefiniert') {
            var zutatInput = rows[i].cells[0].getElementsByTagName("input")[0];
            benutzerdefinierteZutaten.push(zutatInput.value);
        }
    }
    if (benutzerdefinierteZutaten.length > 0) {
        alert("Benutzerdefinierte Zutaten:\n" + benutzerdefinierteZutaten.join("\n"));
    } else {
        alert("Keine benutzerdefinierten Zutaten gefunden.");
    }
}
