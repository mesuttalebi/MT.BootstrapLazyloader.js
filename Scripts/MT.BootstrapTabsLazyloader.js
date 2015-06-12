/*
Nuget Package: MT.BootstrapTabsLazyLoader.js 
Version: 1.0.0

Created By: Mesut Talebi (mesut.talebi@gmail.com)

Adds Lazy loading feature to bootstrap tabs

*/


$(function() {
    $(document).on('shown.bs.tab', '.nav-tabs.lazyload a[data-toggle="tab"]:not(.loaded)', function (e) {
        var loader = '<div class="text-center"><i class="fa fa-spin fa-spinner fa-2x text-muted"></i></div>';

        var pane = $(e.target).attr('href');

        var url = $(e.target).data('url');

        if (url) {
            $(pane).html(loader);

            var caller = $(this);
            $.get(url, function (data) {
                $(pane).html(data);
                    $(caller).addClass('loaded');
                })
            .fail(function () {
                var alertDiv = '<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> Error!!!</div>';
                $(pane).html(alertDiv);
            });
        }
    });
});