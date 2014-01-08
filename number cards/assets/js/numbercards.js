(function (ns, $) {

    'use strict';

    function Numbercards(a, cp) {
        cl('Numbercards:');
        Numbercards.self = this;
        Numbercards.app = a;
        Numbercards.controlPanel = cp;

    }

    Numbercards.prototype.init = function () {   // called by app
        console.log('Numbercards:init:');
        this.setUpListeners();
        this.reset();
        this.setUpView();

        $(this).trigger('loaded');
    }

    Numbercards.prototype.setUpListeners = function () {
        cl('Numbercards:setUpListeners');

        // Event triggered by app when control panel has updated after OK clicked OR Reset
        $(Numbercards.app).on("doToolUpdate", function (e, param1) {
            Numbercards.self.setUpView();
        });
    }

    Numbercards.prototype.reset = function () {
        cl('Numbercards:reset');

    }

    Numbercards.prototype.setUpView = function () {
        cl('%%%%%%%%%%%%%%%%%% Nets:setUpView');

        var cpCurrentStateObj = Numbercards.controlPanel.getCurrentState();
        ///////////////

    }


    function cl(s) {
        if (console.log) console.log(s);
    }

    // Export to window
    ns.Numbercards = Numbercards;
})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);
