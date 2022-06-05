// CONST
const { fork } = require("child_process");
const fs = require("fs");

// FUNCTION
function WriteChildData(apps, idChild, statut) {
    // Remplissage des informations dans le fichier JSON
    var dataFork = {
            id: apps,
            node_number: idChild,
            statut: statut,
            date_statut: new Date(),
        }
        // Conversion
    const forkinfoJSON = JSON.stringify(dataFork);
    const forkinfoObject = JSON.parse(forkinfoJSON);
    // Converting js object into JSON string
    // and writting to data.json file
    const dataJSON = JSON.stringify(forkinfoObject);
    // Ecriture du fichier
    fs.writeFileSync("./data/fork_data/" + apps + "_child.json", dataJSON);
}

function ForkReboot(apps, data) {
    // Checkup du nombre de test effectué
    setTimeout(function() {
        ForkInit(apps, data);
    }, 5000);
}

function Fork(apps) {
    let idChild = child.pid
    WriteChildData(apps, idChild, 1);

    child.send();
    // En cas de fermeture du NODE ---
    child.on("close", function(code) {
        console.log("Alerte - Module arrêté || Code: " + code);
        WriteChildData(apps, idChild, 0);
        ForkReboot(apps);
    });
}

module.exports = { Fork }