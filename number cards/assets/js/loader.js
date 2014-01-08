(function (ns, $) {

    function Loader(os) {
        Loader.self = this;
        Loader.objStore = os;
        Loader.loadQueue = null;
        Loader.images = null;
        Loader.storage = null;
        cl('Loader');
    }


    Loader.prototype.loadAssets = function (manifest, m) {
        cl('@@@@@@@@@@@@@@ loadAssets');
        $('#footerNav').hide();
        if (!$('#preloader').is(':visible')) {
            //show preloader if not visible
            $('.reveal-modal-bg').show();
            $('#preloader').show();
        }
        // change preloader message
        $('#preloader #modalProgressBar p').html(m);

        Loader.loadQueue = new createjs.LoadQueue(false);
        Loader.loadQueue.addEventListener("progress", this.handleProgress.bind(this));
        Loader.loadQueue.addEventListener("fileload", this.handleFileLoad.bind(this));
        Loader.loadQueue.addEventListener("complete", this.handleLoaded.bind(this));
        Loader.loadQueue.loadManifest(manifest);
    }


    Loader.prototype.handleProgress = function (evt) {
        this.drawProgress(evt.loaded / evt.total);
    }


    Loader.prototype.drawProgress = function (value) {
        //DOM preloader
        var progressPercent = value * 100;
        if (!$('#preloader').is(':visible')) {
            //show preloader if not visible
            $('.reveal-modal-bg').show();
            $('#preloader').show();
        }
        $('#preloader #modalProgressBar .meter span').css("width", progressPercent + "%");
    }


    Loader.prototype.handleFileLoad = function (evt) {
        //cl("handleFileLoad:evt.item " + evt.item.type);
        var o = evt.item;

        if (o.type == "javascript") {
            // add JS to the document as it loads:
            document.body.appendChild(evt.result);
        }
        if (o.type == "json") {
            // add JSON to the model storage object:
            //cl("json:" + evt.item.id);
           Loader.storage[evt.item.id] = evt.result;
        }
        if (o.type == "image") {
            // add images to the images array:
            if (Loader.objStore) {
                Loader.objStore[Number(o.id)] = evt.result;
            } else {
                Loader.images[evt.item.id] = evt.result;
            }

        }
    }

    Loader.prototype.handleLoaded = function () {
        cl("@@@@@@@@@@@@@@ handleLoaded");
        $(Loader.self).trigger('isLoaded');
        $('#preloader').fadeOut(300);
        $('.reveal-modal-bg').fadeOut(300);
        Loader.loadQueue = null;
        $('#footerNav').show();
    }

    function cl(s) {
        if (console.log) console.log(s);
    }

    ns.Loader = Loader;

})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);



