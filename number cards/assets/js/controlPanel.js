(function (ns, $) {

    'use strict';

    var defaultStateObj = {chk1: true, chk2: false, sel1: 0, sel2: 2};

    function ControlPanel(a) {
        cl('ControlPanel');
        ControlPanel.self = this;
        ControlPanel.app = a;
        this.currentStateObj = {};
    }

    ControlPanel.prototype.init = function () {

        cl('ControlPanel init');
        var that = this;

        $(".conPanel-frame").draggable({ containment: "#dragContainer", handle: ".conPanel-dragger", scroll: false });
        //$('#color3').colorPicker({pickerDefault: "fff000", colors: ["ffffff", "000000", "111FFF", "C0C0C0", "FF0000", "999000", "FFFF00", "FF00FF"], transparency: true, showHexField: false});

        $('#cPanelContainer').trigger('create');
        setUpListeners();
        that.reset();
        $(that).trigger('loaded');


        /*$('#cPanelContainer').load('assets/controlPanel.html #cPanelContainerContent', function() {
            $(".conPanel-frame").draggable({ containment: "#dragContainer", handle: ".conPanel-dragger", scroll: false });
            $('#color3').colorPicker({pickerDefault: "fff000", colors: ["ffffff", "000000", "111FFF", "C0C0C0", "FF0000", "999000", "FFFF00", "FF00FF"], transparency: true, showHexField: false});

            $('#cPanelContainer').trigger('create');
            setUpListeners();
            that.reset();
            $(that).trigger('loaded');
        });*/
    };

    function setUpListeners() {

        // listen for Control Panel button clicks
        $('#cPanelContainer a').on('click', function (e) {
            if (e.currentTarget.id === 'btnOK') {
                okBtnClicked();
            }

            if (e.currentTarget.id === 'btnCancel') {
                cancelBtnClicked();
            }

            /// For testing dialog only
            if (e.currentTarget.id === 'openDialog') {
                openDialog();
            }
        });

        // listen for Full Reset
        $(ControlPanel.app).on("doReset", function () {
            ControlPanel.self.reset();
            $(ControlPanel.self).trigger('resetComplete');
        });
    }

    function setUpErrorPopup() {
        $("#popupErrorMessage").on(
            "popupbeforeposition popupafteropen popupafterclose",
            function(event) {
                cl('popupErrorMessage:event '+event.type);
            }
        );

        /*$('#popupErrorMessage #popupCancel').on('click', function (e) {
            alert('popupCancel');
        });*/
        $('#popupErrorMessage #popupOK').on('click', function (e) {
            alert('popupOK');
        });
    }

    ControlPanel.prototype.reset = function() {
        cl('ControlPanel:reset');
        this.currentStateObj = $.extend(true, {}, defaultStateObj); // set values of currentStateObj to defaultStateObj values
        this.closePanel();
        updatePanel();
        updateStateObj();
    };

    function openDialog() {
        // Set dialog titles and message
        $("#popupErrorMessage #dialogTitleBar").text("dialogTitleBar");
        //$("#popupErrorMessage #dialogTitle").text("dialogTitle");
        $("#popupErrorMessage #dialogMessage").text("dialogMessage");
        // Open error dialog
        $("#popupErrorMessage").popup("open", {positionTo: "#dragContainer"});
    }

    function cancelBtnClicked() {
        cl('ControlPanel:cancelBtnClicked');
        ControlPanel.self.closePanel();
        $('.reveal-modal-bg').hide();
        updatePanel();
    }

    function okBtnClicked() {
        //cl('ControlPanel:okClicked');
        ControlPanel.self.closePanel();
        $('.reveal-modal-bg').hide();
        updateStateObj();

        $(ControlPanel.self).trigger('okClicked'); // App listens to this so all views can reset
    }

    function updatePanel() {
        //cl('ControlPanel:updatePanel');
        /*$('#checkbox-1').prop('checked', ControlPanel.self.currentStateObj.chk1).checkboxradio('refresh');
        $('#checkbox-2').prop('checked', ControlPanel.self.currentStateObj.chk2).checkboxradio('refresh');

        $('#select1').val(String(ControlPanel.self.currentStateObj.sel1)).selectmenu('refresh');
        $('#select2').val(String(ControlPanel.self.currentStateObj.sel2)).selectmenu('refresh');*/
    }

    function updateStateObj() {
        //cl('ControlPanel:updateStateObj');
        ControlPanel.self.currentStateObj.chk1 = checkBoxStatus('#checkbox-1');
        ControlPanel.self.currentStateObj.chk2 = checkBoxStatus('#checkbox-2');
        ControlPanel.self.currentStateObj.sel1 = selectStatus('#select1');
        ControlPanel.self.currentStateObj.sel2 = selectStatus('#select2');
    }

    function checkBoxStatus(cb) {
        //alert($(cb).is(':checked'));
        return $(cb).is(':checked') ? true : false;
    }

    function selectStatus(se) {
        return $(se).val();
    }

    ControlPanel.prototype.closePanel = function () {
        $('#cPanelContainer').hide();
    }




    ControlPanel.prototype.showPanel = function () {
        $('#cPanelContainer').show();
        $('.reveal-modal-bg').show();
    }

    ControlPanel.prototype.getCurrentState = function () {
        cl('ControlPanel:getCurrentState');
        return(this.currentStateObj);
    };

    function cl(s) {
        if (console.log) console.log(s);
    }

    // Export to window
    ns.ControlPanel = ControlPanel;
})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);
