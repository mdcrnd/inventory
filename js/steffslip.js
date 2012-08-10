if(typeof _STNS!="undefined"&&_STNS.EFFECT&&!_STNS.EFFECT.CEffSlip){
with(_STNS.EFFECT){
_STNS.EFFECT.CEffSlip=_STNS.Class(_STNS.EFFECT.CEffect);
CEffSlip.register("EFFECT/CEffect>CEffSlip");
CEffSlip.construct=function(as){
this._tTid=0;
this._iX=0;
this._iY=0;
this._iCurWid=0;
this._iCurHei=0;
this._bShow=0;
this._iGid=-1;
this._iFms=12;
this._iDt=50;
this._iDx=0;
this._iDy=0;
this.iDir=4;
this.iDur=as[3];
with(_STNS.EFFECT.CEffSlip){
this.fbApply=fbApply;
this.fbPlay=fbPlay;
this.fbStop=fbStop;
this.fbSet=fbSet;
this.fbSetStyle=fbSetStyle;
this.fbShow=fbShow;
this.fbHide=fbHide;
this.faParse=faParse;
}
if(as[4]){
this.fbSetStyle(as[4]);
}
};
CEffSlip.fbSet=function(){
var _r=_STNS,e,n;
if(e=_r.fdmGetEleById(this.sDmId,this.dmWin)){
if(e.style.position!="absolute"){
return false;
}
if(this._iGid==-1){
n=_r.EFFECT.CEffSlip._aGlobal.length;
_r.EFFECT.CEffSlip._aGlobal.push(this);
this._iGid=n;
}
this._iStat=0;
return true;
}
return false;
};
CEffSlip.fbDel=function(){
this.fbStop();
if(this._iGid!=-1){
_STNS.EFFECT.CEffSlip._aGlobal[this._iGid]=null;
}
this._iStat=-1;
return true;
};
CEffSlip.fbApply=function(){
var _r=_STNS;
if(!_r.EFFECT.CEffSlip._aGlobal[this._iGid]){
_r.EFFECT.CEffSlip._aGlobal[this._iGid]=this;
}
if(e=_r.fdmGetEleById(this.sDmId,this.dmWin)){
this._iCurWid=_r.fiGetEleWid(e);
this._iCurHei=_r.fiGetEleHei(e);
this._iDt=Math.ceil(this.iDur/this._iFms);
this._iDx=Math.floor(this._iCurWid/this._iFms);
this._iDy=Math.floor(this._iCurHei/this._iFms);
}
this._iStat=1;
return true;
};
CEffSlip.fbPlay=function(){
var e=_STNS.fdmGetEleById(this.sDmId,this.dmWin);
if(!this._bShow){
if(!e.style.clip||e.style.clip.indexOf("auto")!=-1){
e.style.clip="rect(0px "+this._iCurWid+"px "+this._iCurHei+"px 0px)";
}
this.fbHide();
}else{
if(!e.style.clip||e.style.clip.indexOf("auto")!=-1){
e.style.clip="rect("+this._iCurHei+"px 0px 0px "+this._iCurWid+"px)";
}
this.fbShow();
}
this._iStat=2;
return true;
};
CEffSlip._aGlobal=[];
CEffSlip.fbStop=function(){
if(this._iStat>0){
clearTimeout(this._tTid);
var e=_STNS.fdmGetEleById(this.sDmId,this.dmWin);
e.style.left=this._iX+"px";
e.style.top=this._iY+"px";
e.style.clip="rect(auto auto auto auto)";
if(this._bShow){
e.style.visibility="visible";
}else{
e.style.visibility="hidden";
}
this._iStat=0;
}
return true;
};
CEffSlip.fbSetStyle=function(s){
var _r=_STNS,ss;
ss=_r.foCss2Style(s);
if(ss["visibility"]=="hidden"){
this._bShow=0;
}else{
if(ss["visibility"]=="visible"){
this._bShow=1;
}
}
if(ss["left"]){
this._iX=parseInt(ss["left"]);
}
if(ss["top"]){
this._iY=parseInt(ss["top"]);
}
if(ss["_stDirection"]){
this.iDir=parseInt(ss["_stDirection"]);
}
};
CEffSlip.fbShow=function(t){
var e=_STNS.fdmGetEleById(this.sDmId,this.dmWin);
if(!t){
var cc=this.faParse(e.style.clip);
switch(this.iDir){
case 1:
t=Math.floor(cc[1]/this._iDx);
e.style.top=this._iY+"px";
break;
case 2:
t=Math.floor((this._iCurWid-cc[3])/this._iDx);
e.style.top=this._iY+"px";
break;
case 3:
t=Math.floor(cc[2]/this._iDy);
e.style.left=this._iX+"px";
break;
case 4:
t=Math.floor((this._iCurHei-cc[0])/this._iDy);
e.style.left=this._iX+"px";
break;
}
this._tTid=setTimeout("_STNS.EFFECT.CEffSlip._aGlobal["+this._iGid+"].fbShow("+(++t)+")",this._iDt);
return true;
}
if(t>=this._iFms){
e.style.left=this._iX+"px";
e.style.top=this._iY+"px";
e.style.clip="rect(auto auto auto auto)";
_STNS.EFFECT.CEffSlip._aGlobal[this._iGid]=null;
this._iStat=0;
return true;
}else{
switch(this.iDir){
case 1:
e.style.left=(this._iX+this._iCurWid-t*this._iDx)+"px";
e.style.clip="rect(0px "+t*this._iDx+"px "+this._iCurHei+"px 0px)";
break;
case 2:
e.style.left=(this._iX-this._iCurWid+t*this._iDx)+"px";
e.style.clip="rect(0px "+this._iCurWid+"px "+this._iCurHei+"px "+(this._iCurWid-t*this._iDx)+"px)";
break;
case 3:
e.style.top=(this._iY+this._iCurHei-t*this._iDy)+"px";
e.style.clip="rect(0px "+this._iCurWid+"px "+t*this._iDy+"px 0px)";
break;
case 4:
e.style.top=(this._iY-this._iCurHei+t*this._iDy)+"px";
e.style.clip="rect("+(this._iCurHei-t*this._iDy)+"px "+this._iCurWid+"px "+this._iCurHei+"px 0px)";
break;
}
e.style.visibility="visible";
}
this._tTid=setTimeout("_STNS.EFFECT.CEffSlip._aGlobal["+this._iGid+"].fbShow("+(++t)+")",this._iDt);
return true;
};
CEffSlip.fbHide=function(t){
var e=_STNS.fdmGetEleById(this.sDmId,this.dmWin);
if(!t){
var cc=this.faParse(e.style.clip);
switch(this.iDir){
case 1:
t=Math.floor((this._iCurWid-cc[1])/this._iDx);
e.style.top=this._iY+"px";
break;
case 2:
t=Math.floor(cc[3]/this._iDx);
e.style.top=this._iY+"px";
break;
case 3:
t=Math.floor((this._iCurHei-cc[2])/this._iDy);
e.style.left=this._iX+"px";
break;
case 4:
t=Math.floor(cc[0]/this._iDy);
e.style.left=this._iX+"px";
break;
}
this._tTid=setTimeout("_STNS.EFFECT.CEffSlip._aGlobal["+this._iGid+"].fbHide("+(++t)+")",this._iDt);
e.style.visibility="visible";
return true;
}
if(t>=this._iFms){
e.style.left=this._iX+"px";
e.style.top=this._iY+"px";
e.style.clip="rect(auto auto auto auto)";
e.style.visibility="hidden";
_STNS.EFFECT.CEffSlip._aGlobal[this._iGid]=null;
this._iStat=0;
return true;
}else{
switch(this.iDir){
case 1:
e.style.left=(this._iX+t*this._iDx)+"px";
e.style.clip="rect(0px "+(this._iCurWid-t*this._iDx)+"px "+this._iCurHei+"px 0px)";
break;
case 2:
e.style.left=(this._iX-t*this._iDx)+"px";
e.style.clip="rect(0px "+this._iCurWid+"px "+this._iCurHei+"px "+t*this._iDx+"px)";
break;
case 3:
e.style.top=(this._iY+t*this._iDy)+"px";
e.style.clip="rect(0px "+this._iCurWid+"px "+(this._iCurHei-t*this._iDy)+"px 0px)";
break;
case 4:
e.style.top=(this._iY-t*this._iDy)+"px";
e.style.clip="rect("+t*this._iDy+"px "+this._iCurWid+"px "+this._iCurHei+"px 0px)";
break;
}
this._tTid=setTimeout("_STNS.EFFECT.CEffSlip._aGlobal["+this._iGid+"].fbHide("+(++t)+")",this._iDt);
}
return true;
};
CEffSlip.faParse=function(s){
var t;
if(s.indexOf(",")!=-1){
t=s.split(",");
}else{
t=s.split(" ");
}
t[0]=parseInt(t[0].substr(5));
for(var j=1;j<t.length;j++){
t[j]=parseInt(t[j]);
}
return t;
};
}
}

