exports.Ip = function(req, res) {
    var get_ip = require('ipware')().get_ip;
    var ip_info = get_ip(req);
    console.log(ip_info);
    res.send(ip_info)
};
