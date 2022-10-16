const strName = "   functionUp   "
const strTrim = function() {
    return strName.trim()
}
const strLower = function() {
    return strName.toLowerCase()
}
const strUpper = function() {
    return strName.toUpperCase()
}

module.exports.trim = strTrim
module.exports.lower = strLower
module.exports.upper = strUpper