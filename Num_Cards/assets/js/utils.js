(function (ns) {

    console.log('utils');
    'use strict';

    function Utils() { }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function() {
            var original = this;
            var args = Array.prototype.slice.call(arguments);
            var self = args.shift();
            var func = function() {
                var thatObj = self;
                return original.apply(thatObj, args.concat(
                    Array.prototype.slice.call(
                        arguments, args.length
                    )
                ));
            };
            func.bind = function() {
                var args = Array.prototype.slice.call(arguments);
                return Function.prototype.bind.apply(original, args);
            }
            return func;
        };
    }

    Utils.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (gamescupinfuze.Utils.isMobile.Android() || gamescupinfuze.Utils.isMobile.BlackBerry() || gamescupinfuze.Utils.isMobile.iOS() || gamescupinfuze.Utils.isMobile.Opera() || gamescupinfuze.Utils.isMobile.Windows());
        }
    };


    Utils.resize = function () {

        //console.log('Utils:resize'); // resize function needed to fit iFrame

        //var aspect = canvas.height / canvas.width,
        var aspect = 624 / 985,
            width = window.innerWidth,
            height = window.innerHeight,
            newHeight = Math.round(width * aspect);

        //if (!$('#toolContainer')) {
        if ( $( "#toolContainer" ).length ) {
            // resize control drag area to window
            $("#dragContainer").css("height", '580px');
        }else{
            //fix to 985x624 window size
            $("#dragContainer").css("height", (height-50) + 'px');
        }


        if (newHeight > height) {
            cl('base size on height');
  //          $("#dragContainer").css("height", (height-50) + 'px');
 //           aspect = canvas.width / canvas.height;//why is the canvas undefined
  //         var newWidth = Math.round(height * aspect);
  //       canvas.style.width = newWidth + 'px';
  //          canvas.style.height = height + 'px';
        } else {
            cl('base size on width');
   //         canvas.style.width = width + 'px';
   //         canvas.style.height = (newHeight) + 'px';
        }

    }

    //function resizeAfterOrientation() {
    Utils.resizeAfterOrientation = function () {
        setTimeout(function () {
            // Hide the address bar!
            window.scrollTo(0, 1);
            resize();
        }, 1000);
    }

    function cl(s) {
        if (console.log) console.log(s);
    }

    // Export to window
    ns.Utils = Utils;
})(window.IMT_Numbercards = window.IMT_Numbercards || {});
