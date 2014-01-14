(function (ns, $) {

    'use strict';

    // Starting point. Called from index.html
    function App() {
        //cl('App');
        $('#footerNav').hide();
        window.imArray = [];
        //window.Loader;
        window.loadQueue = null;
        App.self = this;
        App.loader = null;
        App.footerNav = null;
        App.controlPanel = null;
        App.numbercards = null;
        //hassanVariables here//
       // App.stack;
        var selected;
      
      App.loading;
      App.topMostCard;
      App.filesloaded=0;
      App.borderr;
      ///coding variables
      App.jj=0,App.bb=0,App.maxNumberr=5;
      App.b=0;
      App.m;
      App.mm;
      App.num=2;
      App.collision;
      App.mainContainer;
      App.container = new Array();
      App.x;
      App.initialSize;
      
      App.cardNumber =new Array();
      
      App.maxNumber=5;
      App.num_of_cards=1;
      App.inContainerr= new Array();
      App.logo;
      //App.borderr;


      App.cartDiv= new Array();
      App.enterquestion=new Array();
      App.enterquestionDom=new Array();

      App.labelDiv = new Array();
      App.firstBox;
      App.firstBoxDOM;
      App.incrementBox;
      App.incrementBoxDOM;
      App.limit=1;
      App.onkeychange;
      App.bitmapArray = new Array();
      App.normal=[];
      App.button_normal=[];
      App.flipped=false;
      ///bitmap variables
      App.stack;
      //
      App.normal = new Array();
      
        ///
      App.down = new Array();
      App.flip_normal = new Array();
        App.j=0;
        ///
      App.flip_down = new Array();
      App.button_normal = new Array();
      
      App.button_down = new Array;
      App.recycleBin_norm;
      App.recycleBin_over;
      //buttons//
      App.reset_button;
      App.instruction_button;
      App.setup_button;
      App.showAll_button;
      App.hideAll_button;
      App.clearAll_button;
      App.button,App.button1,App.button2;
      App.index = new Array();
      App.inContainer;

      //App.normal is ne array
      ///jguery of the setup popup-dialog
      App.z1,App.z2;
      App.stage;

        this.init();
    }

    App.prototype.init = function () {
        //cl('App init');
        // Use this to load app specific files if required.
        App.loader = new ns.Loader();

        var manifest = [

            {src:"../Num_Cards/assets/images/01_wastebin_norm.png",id:"0"},
            {src:"../Num_Cards/assets/images/01_wastebin_over.png",id:"1"},
            {src:"../Num_Cards/assets/images/01_wastebin_over.png",id:"2"},
            {src:"../Num_Cards/assets/images/ClearAll.png",id:"3"},
            {src:"../Num_Cards/assets/images/HideAll.png",id:"4"},
            {src:"../Num_Cards/assets/images/ShowAll.png",id:"5"},
            {src:"../Num_Cards/assets/images/logo.png",id:"6"}


            /*
            for(var i=0;i<=6;i++){
            Loader.loadQueue.loadFile({id:"stack"+i,src:"../images/01_card_"+color[i]+"_stack.png"});
            Loader.loadQueueloadFile({id:"normal"+i,src:"../images/01_card_"+color[i]+"_norm.png"});
            Loader.loadQueueloadFile({id:"down"+i,src:"../images/01_card_"+color[i]+"_down.png"});
            Loader.loadQueueloadFile({id:"flip_normal"+i,src:"../images/01_card_"+color[i]+"_flip_norm.png"}); 
            Loader.loadQueueloadFile({id:"flip_down"+i,src:"../images/01_card_"+color[i]+"_flip_down.png"}); 
            Loader.loadQueueloadFile({id:"button_normal"+i,src:"../images/01_card_"+color[i]+"_button_norm.png"}); 
            Loader.loadQueueloadFile({id:"button_down"+i,src:"../images/01_card_"+color[i]+"_button_down.png"}); 
            }
            {src: "../IMT_includes/js/utils.js"},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f10.jpg", id: 1},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f02.jpg", id: 2},
             {src: "http://deelay.me/100?http://www.infuze.co.uk/images/artwork_samples_f03.jpg", id: 3}
             */
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
        console.log(App.controlPanel);
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
        //alert("loaded and ready to rock");
        //App.a = loadQueue.getResult("stack"+j);
        //new createjs.Bitmap();
        //console.log(App.a);
        //initalizing canvas 
        var canvas= document.getElementById("myCanvas");
        //var canvas = document.createElement( navigator.isCocoonJS ? "screencanvas" : "canvas");
                 // W=985;
                 // H=624;
                 // canvas.width = W;
                 // canvas.height = H;
                 // var context = canvas.getContext("2d");
                  
                  App.stage = new createjs.Stage(canvas);
                  App.stage.enableMouseOver(); 
                  App.stage.enableDOMEvents(true);


                  createjs.Touch.enable(App.stage);
                  //TweenLite.ticker.addEventListener("tick", stage.update, stage);
                  createjs.Ticker.setInterval(1);
                  createjs.Ticker.addEventListener("tick", tick);
                  //stage.autoClear = true;
                  App.stage.snapPixelsEnabled=true;
                  
                   

                  App.stage.addEventListener("click", stagePressHandler);
                    
             var context  = canvas.getContext("2d");
              function scaleDynamically(e){
                var W=985;
                var H=624;
           
            var scaleFactor= Math.min(window.innerWidth/W, window.innerHeight/H);
            if(scaleFactor>1.32){
                scaleFactor=1.32;
            }
            canvas.width = W*scaleFactor;
            canvas.height = H*scaleFactor;
            context = canvas.getContext( '2d' );
            App.stage.scaleX=App.stage.scaleY=scaleFactor;
           
            }
            scaleDynamically(null);
              //stage.removeChild(loading);


            //load screen images to bitmaps and store the bitmaps in vairables
           
            
            

            
            
            App.recycleBin_norm = new createjs.Bitmap(loadQueue.getResult("0"));
            App.recycleBin_over = new createjs.Bitmap(loadQueue.getResult("1"));
            App.showAll_button = new createjs.Bitmap(loadQueue.getResult("5"));
            App.hideAll_button = new createjs.Bitmap(loadQueue.getResult("4"));
            App.clearAll_button = new createjs.Bitmap(loadQueue.getResult("3"));

           
           // App.logo = new createjs.Bitmap(loadQueue.getResult("logo"));



            ///// rectangle with 1 px blue border////


            App.borderr = new createjs.Shape();
            App.borderr.graphics.beginStroke("grey");
            App.borderr.graphics.setStrokeStyle(2);
            App.borderr.snapToPixel = true;
            //borderr.graphics.beginFill("blue");
            App.borderr.graphics.drawRect(20, 40, 945, 400);
            App.borderr.setBounds(20,40,945,400);
            App.borderr.x = App.stage.width / 2 - 200;
            App.borderr.y = App.stage.height / 2 - 150;
            App.mainContainer = new createjs.Container();
            App.mainContainer.addChild(App.borderr);
           

          set_bitmap(App.j);
          viewMain();

    }

    App.prototype.setupListeners = function () {
        cl('App:setupListeners'+App.controlPanel);

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
             App.b=document.getElementById('select-2').selectedIndex;
             App.maxNumber=document.getElementById('select-1').value;
             
             App.col=$("#color3").val();
             console.log("color"+App.col);
             //console.log(App.b+"   "+App.maxNumber+" "+App.col);
             
             if(App.col=="#19d4f0")
              {
                alert('color=blue');
                App.j=0;
                
              }
             else if(App.col=="#19f04b")
              {App.j=1;}
             else if(App.col=="#c0c0c0")
              {App.j=2;}
            else if(App.col=="#f09a19")
              {App.j=3;}
            else if(App.col=="#f019e6")
              {App.j=4;}
            else if(App.col=="#f01927")
              {App.j=5;}
            else if(App.col=="#f0f019")
              {App.j=6;}

       //maxNumber

          get_all(App.b,App.j,App.maxNumber);
            
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
    //hassans' CODE HERE////////////////////////**************************
    ///function views///
      function get_all(b,j,max){

       
         // console.log("maxNumber "+maxNumberr);
         // console.log("j"+jj);
         // console.log("b"+bb);
          App.b=parseInt(b);
         //App.b=parseInt(bb);
          App.j=parseInt(j);
          
       // var b;
       // console.log(b);
       App.maxNumber=parseInt(max);
       //getType(App.b);
          console.log(App.b,App.maxNumber);

          

              for(var i=1;i<100;i++){
            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
            document.getElementById(i).style.visibility="hidden";

            App.stage.removeChild(App.container[i],App.stack);

              }
            }
        App.num_of_cards=App.inContainerr.length+1;
        set_bitmap(App.j);
        get_stack(App.num_of_cards);

        }
         var result1 = new Array;
      function sum() {
            var txtFirstNumberValue = document.getElementById('firstVal').value;
            var txtSecondNumberValue = document.getElementById('incrementVal').value;
            var result = parseFloat(txtFirstNumberValue) + parseFloat(txtSecondNumberValue);

            if (!isNaN(result)) {
              for(var i=App.num_of_cards,result1=result;i<=100;result1+=parseFloat(txtSecondNumberValue),i++)
                if((App.container[i]!=undefined)&&(App.container[i].inContainer==false))
                document.getElementById(i).value = result1;
              //document.getElementById(i).value += txtSecondNumberValue;
              
              
            }
        }
         var odd=["1","1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35","37","39","41","43","45","47","49","51","53","55","57","59","61","63","65","67","69","71","73","75","77","79","81"];
    
      var even=["1","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42","44","46","48","50","52","54","56","58","60","62","64","66","68","70","72","74","76","78","80"];
      var triangles=["1","3","6","10","15","21","28","36","45","55","66","78","91","105","120","136","153","171","190","210","231","253","276","300","325","351","378","406","435","465","496","528","561","595","630","666","703","741","780","820"];
      var prime=["2","3","5","7","11","13","17","19","23","29","31","37","41","43","47","53","59","61","67","71","73","79","83","89","97","101","103","107","109","113","127","131","137","139","149","151","157","163","167","173"];
      var roman=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
    
        function getCardType(b){
          switch(b){
                      case 0://serial
                       for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                          document.getElementById(i).value=m;
                          console.log(m);
                          if(m<App.maxNumber)
                            m++;
                        
                        }
                      }
                      
                      break;

                      case 1:
                      
                      //console.log(limit);
                
                        
                          
                          for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){

                          document.getElementById(i).value=odd[m];
                          console.log(odd[m]);
                          if(m<App.maxNumber)
                            m++;
                        }
                        }
                        
                         // console.log("odd ="+limit);


                        
                        
                        break;
                       

                      case 2:

                        
                        for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                          document.getElementById(i).value=even[m];
                          console.log(even[m]);
                          if(m<App.maxNumber)
                            m++;
                        
                        }
                      }

                        
                       break;

                      case 3:
                      for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                          document.getElementById(i).value=triangles[m];
                          console.log(triangles[m]);
                          if(m<App.maxNumber)
                            m++;
                        
                        }
                      }
                        break;

                      case 4://squares
                      for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                          document.getElementById(i).value=m*m;
                          console.log(m*m);
                          if(m<App.maxNumber)
                            m++;
                        
                        }
                      }

                       
                        break;
                      case 5://primes
                      for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                          document.getElementById(i).value=prime[m];
                          console.log(prime[m]);
                          if(m<App.maxNumber)
                            m++;
                        
                        }
                      }


                      break;

                      case 6:
                     
                      for(var i=App.num_of_cards,m=0;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                              
                          document.getElementById(i).value=roman[m];
                          console.log(roman[m]);
                          if(m<App.maxNumber)
                            m++;
                        

                        }

                        
                      }


                      break;

                      case 7:

                      for(var i=App.num_of_cards;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                              
                          document.getElementById(i).value=Math.floor(Math.random()*90+10);
                          
                        

                        }

                        
                      }



                      break;

                      case 8:

                      for(var i=App.num_of_cards;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                              
                          document.getElementById(i).value=Math.floor(Math.random()*9+0);
                          
                        

                        }

                        
                      }


                      break;

                      case 9:

                      for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                              
                          document.getElementById(i).style.background = "url(assets/images/"+m+"_dot.png) no-repeat center center";
                          
                          document.getElementById(i).value = "";
                          if(m<6)
                            m++;
                           else 
                            m=1;
                          
                        

                        }

                        
                      }




                      break;

                      case 10:

                      for(var i=App.num_of_cards,m=1;i<100;i++) { 
                            if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                              
                          document.getElementById(i).style.background = "url(assets/images/"+m+"-heart.png) no-repeat center center";
                          
                          document.getElementById(i).value = "";
                          if(m<9)
                            m++;
                           else 
                            m=1;
                          
                        

                        }

                        
                      }


                      break;



                        case 11:{

                        sum();
                        }
                        break;

      }
        }


  
            function set_bitmap(j){

              
               App.stack = new createjs.Bitmap(loadQueue.getResult("stack"+j));
                  for(var i=App.num_of_cards,m=App.num_of_cards;i<(App.maxNumber+1)+(App.num_of_cards-1);m++,i++){
                 //   console.log("i="+i);
                App.normal[i] = new createjs.Bitmap(loadQueue.getResult("normal"+j));
                App.normal[i].name="normal"+i;
                //console.log(normal[i].name);
                App.flip_normal[i] = new createjs.Bitmap(loadQueue.getResult("flip_normal"+j));
                App.button_normal[i] = new createjs.Bitmap(loadQueue.getResult("button_normal"+j));

                App.button_down[i] = new createjs.Bitmap(loadQueue.getResult("button_down"+j));
                App.down[i] = new createjs.Bitmap(loadQueue.getResult("down"+j));

                App.flip_down[i] = new createjs.Bitmap(loadQueue.getResult("flip_down"+j));

                  App.button_normal[i].x=56;
                  App.button_normal[i].y=83;
                  ////
                  App.button_down[i].x=56;
                  App.button_down[i].y=83;
                  ///
                  App.button_normal[i].name=m;

                  //console.log("button_normal[i].name "+name);



                  
            ////container////
            App.container[i] = new createjs.Container();
            App.container[i].name=i;
          

            App.cartDiv[i]=document.createElement("div");
            document.body.appendChild(App.cartDiv[i]);
            App.cartDiv[i].id = "EnterQuestionDiv"+i;
            document.getElementById(App.cartDiv[i].id).innerHTML="<input type=\"text\" id="+i+" size=\"6\" maxlength="+5+"></input>";
             /// check the syntax
              //document.getElementById(i).disabled=true;
            
            //getCardType(6);
             
            App.enterquestion[i] = document.getElementById(App.cartDiv[i].id);
            App.enterquestion[i].name=i;
            App.enterquestionDom[i] = new createjs.DOMElement(App.enterquestion[i]);
            App.enterquestionDom[i].x = 10;
            App.enterquestionDom[i].y = 4;
            App.enterquestionDom[i].text=""+i; 

                    App.enterquestion[i].addEventListener("click",function(evt){

                        console.log("heello i m text field number"+evt.currentTarget.name);
                        evt.currentTarget.onkeychange=true;
                    });

                App.enterquestion[i].addEventListener("keypress",function(evt){



               var x=document.getElementById(evt.currentTarget.name);

              App.initialSize=6-(x.value.length);
              //initialSize=initialSize<=1?22:20;
              if(App.initialSize==2)
                App.initialSize=14;
              else if(App.initialSize==3)
                App.initialSize=18;
              else if(App.initialSize==4)
                App.initialSize=25;
              else if(App.initialSize==5)
                App.initialSize=40;
              else if(App.initialSize==6)
                App.initialSize=45;
              else
                App.initialSize=14;

              x.style.fontSize = App.initialSize + "px";
            

            });



          //  console.log(enterquestionDom[i].text);
            
            //enterquestionDom[i].text = "hassan";
            //stage.addChild(enterquestionDom);
            //normal.addChild(enterquestionDom[i])


            App.container[i].addChild(App.flip_normal[i],App.normal[i],App.enterquestionDom[i],App.button_normal[i],App.button_down[i],App.down[i],App.flip_down[i]);
            
            if(App.container[i-1]!=undefined)
            App.enterquestionDom[i].visible=false;

            App.down[i].visible=false;
            App.button_down[i].visible=false;
            App.flip_down[i].visible=false;
            


            document.getElementById(i).addEventListener("click",function(evt){
             
                console.log(evt.target.name);
                //document.getElementById(temp).focus();
                //document.getElementById(temp).select();

            });

            
            App.container[i].addEventListener("pressmove",function(evt){
              
              
             if((App.container[evt.currentTarget.name+1]!=undefined)&&(document.getElementById("cardValues").checked==false))
              App.enterquestionDom[evt.currentTarget.name+1].visible=true;
             else if(App.container[evt.currentTarget.name+1]==undefined)
              App.stage.removeChild(App.stack);
          


                evt.currentTarget.x = (evt.stageX-40);
                evt.currentTarget.y = (evt.stageY-35);
                

                });
            ////roll over, roll out functions
            App.button_normal[i].addEventListener("mousedown",function(evt){


              App.button_down[evt.currentTarget.name].visible=true;
            });
          

            //////
            App.button_normal[i].addEventListener("pressup",function(evt){
              App.button_down[evt.currentTarget.name].visible=false;
                App.container[evt.currentTarget.name].swapChildrenAt(0,2);
                if(App.enterquestionDom[evt.currentTarget.name].visible==true)
                App.enterquestionDom[evt.currentTarget.name].visible=false;
                else
                App.enterquestionDom[evt.currentTarget.name].visible=true;
                
              
            });

            
            
             App.container[i].addEventListener("pressup",function(evt){

                App.collision = ndgmr.checkRectCollision(evt.target,App.recycleBin_norm);


        
                if(App.collision){
                document.getElementById(evt.currentTarget.name).style.visibility="hidden";
                //document.getElementById(evt.currentTarget.name).style.zIndex=1;
                
                App.stage.removeChild(evt.currentTarget);

            }
            
              
                if(((evt.currentTarget.x>20&&evt.currentTarget.x<945)&&(evt.currentTarget.y>40&&evt.currentTarget.y<400))&&(evt.currentTarget.inContainer!=true)){
                    evt.currentTarget.inContainer=true;
                    console.log(evt.currentTarget.inContainer);

                    App.inContainerr.push(evt.currentTarget);
                   console.log("incontainerr.lenght = "+App.inContainerr.length);
                }
                else if(evt.currentTarget.inContainer==false)
                    {

                        evt.currentTarget.inContainer=false;
                       // console.log(evt.currentTarget.inContainer);
                        TweenMax.to(evt.currentTarget,3,{x:"20",y:"450",ease:Bounce.easeOut});


                    }
                else if(((evt.currentTarget.x>20&&evt.currentTarget.x<945)&&(evt.currentTarget.y>400))&&(evt.currentTarget.inContainer==true)){
                       // console.log(evt.currentTarget.inContainer);
                        TweenMax.to(evt.currentTarget,3,{x:"400",y:"200",ease:Bounce.easeOut});

                }

                
                  

                
             //console.log(evt.currentTarget.inContainer);
               
            
      
          
            

        

                    
                   
             });
             App.container[i].addEventListener("click",function(evt){
              var temp=evt.currentTarget.name;

              //document.getElementById(evt.currentTarget.name).onclick=selectall(evt.currentTarget.name);
              

                
                if(evt.currentTarget.getChildByName(evt.currentTarget.name)!=undefined)
                console.log(evt.currentTarget.name);
                else
                console.log("child not exits");

             });
            // document.getElementById(evt.currentTarget.name).style
            App.clearAll_button.addEventListener("click",function(evt){
               for(var i=1;i<100;i++){
                    if(App.container[i]!=undefined){
                    
                    if(App.container[i].inContainer===true){
                      document.getElementById(i).style.visibility="hidden";
                      App.stage.removeChild(App.container[i]);
                    
                  }
                }
                    
                }
     
    console.log("clear All accessed");
                                  
                  
            });
            App.hideAll_button.addEventListener("click",function(evt){
               // hide all values
                for(var i=1;i<100;i++){
                  if(App.container[i]!=undefined){
                    App.index[i] = App.container[i].getChildIndex(App.flip_normal[i]);
                    if((App.index[i]!=2)&&(App.container[i].inContainer==true)){
                    App.container[i].swapChildrenAt(0,2);
                    //document.getElementById(i).style.visibility="hidden";
                    App.enterquestionDom[i].visible=false;

                    }
                  }
                    
                }
                
                
            });
            
           App.showAll_button.addEventListener("click",function(evt){
                //show all values
                for(var i=1;i<100;i++){
                  if(App.container[i]!=undefined){
                    App.index[i] = App.container[i].getChildIndex(App.flip_normal[i]);
                    if((App.index[i]==2)&&(App.container[i].inContainer==true)){
                    App.container[i].swapChildrenAt(0,2);
                     //document.getElementById(i).style.visibility="visible";
                     App.enterquestionDom[i].visible=true;

                   }
                   
                    }
                }

            });

        



            
              
            }
          function selectall(temp){
                //container[temp].selected=true;
                console.log(temp);
                document.getElementById(temp).focus();
                document.getElementById(temp).select();
              }


            

            
        }

      
            
        



            
            /////// function event handlers////
            function viewMain(){
                App.stage.removeAllChildren();
               // logo.style.zIndex=100000000;
                App.recycleBin_norm.x=872;
                App.recycleBin_norm.y=461;
                App.showAll_button.x=540;
                App.showAll_button.y=527;
                App.hideAll_button.x=380;
                App.hideAll_button.y=527;
                App.clearAll_button.x=700;
                App.clearAll_button.y=527;
                //logo.x=800;
                //logo.y=-5;
                App.stage.addChild(App.recycleBin_norm,App.mainContainer,App.clearAll_button,App.showAll_button,App.hideAll_button);
                get_stack(App.num_of_cards);
                //console.log("view main ma access ho raha ha");
                App.stage.update();
            }
            function get_stack(num_of_cards){
               
               // console.log(num_of_cards);
                App.stack.x=20;
                App.stack.y=450;
                App.stage.addChild(App.stack);
                 for(var i=App.maxNumber+(num_of_cards-1);i>=num_of_cards;i--){
                  //when num of cards =1 , 4+1-1=4 1,2,3// i=3 , 4+3-1=6, 3,4,5,; i =5 8 ,5 6 7 ---!

                  //if(bitmapArray[i]==undefined){
                    App.container[i].x=20;
                    App.container[i].y=450;
                    App.container[i].inContainer=false;
                    //bitmapArray[i]=container[i].name;
                   // console.log(container[i].inContainer);

                    App.stage.addChild(App.container[i]);
                    App.stage.update();
                  }
                 
          getCardType(App.b);
                  if(document.getElementById("cardValues").checked){
                       for(var i=1;i<100;i++){
                              if((App.container[i]!=undefined)&&(App.container[i].inContainer==false)){
                                
                                App.container[i].swapChildrenAt(0,2);
                                //document.getElementById(i).style.visibility="hidden";
                                App.enterquestionDom[i].visible=false;

                                }
                              
                                
                            }
            console.log("hello checked");
                    }
                    


                
             // }
                


            }
            function stagePressHandler(e){
           console.log(e.stageX+" ::: "+e.stageY);
            }


            /////////////////////////ticker/////////////////////////////////////
        function tick(){


        App.stage.update();
        }
           
    // Export to window
    ns.App = App;
})(window.IMT_Numbercards = window.IMT_Numbercards || {}, jQuery);
