/* * http://www.humage.com/
 * Copyright (c) 2010 Humage.com
 * Date: 3/2011
 */$.fn.single_double_click=function(double_click_callback,timeout){return this.each(function(){var clicks=0,self=this;$(this).bind('touchstart mousedown',function(evt){if(++clicks==1){setTimeout(function(){if(clicks==1){}else{double_click_callback.call(self,evt);}
clicks=0;},timeout||500);}
return false;});});}
function getEvtOffset(evt){var evtOffset;if(evt.pageY&&evt.pageX)
evtOffset={top:evt.pageY,left:evt.pageX};else if(evt.originalEvent&&evt.originalEvent.touches)
{evtOffset={top:evt.originalEvent.touches[0].pageY,left:evt.originalEvent.touches[0].pageX};}
return evtOffset;}
var cssTransforms=['transform','msTransform','MozTransform','WebkitTransform','OTransform'];$.fn.rotateAngle=function(rad){var deg=rad*180/Math.PI;var transform='rotate('+deg+'deg)';for(var i in cssTransforms)
this.css(cssTransforms[i],transform);return this;}
function normalize(v){var z=Math.sqrt(v[0]*v[0]+v[1]*v[1]);v=[v[0]/z,v[1]/z];return v;}
function card(row,col)
{this.$div=$('<div>').addClass('rotatable draggable card').css({width:this.width,height:this.height,background:'#FFF url(image/icon_wait.gif) no-repeat center'}).each(function(){this.row=row;this.col=col;this.imagePos='0';this.flipOpen=false;this.lastPt=$(this).offset();this.sliding=false;this.dragged=false;this.dx=0;this.dy=0;this.cardClass=this;}).appendTo($playingArea);}
card.init=function(width,height,scale)
{this.originalWidth=width;this.originalHeight=height;this.scaleSize(scale);};card.scaleSize=function(scale)
{if(!$.support.BackgroundSize)scale=1;this.width=this.originalWidth*scale;this.height=this.originalHeight*scale;var pX=this.width*2,pY=this.height*4;this.backImagePos=-pX+'px '+-pY+'px';};card.prototype={updateBkgImg:function(imgSrc){this.$div.css('background-image','url('+imgSrc+')');},updateSize:function(){this.$div.each(function(){this.imagePos=(-card.width*this.row)+'px '
+(-card.height*this.col)+'px';$(this).css({width:card.width,height:card.height,backgroundPosition:this.flipOpen?this.imagePos:card.backImagePos});})},update:function(imgSrc){this.updateBkgImg(imgSrc);this.updateSize();this.$div.css('backgroundSize','1300% 500%');}};$.fn.flipCard=function(state){return this.each(function(){$(this).animate({'opacity':0.5},200,function(){if(this.flipOpen==state)return;if(this.flipOpen=!this.flipOpen)
$(this).css({backgroundPosition:this.imagePos});else
$(this).css({backgroundPosition:card.backImagePos});}).animate({'opacity':1},200);})}
var cardDeck=new Array(),$playingArea,cardScale=1;$(document).ready(function(){$playingArea=$('#playingArea').empty().bind('contextmenu',function(){return false;}).dblclick(function(evt){if(evt.target!==this)return;$('#help').toggle();}).bind('touchstart mousedown',function(evt){if(!evt.ctrlKey)
$('.draggable').removeClass('groupSelected');if(evt.type=='mousedown'&&evt.which!=1)return;$selectBox.start=getEvtOffset(evt);$selectBox.min={top:$selectBox.start.top,left:$selectBox.start.left};$(this).bind('touchmove.groupSelect mousemove.groupSelect',function(evt){var evtOffset=getEvtOffset(evt),w=evtOffset.left-$selectBox.start.left,h=evtOffset.top-$selectBox.start.top,offset=$selectBox.min;if(w<0){w*=-1;offset.left=evtOffset.left;}
if(h<0){h*=-1;offset.top=evtOffset.top;}
$selectBox.css({width:w,height:h}).offset(offset).show();});if(evt.preventDefault)
evt.preventDefault();});for(var j=0;j<5;++j)
for(var i=0;i<13;++i)
{if(cardDeck.length>=54)break;cardDeck.push(new card(i,j));}
$('<img>').load(function(){cardScale=$(window).innerHeight()/this.height*1.5;card.init(this.width/13,this.height/5,cardScale);for(var k in cardDeck)
cardDeck[k].update(this.src);}).attr('src','image/svg-cards.png');$('#help .closeBtn').click(function(){$('#help').toggle();});$('.draggable').bind('touchstart mousedown',function(evt){$(this).removeClass('dragSelected').removeShadow();if(evt.type=='mousedown'&&evt.which!=1)return;if(evt.preventDefault)
evt.preventDefault();evt.stopPropagation();var $group=$(this);if(evt.ctrlKey)
{$(this).toggleClass('groupSelected');if(!$(this).hasClass('groupSelected'))
return;}
if($(this).hasClass('groupSelected'))
$group=$(this).siblings('.groupSelected').andSelf();else
{$(this).addClass('groupSelected').siblings().removeClass('groupSelected');}
var evtOffset=getEvtOffset(evt);$group.each(function(){var $moveElement=$(this).addClass('dragSelected').rotateShadow().appendTo($(this).parent());this.dragged=true;this.sliding=false;var offset=$moveElement.offset();offset=$moveElement.offset();$moveElement.offset({top:offset.top-10,left:offset.left-10});this.lastPt=offset;var clickPt={top:evtOffset.top-offset.top,left:evtOffset.left-offset.left};$(this).parent().bind('touchmove.drag mousemove.drag',function(evt){var offset=getEvtOffset(evt);if(offset)
$moveElement.offset({top:offset.top-clickPt.top,left:offset.left-clickPt.left});});});}).single_double_click(function(){var $group=$(this);if($(this).hasClass('groupSelected'))
$group=$(this).siblings('.groupSelected').andSelf();else
$(this).siblings().removeClass('groupSelected');$group.flipCard(!this.flipOpen);})
$.fn.rotateToMouse=function(allAngle){return this.each(function(){var $element=$(this),angle=allAngle;if(this.anchorAngle)
{angle=angle-this.anchorAngle;while(angle>2*Math.PI)angle-=2*Math.PI;while(angle<0)angle+=2*Math.PI;}
var offset=$element.rotateAngle(0).offset();$element.rotateAngle(angle);var cos=Math.cos(angle),sin=Math.sin(angle);if(cos<0)cos*=-1;if(sin<0)sin*=-1;var h=$element.innerHeight(),w=$element.innerWidth(),nh=h*cos+w*sin,nw=w*cos+h*sin,currentOffset=$element.offset(),delta={top:offset.top-(nh-h)/2-currentOffset.top,left:offset.left-(nw-w)/2-currentOffset.left};this.rotated={angle:angle,width:nw,height:nh,delta:delta};});}
$.fn.getCenter=function(){var offset=this.offset();if(this[0].rotated)
{var angle=this[0].rotated.angle;offset=this.rotateAngle(0).offset();this.rotateAngle(angle);}
var center={x:offset.left+this.innerWidth()/2,y:offset.top+this.innerHeight()/2};return center;};$.fn.rotateShadow=function(){return this.each(function(){if(!this.rotated)return;var cos=Math.cos(this.rotated.angle),sin=Math.sin(this.rotated.angle),x=Math.round(5*(cos+sin)),y=Math.round(5*(cos-sin));$(this).css({'box-shadow':x+'px '+y+'px 5px #000','-moz-box-shadow':x+'px '+y+'px 5px #000','-webkit-box-shadow':x+'px '+y+'px 5px #000'});});};$.fn.removeShadow=function(){return this.each(function(){if(!this.rotated)return;$(this).css({'box-shadow':'none','-moz-box-shadow':'none','-webkit-box-shadow':'none'});});};$.support.BackgroundSize=false;$.each(['backgroundSize','MozBackgroundSize','WebkitbackgroundSize','ObackgroundSize'],function(){if(document.body.style[this]!==undefined)$.support.BackgroundSize=true;});var supported=[];for(var i in cssTransforms)
{if(cssTransforms[i]in document.body.style)
supported.push(cssTransforms[i]);}
cssTransforms=supported;var $selectBox=$('<div id="selectBox">').css('opacity',0.5).hide().appendTo($playingArea);$(document).bind('touchend mouseup',function(){if($selectBox.is(':visible'))
{var maxLeft=$selectBox.min.left+$selectBox.width(),maxTop=$selectBox.min.top+$selectBox.height();}
$('.draggable').each(function(){var $this=$(this),offset=$this.offset();if(this.dragged){$this.offset({top:offset.top,left:offset.left}).removeClass('dragSelected').removeShadow().parent().unbind('touchmove.drag mousemove.drag');this.lastPt=$this.offset();this.dragged=false;this.sliding=true;}
if($selectBox.is(':visible'))
{var h=$this.height(),w=$this.width();if(this.rotated)
{offset.top+=this.rotated.delta.top;offset.left+=this.rotated.delta.left;h=this.rotated.height;w=this.rotated.width;}
if(offset.top+h<maxTop&&offset.top>$selectBox.min.top&&offset.left+w<maxLeft&&offset.left>$selectBox.min.left)
{$this.addClass('groupSelected').appendTo($this.parent());}}}).parent().unbind('touchmove.groupSelect mousemove.groupSelect');$selectBox.hide();});$(window).keydown(function(e){switch(e.keyCode){case 112:$('#help').toggle();return false;break;}});setInterval(animate,100);});function animate()
{$('.groupSelected').toggleClass('blink');$('.draggable').each(function(){var $this=$(this);if(this.dragged)
{var offset=$this.offset();this.dy=offset.top-this.lastPt.top;this.dx=offset.left-this.lastPt.left;this.lastPt=offset;}
if(this.sliding)
{var slideFriction=0.8,bounceFriction=0.1;this.dy*=slideFriction;this.dx*=slideFriction;if((Math.abs(this.dy)<0.1)&&(Math.abs(this.dx)<0.1))
{this.sliding=false;}
this.lastPt.top+=this.dy;this.lastPt.left+=this.dx;var h=$this.innerHeight(),w=$this.innerWidth();if(this.anchorAngle&&this.rotated){this.lastPt.top+=this.rotated.delta.top;this.lastPt.left+=this.rotated.delta.left;h=this.rotated.height;w=this.rotated.width;}
var $parent=$this.parent(),parentOffset=$parent.offset(),minY=parentOffset.top;if(this.lastPt.top<minY){this.dy=Math.abs(this.dy)*bounceFriction;this.lastPt.top=minY;}
var maxY=$parent.innerHeight()-h+minY;if(this.lastPt.top>maxY){this.dy=-Math.abs(this.dy)*bounceFriction;this.lastPt.top=maxY;}
var minX=parentOffset.left;if(this.lastPt.left<minX){this.dx=Math.abs(this.dx)*bounceFriction;this.lastPt.left=minX;}
var maxX=$parent.innerWidth()-w+minX;if(this.lastPt.left>maxX){this.dx=-Math.abs(this.dx)*bounceFriction;this.lastPt.left=maxX;}
if(this.rotated){this.lastPt.top-=this.rotated.delta.top;this.lastPt.left-=this.rotated.delta.left;}
$this.offset({top:Math.round(this.lastPt.top),left:Math.round(this.lastPt.left)});}});}