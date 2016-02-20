/*
Nuget Package: MT.BootstrapLazyLoader.js 
Version: 1.2.0

Created By: Mesut Talebi (mesut.talebi@gmail.com)

Adds Lazy loading feature to bootstrap tabs, pills and modals

Thanks To ChrisDerrig: Added lazy loading feature to bootstrap pills and callback that is loaded on ajax get done.

*/


$(function () {
    $(document).on('shown.bs.tab', '.nav-tabs.lazyload a[data-toggle="tab"]:not(.loaded)', function (e) {
        var loader = '<div class="text-center"><i class="fa fa-spin fa-spinner fa-2x text-muted"></i></div>';

        var pane = $(e.target).attr('href');

        var url = $(e.target).data('url');

        var callback = $(e.target).data('callback');

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
            })
            .done(function () {
                if (callback) {
                    eval(callback);
                }
            });
        }
    });

    $(document).on('shown.bs.tab', '.nav-pills.lazyload a[data-toggle="pill"]:not(.loaded)', function (e) {
        var loader = '<div class="text-center"><i class="fa fa-spin fa-spinner fa-2x text-muted"></i></div>';

        var pane = $(e.target).attr('href');

        var url = $(e.target).data('url');

        var callback = $(e.target).data('callback');

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
            })
            .done(function () {
                if (callback) {
                    eval(callback);
                }
            });
        }
    });

    $(document).on('click', '.lazyload.showModal', function (e) {
        var loader = '<i class="fa fa-spin fa-spinner fa-2x text-info modal-loader"></i>';
        var currHandle = $(this);
        var modalHtml = "<!--Lazyloaded Modal -->" +
        "<div class='modal fade' id='LazyloadModal' role='dialog' aria-labelledby='LazyloadModal'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
            "<div class='modal-header'>" +
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                "<h4 class='modal-title' id='LazyloadModalLabel'>Modal Header</h4>" +
            "</div>" +
            "<div id='LazyloadModalContent'></div>" +
        "</div>" +
        "</div>" +
        "</div>";

        var url = $(currHandle).data('url');
        var modalHeader = $(currHandle).data('header');
        var modalClass = $(currHandle).data('size');
        var callback = $(currHandle).data('callback');

        var modal = $('#LazyloadModal');
        if (modal.length == 0) {
            $('body').append(modalHtml);

            modal = $('#LazyloadModal');
        }

        $(modal).find('.modal-header #LazyloadModalLabel').html(modalHeader);
        $(modal).find('.modal-dialog').addClass(modalClass);

        //Ajax Get
        $(modal).find('#LazyloadModalContent').html('');
        $(currHandle).append(loader);
        $.get(url, function (data) {
            $(modal).find('#LazyloadModalContent').html(data);
            $(modal).modal('show');
        }).fail(function () {
            var alertDiv = '<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> Error!!!</div>';
            $(modal).find('#LazyloadModalContent').html(alertDiv);
            $(modal).modal('show');
        }).done(function () {
            if (callback) {
                eval(callback);
            }
        }).always(function () {
            $(currHandle).find('.modal-loader').remove();
        });
    });
});