var express = require('express');
var peerflix = require('peerflix');
var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Server is listening at port: %s', port);
});


app.get('/watch/:name/:hash', function (req, res) {
    var magnetLink = createMagnetLink(req.params.name, req.params.hash);
    var engine = peerflix(magnetLink);
    console.log('Streaming: ' + req.params.name);

    engine.server.on('listening', function () {
        var myLink = 'http://localhost:' + engine.server.address().port + '/';
        res.send(myLink);
    })
});


function createMagnetLink(name, hash) {
    var TRACKER_LIST = '&tr=http%3A%2F%2Ftracker.yify-torrents.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.org%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337';

    var magnetLink = 'magnet:?xt=urn:btih:' +
        hash + '&dn=' + name +
        TRACKER_LIST;

    return magnetLink;
}