const d = new Date();
const currentDate = d.getDate();
const currentmonth = d.getMonth();

const batchInfo = {
    name: "Lithium",
    week: "W3D5",
    topic: "The topic for today is Nodejs modules",
}

let getBatchInfo = function() {
    console.log(`${batchInfo.name}, ${batchInfo.week}, ${batchInfo.topic}`)
    return "done"
}

module.exports.printDate = currentDate
module.exports.printMonth = currentmonth
module.exports.outerGetBatchInfo = getBatchInfo
