/*
Nuget Package: MT.BootstrapLazyLoader.js 
Version: 1.2.2

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
        var currHandle = $(this);
        var url = $(currHandle).data('url');
        if ($(this).prop("tagName") == "A" && url == undefined) {
            e.preventDefault();
            url = $(currHandle).attr('href');
        }

        var loader = '<i class="fa fa-spin fa-spinner fa-lg text-info modal-loader"></i>';

        //Get Id Of Current Handler to set as Modal Id,  the id of modal will be #HandlerId + Modal
        var currHandleId = $(currHandle).attr('id');

        if (currHandleId == undefined) {
            currHandleId = "LazyloadModal";
        } else {
            currHandleId += "Modal";
        }

        var modalHtml = "<!--Lazyloaded Modal -->" +
        "<div class='modal fade' id='" + currHandleId + "' role='dialog' aria-labelledby='" + currHandleId + "'>" +
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



        var modalHeader = $(currHandle).data('header');
        var modalClass = $(currHandle).data('size');
        var callback = $(currHandle).data('callback');

        var modal = $('#' + currHandleId);
        if (modal.length == 0) {
            $('body').append(modalHtml);

            modal = $('#' + currHandleId);
        }

        $(modal).find('.modal-header #LazyloadModalLabel').html(modalHeader);
        $(modal).find('.modal-dialog').removeAttr("class").addClass('.modal-dialog').addClass(modalClass);

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