"use strict";(self.webpackChunkchosu_inventory_front=self.webpackChunkchosu_inventory_front||[]).push([[70],{4070:(S,u,a)=>{a.r(u),a.d(u,{TagsModule:()=>b});var l=a(6814),g=a(2526),d=a(5861),t=a(4946),p=a(6125),_=a(6346),v=a(5634),f=a(2381);function x(n,i){if(1&n){const s=t.EpF();t.TgZ(0,"div",16)(1,"a",17),t.NdJ("click",function(){t.CHM(s);const o=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.editTag(o))}),t._UZ(2,"i",18),t.qZA(),t.TgZ(3,"a",19),t.NdJ("click",function(){t.CHM(s);const o=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.deleteTagModal(o))}),t._UZ(4,"i",20),t.qZA()()}}function T(n,i){if(1&n){const s=t.EpF();t.TgZ(0,"button",14),t.NdJ("click",function(){const r=t.CHM(s).$implicit,c=t.oxw(2);return t.KtG(c.selectTag(r))}),t.TgZ(1,"p"),t._uU(2),t.qZA(),t.YNc(3,x,5,0,"div",15),t.qZA()}if(2&n){const s=i.$implicit,e=t.oxw(2);t.ekj("activeBtn",e.activeButton===s.tagname),t.xp6(2),t.Oqu(s.tagname),t.xp6(1),t.Q6J("ngIf",e.usersService.isLogged())}}function m(n,i){if(1&n){const s=t.EpF();t.TgZ(0,"button",21)(1,"p"),t._uU(2),t.qZA(),t.TgZ(3,"div",16)(4,"a",17),t.NdJ("click",function(){const r=t.CHM(s).$implicit,c=t.oxw(2);return t.KtG(c.editOwner(r))}),t._UZ(5,"i",18),t.qZA()()()}if(2&n){const s=i.$implicit,e=t.oxw(2);t.ekj("activeBtn",e.activeButton===s.owner),t.xp6(2),t.Oqu(s.owner)}}function w(n,i){if(1&n){const s=t.EpF();t.TgZ(0,"div",6)(1,"div",7)(2,"h4",8)(3,"b"),t._uU(4,"Etiquetas"),t.qZA()(),t.TgZ(5,"div",9),t.YNc(6,T,4,4,"button",10),t.qZA(),t.TgZ(7,"button",11),t.NdJ("click",function(){t.CHM(s);const o=t.oxw();return t.KtG(o.tagsService.isNewTagModal=!0)}),t._uU(8," Agregar etiqueta "),t.qZA()(),t.TgZ(9,"div",7)(10,"h4",8)(11,"b"),t._uU(12,"Due\xf1os"),t.qZA()(),t.TgZ(13,"div",12),t.YNc(14,m,6,3,"button",13),t.qZA(),t.TgZ(15,"button",11),t.NdJ("click",function(){t.CHM(s);const o=t.oxw();return t.KtG(o.ownersService.isNewOwnerModal=!0)}),t._uU(16," Agregar due\xf1o "),t.qZA()()()}if(2&n){const s=t.oxw();t.xp6(6),t.Q6J("ngForOf",s.tags),t.xp6(8),t.Q6J("ngForOf",s.owners)}}function h(n,i){1&n&&(t.TgZ(0,"div",22),t.O4$(),t.TgZ(1,"svg",23),t._UZ(2,"path",24),t.qZA()())}const Z=[{path:"",component:(()=>{var n;class i{constructor(e,o,r,c){this.tagsService=e,this.usersService=o,this.itemsService=r,this.ownersService=c}ngOnInit(){this.activeButton="",this.tagsService.setTags(),this.ownersService.setOwners(),this.tagsService.tags$.subscribe(e=>{this.tags=e}),this.ownersService.owners$.subscribe(e=>{this.owners=e})}selectTag(e){var o=this;return(0,d.Z)(function*(){o.activeButton=e.tagname,o.tagsService.setSelectedTag(e)})()}editTag(e){this.tagsService.setSelectedTag(e),this.tagsService.isUpdateTagModal=!0}deleteTagModal(e){this.tagsService.setSelectedTag(e),this.tagsService.isDeleteTagModal=!0}selectOwner(e){var o=this;return(0,d.Z)(function*(){o.activeButton=e.owner,o.ownersService.setSelectedOwner(e)})()}editOwner(e){this.ownersService.setSelectedOwner(e),this.ownersService.isUpdateOwnerModal=!0}deleteOwnerModal(e){this.ownersService.setSelectedOwner(e),this.ownersService.isDeleteOwnerModal=!0}isLoading(){return 0===this.tags?.length}}return(n=i).\u0275fac=function(e){return new(e||n)(t.Y36(p.i),t.Y36(_.f),t.Y36(v.L),t.Y36(f.C))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-tags"]],decls:7,vars:2,consts:[[1,"relative","flex","justify-center","bg-slate-100","items-center","py-2","min-h-full"],["routerLink","/items/all",1,"absolute","left-3","top-1"],[1,"fa-solid","fa-arrow-left"],["class","options-container flex gap-3 pt-5",4,"ngIf","ngIfElse"],["class","text-center"],["loadedBlock",""],[1,"options-container","flex","gap-3","pt-5"],[1,"flex","flex-col","gap-2","p-2","pt-0","bg-white","rounded-lg","shadow-lg"],[1,"mt-3","text-center"],[1,"tags","flex","flex-col","gap-2","flex-wrap"],["class","flex justify-between gap-1 px-2 rounded-lg text-start hover:bg-blue-300 max-w-xs",3,"activeBtn","click",4,"ngFor","ngForOf"],[1,"px-2","rounded-lg","bg-green-300","max-w-xs",3,"click"],[1,"owners","flex","flex-col","gap-2","flex-wrap"],["class","flex justify-between gap-1 px-2 rounded-lg text-start hover:bg-blue-300 max-w-xs",3,"activeBtn",4,"ngFor","ngForOf"],[1,"flex","justify-between","gap-1","px-2","rounded-lg","text-start","hover:bg-blue-300","max-w-xs",3,"click"],["class","flex gap-1 hidden-link",4,"ngIf"],[1,"flex","gap-1","hidden-link"],[3,"click"],[1,"fa-solid","fa-pencil"],[1,"text-red-600",3,"click"],[1,"fa-solid","fa-trash-can"],[1,"flex","justify-between","gap-1","px-2","rounded-lg","text-start","hover:bg-blue-300","max-w-xs"],[1,"flex","justify-center"],["xmlns","http://www.w3.org/2000/svg","height","48","viewBox","0 -960 960 960","width","48",1,"animate-spin"],["d","M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80Z",1,"fill-slate-400"]],template:function(e,o){if(1&e&&(t.TgZ(0,"section",0)(1,"button",1),t._UZ(2,"i",2),t._uU(3," Volver "),t.qZA(),t.YNc(4,w,17,2,"div",3),t.YNc(5,h,3,0,"ng-template",4,5,t.W1O),t.qZA()),2&e){const r=t.MAs(6);t.xp6(4),t.Q6J("ngIf",!o.isLoading())("ngIfElse",r)}},dependencies:[l.sg,l.O5,g.rH],styles:[".tags[_ngcontent-%COMP%], .owners[_ngcontent-%COMP%]{height:76vh}@media (max-width: 630px){.tags[_ngcontent-%COMP%], .owners[_ngcontent-%COMP%]{flex-wrap:nowrap;overflow:auto}}"]}),i})()}];let C=(()=>{var n;class i{}return(n=i).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.Bz.forChild(Z),g.Bz]}),i})(),b=(()=>{var n;class i{}return(n=i).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,C]}),i})()}}]);