$(function () {
	
	var $rectangle=$('#lkt_rectangle');
	var $add_round=$('#lkt_round');
	var $lkt_main=$("#lkt_main");
	var mainW=$lkt_main.width();
	var mainH=$lkt_main.height();
	var mainL=$lkt_main.offset().left;
	var mainT=$lkt_main.offset().top;
	var sizell;
	var sizett;
	debugger
	addDiv();
	divMove();
	divSize();
	function createDrawing(){

	}

	function addDiv(){
		var hid;
		var type;
		var houseid;
		$rectangle.on("click",function(){
			hid = $("#storageid").bootstrapSelect("getValue");
			if($lkt_main.find(".lkt_rectangle").length>0){
				for(var i=0;i<$lkt_main.find(".lkt_rectangle").length;i++){
					houseid = $lkt_main.find(".lkt_rectangle").eq(i).attr("id");
					if(houseid==hid){
                        $.bootstrapBox.alert.init({message: "该仓房位置已在库区图上布局"})
						return;
					}
					
				}
			}
			if($lkt_main.find(".lkt_round").length>0){
				for(var i=0;i<$lkt_main.find(".lkt_round").length;i++){
					houseid = $lkt_main.find(".lkt_round").eq(i).attr("id");
					if(houseid==hid){
                        $.bootstrapBox.alert.init({message: "该仓房位置已在库区图上布局"})
						return;
					}
					
				}
			}
			console.log(rectangle)
			$(this).find(".lkt_rectangle").attr("id",hid);
			$(this).find(".lkt_rectangle").attr("lang",1);
			var rectangle=$(this).html();
			$lkt_main.append(rectangle);
			$("div[class='lkt_move']").smartMenu(imageMenuData);
			//delData();
			

		});
		
		$add_round.on("click",function(){
			hid = $("#storageid").bootstrapSelect("getValue");
			if($lkt_main.find(".lkt_round").length>0){
				for(var i=0;i<$lkt_main.find(".lkt_round").length;i++){
					houseid = $lkt_main.find(".lkt_round").eq(i).attr("id");
					if(houseid==hid){
                        $.bootstrapBox.alert.init({message: "该仓房位置已在库区图上布局"})
						return;
					}
					
				}
			}
			if($lkt_main.find(".lkt_rectangle").length>0){
				for(var i=0;i<$lkt_main.find(".lkt_rectangle").length;i++){
					houseid = $lkt_main.find(".lkt_rectangle").eq(i).attr("id");
					if(houseid==hid){
                        $.bootstrapBox.alert.init({message: "该仓房位置已在库区图上布局"})
						return;
					}
					
				}
			}
			$(this).find(".lkt_round").attr("id",hid);
			$(this).find(".lkt_round").attr("lang",2);
			var round=$(this).html();
			
			$lkt_main.append(round);
            $("div[class='lkt_move']").smartMenu(imageMenuData);
			//delData();

		});
	}
	
	function divMove(){
		var flag=false;

		var boxW=$lkt_main.find(".lkt_move").parent().width()+10;
		var boxH=$lkt_main.find(".lkt_move").parent().height()+10;

		
		var moveL;
		var moveT;
		$lkt_main.on("mouseover",".lkt_move",function(e){
			$(this).addClass("add_move");
			e.stopPropagation();
		});
		$lkt_main.on("mouseout",".lkt_move",function(e){

			$(this).removeClass("add_move");
			
			e.stopPropagation();
		});
		$lkt_main.on("mousedown",".lkt_move",function(e){
			flag=true;
			var _this=$(this);
			boxW=_this.parent().width()+10;
			boxH=_this.parent().height()+10;

			moveL=e.pageX-_this.parent().offset().left;
			moveT=e.pageY-_this.parent().offset().top;

			movebody(_this,flag,boxW,boxH,moveL,moveT);
			

			e.stopPropagation();

		});
		
		
	}
	function movebody(_this,flag,boxW,boxH,moveL,moveT){
		$("body").on("mousemove",function(e){
				if(flag){
					var newL=e.pageX-moveL-mainL;
					var newT=e.pageY-moveT-mainT;
					
						if(newL<0 && newT<0){

							newL = 5;
							newT = 5;

						}else if(newL<0 && newT + boxH >= mainH){

							newL = 5;
							newT = mainH - boxH - 5;

						}else if(newL + boxW >= mainW && newT<0){

							newL = mainW - boxW - 5;
							newT = 5;

						}else if(newL + boxW >= mainW && newT + boxH >= mainH){

							newL = mainW - boxW - 5;
							newT = mainH - boxH - 5;
							
						}else if(newL<0 || newT<0){

							newL=newL<0 ? 5 : newL;

							newT=newT<0 ? 5 : newT; 

						}else if(newL + boxW >= mainW || newT + boxH >= mainH){

							newL =	newL + boxW < mainW ? newL : mainW - boxW - 5;
							newT =	newT + boxH < mainH ? newT : mainH - boxH - 5;	
							
						}
						
					_this.parent().css({"left":newL,"top":newT});
				}
			});
			$lkt_main.on("mouseup",function(e){
				flag=false;
				// if($lkt_main.find(".lkt_move").length>0){
				// 	sizell=_this.offset().left;
				// 	sizett=_this.offset().top;
				// }
			});
	}
	function divSize(){
		var flag=false;
		// var moveL;
		// var moveT;

		// var oldleft;
		// var oldtop;
		
		// var boxWi;
		// var boxHe;

		var sizell;
		var sizett;
		// sizell=$lkt_main.find(".lkt_size").offset().left;
		// sizett=$lkt_main.find(".lkt_size").offset().top;

		// var sizeL=$lkt_main.find(".lkt_size").position().left;
		// var sizeT=$lkt_main.find(".lkt_size").position().top;

		$lkt_main.on("mouseover",".lkt_size",function(e){
			var boxW=$(this).width()+10;
			var boxH=$(this).height()+10;
			sizell=$(this).offset().left;
			sizett=$(this).offset().top;

			if(e.pageX < sizell+10 && e.pageX >sizell-15 && e.pageY < sizett+10 && e.pageY >sizett-15 ){
			 	$(this).addClass("add_size_lt");
			 }else if(e.pageX < sizell+boxW+15 && e.pageX >sizell+boxW-10 && e.pageY < sizett+10 && e.pageY >sizett-15){
			 	$(this).addClass("add_size_rt");
			 }else if(e.pageX < sizell+10 && e.pageX >sizell-15 && e.pageY < sizett+boxH+15 && e.pageY >sizett+boxH-10){
			 	$(this).addClass("add_size_ld");
			 }else if(e.pageX < sizell+boxW+15 && e.pageX >sizell+boxW-10 && e.pageY < sizett+boxH+15 && e.pageY >sizett+boxH-10){
			 	$(this).addClass("add_size_rd");
			 }else if( e.pageX < sizell+15 && e.pageX > sizell-15 && e.pageY> sizett+10 && e.pageY< sizett+boxH-10){
				 	
			 	$(this).addClass("add_size_l");
			 }else if(e.pageX < sizell+boxW+15 && e.pageX > sizell+boxW-15 && e.pageY> sizett+10 && e.pageY<sizett+boxH-10){
			 	$(this).addClass("add_size_r");
			 }else if(e.pageY < sizett+15 && e.pageY > sizett-15 && e.pageX>sizell+10 &&  e.pageX< sizell+boxW-10){
			 	$(this).addClass("add_size_t");
			 }else if(e.pageY < sizett+boxH+15 && e.pageY >sizett+boxH-15 && e.pageX>sizell+10 && e.pageX< sizell+boxW-10){
			 	$(this).addClass("add_size_d");
			 }else {
				$(this).removeClass("add_size_l add_size_r add_size_t add_size_d add_size_lt add_size_rt add_size_ld add_size_rd");
			 }
			console.log(sizell)
			console.log(e.pageX)
			 e.stopPropagation();
		});
		$lkt_main.on("mouseout.lkt_size",".lkt_size",function(e){

			$(this).removeClass("add_size_l add_size_r add_size_t add_size_d add_size_lt add_size_rt add_size_ld add_size_rd");

			e.stopPropagation();
		});
		$lkt_main.on("mousedown",".lkt_size",function(e){
			flag=true;

			var _this=$(this);

			sizell=_this.offset().left;
			sizett=_this.offset().top;

			var boxWi=_this.width();
			var boxHe=_this.height();

			var oldleft=e.pageX;
			var oldtop=e.pageY;

			var moveL=e.pageX-sizell;
			var moveT=e.pageY-sizett;

			if(e.type=="mousedown"){

				$lkt_main.off("mouseout.lkt_size");
			}

			sizeMove(_this,flag,moveL,moveT,boxWi,boxHe,oldleft,oldtop);

			e.stopPropagation();
		});

		
		
	}
	function sizeMove(_this,flag,moveL,moveT,boxWi,boxHe,oldleft,oldtop){

		$("body").on("mouseup",function(){
			flag=false;
			$lkt_main.on("mouseout.lkt_size",".lkt_size",function(e){
				
				_this.removeClass("add_size_l add_size_r add_size_t add_size_d add_size_lt add_size_rt add_size_ld add_size_rd");
			 	
				e.stopPropagation();
			});
		});

		$("body").on("mousemove",function(e){
			
			if(flag){
				
				var	newleft=e.pageX-mainL-moveL;
				var	newtop=e.pageY-mainT-moveT;
				var	newwidth=boxWi-(e.pageX-oldleft);
				var	newheight=boxHe-(e.pageY-oldtop);
				
				
				if(newleft<0){
					newleft=5;
					newwidth=boxWi+oldleft-mainL-5;
				}
				if(newtop<0){
					newtop=5;
					newheight=boxHe+oldtop-mainT-5;
				}
				if(newwidth<12){
					newwidth=12;
					newleft=_this.position().left;
				}
				if(newheight<12){
					newheight=12;
					newtop=_this.position().top;
				}


				if(_this.hasClass("add_size_l")){
					
					_this.css({"left":newleft,"width":newwidth});
				}
				if(_this.hasClass("add_size_t")){
					
					_this.css({"top":newtop,"height":newheight});
				}
				if(_this.hasClass("add_size_lt")){
					
				 	_this.css({"left":newleft,"top":newtop,"width":newwidth,"height":newheight});
				}
				if(_this.hasClass("add_size_ld")){
					
					newheight=boxHe+(e.pageY-oldtop);
					
				 	_this.css({"left":newleft,"width":newwidth,"height":newheight});
				}
				if(_this.hasClass("add_size_r")){
					
					newwidth=boxWi+(e.pageX-oldleft);

					_this.css({"width":newwidth});
				}
				 if(_this.hasClass("add_size_d")){
					
					newheight=boxHe+(e.pageY-oldtop);

					_this.css({"height":newheight});
				}
				if(_this.hasClass("add_size_rt")){
					
					newwidth=boxWi+(e.pageX-oldleft);
					
				 	_this.css({"top":newtop,"width":newwidth,"height":newheight});
				}
				if(_this.hasClass("add_size_rd")){
					
					newwidth=boxWi+(e.pageX-oldleft);
					newheight=boxHe+(e.pageY-oldtop);

				 	_this.css({"width":newwidth,"height":newheight});
				}
			}

		});
		
	}
	function divSkew(id){
		var flag=false;
		var $ratings_bars = $("#"+id);
		var skewW = $ratings_bars.find(".scale").width();
		var bili= skewW/180;

	 		$ratings_bars.on("mouseover.skew",".btn0",function(e){
	 			$(this).addClass("btn0_hover");
	 		});
	 		$ratings_bars.on("mouseout.skew",".btn0",function(e){
	 			$(this).removeClass("btn0_hover");
	 		});
	 		$ratings_bars.on("mousedown.skew",".btn0",function(e){
	 			flag=true;
	 			
		 		var	btnL=$(this).offset().left;
		 		var	moveL=e.pageX-btnL;
		 			
			 	$("body").on("mousemove.skew",function(e){
			 		
			 		if(flag && $lkt_main.find(".lkt_size").length>0){

			 			var newleft = e.pageX-btnL-moveL;
			 			
			 			if(newleft<=skewW && newleft>=0){

		 					if(id=="ratings_x")	{
		 					var	skewX=bili*newleft;
		 						$ratings_bars.find(".scale").children("div").width(newleft);
		 						$ratings_bars.find(".btn0").css({"left":newleft});
		 						$ratings_bars.find(".bars_5").html(skewX);
								

			 				}else if(id=="ratings_y"){
							var	skewY=bili*newleft;
								$ratings_bars.find(".scale").children("div").width(newleft);
								$ratings_bars.find(".btn0").css({"left":newleft});
		 						$ratings_bars.find(".bars_5").html(skewY);
			 				}
			 				
			 				skewX=$("#ratings_x").find(".bars_5").html();
			 				skewY=$("#ratings_y").find(".bars_5").html();
			 		
			 				$lkt_main.find(".lkt_size").css({"transform":"skew("+skewX+"deg,"+skewY+"deg)"});	

			 			}
		 			}
			 	});
			 	$("body").on("mouseup.skew",function(){
			 		flag=false;
			 		$ratings_bars.on("mouseout.skew",".btn0",function(){
			 			$(this).removeClass("btn0_hover");
			 		});
			 		
			 	});
		 	});
		 
	}
	function saveData(){
		$("#save_data").on("click",function(){
			var dataarr = new Array();
			if($lkt_main.find(".lkt_size").length>0){
				for(var i=0;i<$lkt_main.find(".lkt_size").length;i++){
					debugger;
					var l = $lkt_main.find(".lkt_size").eq(i).position().left;
					var t = $lkt_main.find(".lkt_size").eq(i).position().top;
					var w = $lkt_main.find(".lkt_size").eq(i).width()+10;
					var h = $lkt_main.find(".lkt_size").eq(i).height()+10;
					var x = $lkt_main.find(".lkt_size").eq(i).css("transform");
					var divtype = $lkt_main.find(".lkt_size").eq(i).attr("lang");
					var houseid = $lkt_main.find(".lkt_size").eq(i).attr("id");
					var arr={};
					arr["houseid"]=houseid;
					arr["position_x"]=l;
					arr["position_y"]=t;
					arr["width"]=w;
					arr["height"]=h;
					arr["divtype"]=divtype;
					console.log(arr);
					dataarr.push(arr);
				}

				$.post("house_setHousePosition",{ids:JSON.stringify(dataarr)},function(data){
					if(data.message == "success")
						alert("保存成功!");
				},"json");
				$(".btn0").css({"left":"-2px"});
				$(".bars_5").html(0);
				$(".scale").children("div").width(0);
				$lkt_main.find(".lkt_size").remove();
				
			}
		})
	}










})