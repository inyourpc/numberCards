(function (ns, $) {

    'use strict';

    // Starting point. Called from index.html
    function App() {
        //cl('App');
        $('#footerNav').hide();
        App.self = this;
        App.loader = null;
        App.footerNav = null;
        App.controlPanel = null;
        App.numbercards = null;
        this.init();
    }

    App.prototype.init = function () {
        //cl('App init');
        // Use this to load app specific files if required.
        App.loader = new ns.Loader();

        var manifest = [
            /*{src: "../IMT_includes/js/utils.js"},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f10.jpg", id: 1},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f02.jpg", id: 2},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f03.jpg", id: 3}*/
        ];
        var message = 'Loading Application';

        //eventListener on App.loader
        $(App.loader).bind('isLoaded', function () {
            App.self.appLoaded();
        });

        // Skip loading if manifest is empty
        if (manifest.length > 0) {
            App.loader.loadAssets(manifest, message);
        } else {
            App.self.appLoaded();
        }
    }

    App.prototype.appLoaded = function () {
        cl('**** appLoaded');
        // set up footer nav containing Setup, Info & Reset - Then load control panel
        App.footerNav = new ns.FooterNav();
        $(App.footerNav).on("loaded", function () {
            App.self.loadControlPanel();
        });
        App.footerNav.init();
    }

    // Loads Setup control panel - then loads Nets tool
    App.prototype.loadControlPanel = function () {
        cl('**** loadControlPanel');
        // set up control panel
        App.controlPanel = new ns.ControlPanel(App.self);
        $(App.controlPanel).on("loaded", function () {
            App.self.loadTool();
        });
        App.controlPanel.init();
    }

    App.prototype.loadTool = function () {
        cl('**** loadTool');
        // set up nets tool
        App.numbercards = new ns.Numbercards(App.self, App.controlPanel);
        $(App.numbercards).on("loaded", function () {
            App.self.toolLoaded();
        });
        App.numbercards.init();
        App.self.setupListeners();
        App.self.setupResetPopup();
        App.self.setup();
    }

    App.prototype.toolLoaded = function () {
        $('#preloader').fadeOut(300);
        $('.reveal-modal-bg').fadeOut(300);
    }

    App.prototype.setupListeners = function () {
        cl('App:setupListeners');

        $(App.footerNav).on("footerBtnClicked", function (e, param1) {
            //alert(param1);
            switch (param1) {
                case 'btn1':
                    App.controlPanel.showPanel();
                    break;
                case 'btn2':
                    App.self.showHelp();
                    break;
                case 'btn3':
                    App.self.reset();
                    break;
            }
        });

        // setup event listener for OK click in Control panel
        $(App.controlPanel).on("okClicked", function (e, param1) {
            App.self.toolUpdate();
        });

        $(App.controlPanel).on("resetComplete", function () {
            App.self.toolUpdate();
        });

        $('#btnClose').on('click', function (e) {
            App.self.closeHelp();
        });

    }


    App.prototype.setupResetPopup = function () {
        cl('App:setupResetPopup');
        $("#popupResetDialog").on(
            "popupbeforeposition popupafteropen popupafterclose",
            function (event) {
                //cl('popupResetDialog:event '+event.type);
            }
        );

        $('#popupResetDialog #popupCancel').on('click', function (e) {
            //alert('popupCancel');
        });
        $('#popupResetDialog #popupOK').on('click', function (e) {
            //alert('popupOK');
            doReset();
        });

    }

    // setup resize functionality
    App.prototype.setup = function () {
        ns.Utils.resize();
        $(window).resize(function () {
            //cl('resize');
            ns.Utils.resize();
        });

        $('#footerNav').show();
    }


    App.prototype.closeHelp = function () {
        $('#cHelpContainer').hide();
    }
    App.prototype.showHelp = function () {
        $('#cHelpContainer').show();
    }

    App.prototype.reset = function () {
        $("#popupResetDialog").popup("open", {positionTo: "#dragContainer"});
    }

    function doReset() {
        cl('App:reset');
        $(App.self).trigger('doReset'); //the control panel will trigger a 'resetComplete' actioning 'toolUpdate' below
        $('.reveal-modal-bg').hide();

    }

    // called by control panel OK click OR control panel resetComplete
    App.prototype.toolUpdate = function () {
        //cl('App:toolUpdate');
        $(this).trigger('doToolUpdate'); // Nets listens for this event
        App.controlPanel.closePanel();
    }


    function cl(s) {
        if (console.log) console.log(s);
    }


    // Export to window
    ns.App = App;
})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);
