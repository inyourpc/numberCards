(function (ns, $) {

    function Loader(os) {
        Loader.self = this;
        Loader.objStore = os;
        //window.loadQueue = null;
        Loader.images = [];
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
            /*
            var obj1={id: "excelent_sound", src: "sounds/praise/Excellent.mp3"};
            var obj2={id: "goodjob_sound", src: "sounds/praise/Good job.mp3"};
            var obj3={id: "greatjob_sound", src: "sounds/praise/Great job.mp3"};
            var obj4={id: "welldone_sound", src: "sounds/praise/Well done.mp3"};
            manifest.push(obj1,obj2,obj3,obj4);
            */
        loadQueue = new createjs.LoadQueue(false);
        loadQueue.addEventListener("progress", this.handleProgress.bind(this));
        loadQueue.addEventListener("fileload", this.handleFileLoad.bind(this));
        loadQueue.addEventListener("complete", this.handleLoaded.bind(this));
        loadQueue.loadManifest(manifest);
         //////
      var color=["blue","green","grey","orange","pink","red","yellow"];
        for(var i=0;i<=6;i++){
            loadQueue.loadFile({src:"../Num_Cards/assets/images/01_card_"+color[i]+"_stack.png",id:"stack"+i});
            loadQueue.loadFile({id:"normal"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_norm.png"});
            loadQueue.loadFile({id:"down"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_down.png"});
            loadQueue.loadFile({id:"flip_normal"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_flip_norm.png"}); 
            loadQueue.loadFile({id:"flip_down"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_flip_down.png"}); 
            loadQueue.loadFile({id:"button_normal"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_button_norm.png"}); 
            loadQueue.loadFile({id:"button_down"+i,src:"../Num_Cards/assets/images/01_card_"+color[i]+"_button_down.png"}); 
            }      
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
                Loader.images.push(evt.result);
                    // var imageObj = new Image();//had to remove this image() object creation should 
             imArray.push(evt.result);
                     //imageObj.src =event.src;

                   // Loader.images.push(imageObj);
                     
            }

        }
    }

    Loader.prototype.handleLoaded = function () {
        cl("@@@@@@@@@@@@@@ handleLoaded");
        $(Loader.self).trigger('isLoaded');
        $('#preloader').fadeOut(300);
        $('.reveal-modal-bg').fadeOut(300);
        //loadQueue = null;
        $('#footerNav').show();
        
    }

    function cl(s) {
        if (console.log) console.log(s);
    }

    ns.Loader = Loader;

})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);



