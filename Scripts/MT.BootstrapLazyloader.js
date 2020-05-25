/*
Nuget Package: MT.BootstrapLazyLoader.js 
Version: 1.4.1

Created By: Mesut Talebi (mesut.talebi@gmail.com)

Adds Lazy loading feature to bootstrap tabs, pills and modals

Thanks To ChrisDerrig: Added lazy loading feature to bootstrap pills and callback that is loaded on ajax get done.

*/

var MTLazyloader = function () {
    return {
        /**
         * Create and Open a Modal Window        
         * @param {string} url the url to get using ajax 
         * @param {string} header the modal header
         * @param {string} size the size of the modal can be one of (modal-lg, modal-sm, ...)
         * @param {string} modalId  the id for modal
         * @param {string} contentId the id for modal content
         * @param {bool} parDisableClose the value that indicates if enable the close button and esc button
         * @param {function} parCallback the callback function to run after modal opened
         * @returns {void} 
         */
        OpenModal: function (url, header, size, modalId, contentId, parDisableClose, parCallback) {
            var loader = '<i class="fa fa-spin fa-spinner fa-lg text-info modal-loader"></i>';

            //Get Id Of Current Handler to set as Modal Id,  the id of modal will be #HandlerId + Modal
            var currHandleId = modalId;

            if (currHandleId === undefined || currHandleId === null) {
                currHandleId = "LazyloadModal";
            } else {
                currHandleId += "Modal";
            }

            var disableClose = parDisableClose;

            var modalContentId = '#LazyloadModalContent';
            if (contentId !== undefined && contentId !== null) {
                modalContentId = "#" + contentId;
            }
            var modalHeader = header;
            var modalClass = size;
            var callback = parCallback;

            var modalHtml = "<!--Lazyloaded Modal -->" +
                "<div class='modal " + (MTLazyloadBootstrapVersion !== 4 ? "fade" : "") + "' id='" + currHandleId + "' role='dialog' aria-labelledby='" + currHandleId + "'>" +
                "<div class='modal-dialog " + modalClass + "' role='document'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>";

            if (MTLazyloadBootstrapVersion === 4) {
                modalHtml += "<h5 class='modal-title'>" + modalHeader + "</h5>";
            }

            if (disableClose === undefined || disableClose === 'false') {
                modalHtml += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
            }

            if (MTLazyloadBootstrapVersion !== 4) {
                modalHtml += "<h4 class='modal-title' id='LazyloadModalLabel'>" + modalHeader + "</h4>";
            }

            modalHtml += "</div>" +
                "<div id='" + modalContentId.substr(1) + "'></div>" +
                "</div>" +
                "</div>" +
                "</div>";

            var modal = $('#' + currHandleId);
            if (modal.length === 0) {
                $('body').append(modalHtml);

                modal = $('#' + currHandleId);
            }
            else {
                $('body').append(modal);
            }

            //Ajax Get
            $(modal).find(modalContentId).html('');
            //$(currHandle).append(loader);
            $.get(url, function (data) {
                $(modal).find(modalContentId).html(data);
                if (disableClose == undefined) {
                    $(modal).modal('show');
                }
                else {
                    $(modal).modal({
                        keyboard: false,
                        backdrop: 'static'
                    });
                }
            }).fail(function () {
                var alertDiv = '<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> Error!!!</div>';
                $(modal).find(modalContentId).html(alertDiv);
                $(modal).modal('show');
            }).done(function () {
                if (callback) {
                    eval(callback);
                }
            }).always(function () {
                //$(currHandle).find('.modal-loader').remove();
            });
        }
    }
}();

var MTLazyloadBootstrapVersion = 3;

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
        if ($(this).prop("tagName") === "A" && url === undefined) {
            e.preventDefault();
            url = $(currHandle).attr('href');
        }

        var loader = '<i class="fa fa-spin fa-spinner fa-lg text-info modal-loader"></i>';

        //Get Id Of Current Handler to set as Modal Id,  the id of modal will be #HandlerId + Modal
        var currHandleId = $(currHandle).attr('id');

        if (currHandleId === undefined) {
            currHandleId = "LazyloadModal";
        } else {
            currHandleId += "Modal";
        }

        var disableClose = $(currHandle).data('closedisabled');
        var modalHeaderTemplate = $(currHandle).data('headerTemplate');
        var modalClass = $(currHandle).data('size');

        var modalHtml = "<!--Lazyloaded Modal -->" +
            "<div class='modal " + (MTLazyloadBootstrapVersion !== 4 ? "fade" : "") + "' id='" + currHandleId + "' role='dialog' aria-labelledby='" + currHandleId + "'>" +
            "<div class='modal-dialog " + modalClass + "' role='document'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>";


        var modalHeaderHtml = "";
        var isheaderTemaplate = modalHeaderTemplate !== undefined && modalHeaderTemplate.length > 0;
        var modalHeader = $(currHandle).data('header');

        if (MTLazyloadBootstrapVersion === 4) {
            if (isheaderTemaplate) {
                modalHeaderHtml = $(modalHeaderTemplate).html();
            }
            else {
                modalHeaderHtml = "<h5 class='modal-title'>" + modalHeader + "</h5>";
            }
        }

        if (disableClose === undefined || disableClose === 'false') {
            modalHeaderHtml += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
        }

        if (MTLazyloadBootstrapVersion !== 4) {
            if (isheaderTemaplate) {
                modalHeaderHtml = $(modalHeaderTemplate).html();
            }
            else {
                modalHeaderHtml += "<h4 class='modal-title' id='LazyloadModalLabel'>" + modalHeader + "</h4>";
            }
        }

        modalHtml += modalHeaderHtml;

        modalHtml += "</div>" +
            "<div id='LazyloadModalContent'></div>" +
            "</div>" +
            "</div>" +
            "</div>";

        var callback = $(currHandle).data('callback');

        var modal = $('#' + currHandleId);
        if (modal.length === 0) {
            $('body').append(modalHtml);

            modal = $('#' + currHandleId);
        }
        else {
            $('body').append(modal);
        }

        //Ajax Get
        $(modal).find('#LazyloadModalContent').html('');
        $(currHandle).append(loader);
        $.get(url, function (data) {
            $(modal).find('#LazyloadModalContent').html(data);
            if (disableClose === undefined) {
                $(modal).modal('show');
            }
            else {
                $(modal).modal({
                    keyboard: false,
                    backdrop: 'static'
                });
            }
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

    //
    //Lazyload for collapse
    $(document).on('shown.bs.collapse', '.lazyload.collapse:not(.loaded)', function (e) {
        var loader = '<div class="text-center"><i class="fa fa-spin fa-spinner fa-2x text-muted"></i></div>';

        var pane = $(e.target);

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
});
