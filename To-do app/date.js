exports.getDate = function(){

    var today = new Date();
    option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return today;
}