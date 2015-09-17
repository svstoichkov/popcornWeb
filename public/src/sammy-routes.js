var sammyApp = Sammy('#content', function () {
    var $content = $('#content');

    this.get('#/', function () {
        $content.html('');
        var movies;
        ytsParser.getMovies().then(function (res) {
            movies = res;
            return templates.get('movies');
        }).then(function (template) {
            $content.html(template(movies));
        }).then(function () {
            $('.dropdown-toggle').on('click', function () {
                $('.open').removeClass('open');
                $(this).parent().addClass('open');
                event.stopPropagation();
            })
        })
    });

    this.get('#/watch/:name/:hash', function () {
        $content.html('');
        ytsParser.getMovieStream(this.params.name, this.params.hash)
            .then(function (streamURL) {
                createVideo(streamURL);
            })
    });

    this.get('#/search/:query', function () {
        $content.html('');
        var movies;
        ytsParser.search(this.params.query).then(function (res) {
            movies = res;
            return templates.get('movies');
        }).then(function (template) {
            $content.html(template(movies));
        }).then(function () {
            $('.dropdown-toggle').on('click', function () {
                $('.open').removeClass('open');
                $(this).parent().addClass('open');
                event.stopPropagation();
            })
        })
    });

    this.get('#/genre/:query', function () {
        var movies;
        ytsParser.getGenre(this.params.query).then(function (res) {
            movies = res;
            return templates.get('movies');
        }).then(function (template) {
            $content.html(template(movies));


        })
    });

    this.get('#/sortby/:query', function () {
        var movies;
        ytsParser.sortBy(this.params.query).then(function (res) {
            movies = res;
            return templates.get('movies');
        }).then(function (template) {
            $content.html(template(movies));
        });

    })

});

$('html').click(function () {
    $('.open').removeClass('open');
});

$(function () {
    sammyApp.run('#/');
});

function createVideo(url) {
    var $video = $('<video />').attr('name', 'media').attr('controls', '').attr('autoplay', '').width('100%').height('100%');
    var $source = $('<source />').attr('src', url).attr('type', 'video/mp4').appendTo($video);
    var $track = $('<track />').attr('kind', 'subtitles').attr('src', '/subtitles/bulgarian.vtt').attr('srclang', 'bg').attr('label', 'Bulgarian').attr('default', '').appendTo($video);
    $('#content').html($video);
}

function createLoader() {
    var $loader = $('<div />').addClass('site-wrapper');
}