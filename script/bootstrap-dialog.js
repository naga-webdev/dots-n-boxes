!function(a,b){"use strict";"undefined"!=typeof module&&module.exports?module.exports=b(require("jquery"),require("bootstrap")):"function"==typeof define&&define.amd?define("bootstrap-dialog",["jquery","bootstrap"],function(a){return b(a)}):a.BootstrapDialog=b(a.jQuery)}(this,function(a){"use strict";var b=a.fn.modal.Constructor,c=function(a,c){b.call(this,a,c)};c.getModalVersion=function(){var b=null;return b="undefined"==typeof a.fn.modal.Constructor.VERSION?"v3.1":/3\.2\.\d+/.test(a.fn.modal.Constructor.VERSION)?"v3.2":/3\.3\.[1,2]/.test(a.fn.modal.Constructor.VERSION)?"v3.3":"v3.3.4"},c.ORIGINAL_BODY_PADDING=parseInt(a("body").css("padding-right")||0,10),c.METHODS_TO_OVERRIDE={},c.METHODS_TO_OVERRIDE["v3.1"]={},c.METHODS_TO_OVERRIDE["v3.2"]={hide:function(b){if(b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()){this.isShown=!1;var c=this.getGlobalOpenedDialogs();0===c.length&&this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}}},c.METHODS_TO_OVERRIDE["v3.3"]={setScrollbar:function(){var a=c.ORIGINAL_BODY_PADDING;this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},resetScrollbar:function(){var a=this.getGlobalOpenedDialogs();0===a.length&&this.$body.css("padding-right",c.ORIGINAL_BODY_PADDING)},hideModal:function(){this.$element.hide(),this.backdrop(a.proxy(function(){var a=this.getGlobalOpenedDialogs();0===a.length&&this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$element.trigger("hidden.bs.modal")},this))}},c.METHODS_TO_OVERRIDE["v3.3.4"]=a.extend({},c.METHODS_TO_OVERRIDE["v3.3"]),c.prototype={constructor:c,getGlobalOpenedDialogs:function(){var b=[];return a.each(d.dialogs,function(a,c){c.isRealized()&&c.isOpened()&&b.push(c)}),b}},c.prototype=a.extend(c.prototype,b.prototype,c.METHODS_TO_OVERRIDE[c.getModalVersion()]);var d=function(b){this.defaultOptions=a.extend(!0,{id:d.newGuid(),buttons:[],data:{},onshow:null,onshown:null,onhide:null,onhidden:null},d.defaultOptions),this.indexedButtons={},this.registeredButtonHotkeys={},this.draggableData={isMouseDown:!1,mouseOffset:{}},this.realized=!1,this.opened=!1,this.initOptions(b),this.holdThisInstance()};return d.BootstrapDialogModal=c,d.NAMESPACE="bootstrap-dialog",d.TYPE_DEFAULT="type-default",d.TYPE_INFO="type-info",d.TYPE_PRIMARY="type-primary",d.TYPE_SUCCESS="type-success",d.TYPE_WARNING="type-warning",d.TYPE_DANGER="type-danger",d.DEFAULT_TEXTS={},d.DEFAULT_TEXTS[d.TYPE_DEFAULT]="Information",d.DEFAULT_TEXTS[d.TYPE_INFO]="Information",d.DEFAULT_TEXTS[d.TYPE_PRIMARY]="Information",d.DEFAULT_TEXTS[d.TYPE_SUCCESS]="Success",d.DEFAULT_TEXTS[d.TYPE_WARNING]="Warning",d.DEFAULT_TEXTS[d.TYPE_DANGER]="Danger",d.DEFAULT_TEXTS.OK="OK",d.DEFAULT_TEXTS.CANCEL="Cancel",d.DEFAULT_TEXTS.CONFIRM="Confirmation",d.SIZE_NORMAL="size-normal",d.SIZE_SMALL="size-small",d.SIZE_WIDE="size-wide",d.SIZE_LARGE="size-large",d.BUTTON_SIZES={},d.BUTTON_SIZES[d.SIZE_NORMAL]="",d.BUTTON_SIZES[d.SIZE_SMALL]="",d.BUTTON_SIZES[d.SIZE_WIDE]="",d.BUTTON_SIZES[d.SIZE_LARGE]="btn-lg",d.ICON_SPINNER="glyphicon glyphicon-asterisk",d.defaultOptions={type:d.TYPE_PRIMARY,size:d.SIZE_NORMAL,cssClass:"",title:null,message:null,nl2br:!0,closable:!0,closeByBackdrop:!0,closeByKeyboard:!0,spinicon:d.ICON_SPINNER,autodestroy:!0,draggable:!1,animate:!0,description:"",tabindex:-1},d.configDefaultOptions=function(b){d.defaultOptions=a.extend(!0,d.defaultOptions,b)},d.dialogs={},d.openAll=function(){a.each(d.dialogs,function(a,b){b.open()})},d.closeAll=function(){a.each(d.dialogs,function(a,b){b.close()})},d.getDialog=function(a){var b=null;return"undefined"!=typeof d.dialogs[a]&&(b=d.dialogs[a]),b},d.setDialog=function(a){return d.dialogs[a.getId()]=a,a},d.addDialog=function(a){return d.setDialog(a)},d.moveFocus=function(){var b=null;a.each(d.dialogs,function(a,c){b=c}),null!==b&&b.isRealized()&&b.getModal().focus()},d.METHODS_TO_OVERRIDE={},d.METHODS_TO_OVERRIDE["v3.1"]={handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(a){a.target===this&&a.data.dialog.isClosable()&&a.data.dialog.canCloseByBackdrop()&&a.data.dialog.close()}),this},updateZIndex:function(){var b=1040,c=1050,e=0;a.each(d.dialogs,function(a,b){e++});var f=this.getModal(),g=f.data("bs.modal").$backdrop;return f.css("z-index",c+20*(e-1)),g.css("z-index",b+20*(e-1)),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this.updateZIndex(),this}},d.METHODS_TO_OVERRIDE["v3.2"]={handleModalBackdropEvent:d.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,updateZIndex:d.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,open:d.METHODS_TO_OVERRIDE["v3.1"].open},d.METHODS_TO_OVERRIDE["v3.3"]={},d.METHODS_TO_OVERRIDE["v3.3.4"]=a.extend({},d.METHODS_TO_OVERRIDE["v3.1"]),d.prototype={constructor:d,initOptions:function(b){return this.options=a.extend(!0,this.defaultOptions,b),this},holdThisInstance:function(){return d.addDialog(this),this},initModalStuff:function(){return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()),this.getModal().append(this.getModalDialog()),this.getModalDialog().append(this.getModalContent()),this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()),this},createModal:function(){var b=a('<div class="modal" role="dialog" aria-hidden="true"></div>');return b.prop("id",this.getId()),b.attr("aria-labelledby",this.getId()+"_title"),b},getModal:function(){return this.$modal},setModal:function(a){return this.$modal=a,this},createModalDialog:function(){return a('<div class="modal-dialog"></div>')},getModalDialog:function(){return this.$modalDialog},setModalDialog:function(a){return this.$modalDialog=a,this},createModalContent:function(){return a('<div class="modal-content"></div>')},getModalContent:function(){return this.$modalContent},setModalContent:function(a){return this.$modalContent=a,this},createModalHeader:function(){return a('<div class="modal-header"></div>')},getModalHeader:function(){return this.$modalHeader},setModalHeader:function(a){return this.$modalHeader=a,this},createModalBody:function(){return a('<div class="modal-body"></div>')},getModalBody:function(){return this.$modalBody},setModalBody:function(a){return this.$modalBody=a,this},createModalFooter:function(){return a('<div class="modal-footer"></div>')},getModalFooter:function(){return this.$modalFooter},setModalFooter:function(a){return this.$modalFooter=a,this},createDynamicContent:function(a){var b=null;return b="function"==typeof a?a.call(a,this):a,"string"==typeof b&&(b=this.formatStringContent(b)),b},formatStringContent:function(a){return this.options.nl2br?a.replace(/\r\n/g,"<br />").replace(/[\r\n]/g,"<br />"):a},setData:function(a,b){return this.options.data[a]=b,this},getData:function(a){return this.options.data[a]},setId:function(a){return this.options.id=a,this},getId:function(){return this.options.id},getType:function(){return this.options.type},setType:function(a){return this.options.type=a,this.updateType(),this},updateType:function(){if(this.isRealized()){var a=[d.TYPE_DEFAULT,d.TYPE_INFO,d.TYPE_PRIMARY,d.TYPE_SUCCESS,d.TYPE_WARNING,d.TYPE_DANGER];this.getModal().removeClass(a.join(" ")).addClass(this.getType())}return this},getSize:function(){return this.options.size},setSize:function(a){return this.options.size=a,this.updateSize(),this},updateSize:function(){if(this.isRealized()){var b=this;this.getModal().removeClass(d.SIZE_NORMAL).removeClass(d.SIZE_SMALL).removeClass(d.SIZE_WIDE).removeClass(d.SIZE_LARGE),this.getModal().addClass(this.getSize()),this.getModalDialog().removeClass("modal-sm"),this.getSize()===d.SIZE_SMALL&&this.getModalDialog().addClass("modal-sm"),this.getModalDialog().removeClass("modal-lg"),this.getSize()===d.SIZE_WIDE&&this.getModalDialog().addClass("modal-lg"),a.each(this.options.buttons,function(c,d){var e=b.getButton(d.id),f=["btn-lg","btn-sm","btn-xs"],g=!1;if("string"==typeof d.cssClass){var h=d.cssClass.split(" ");a.each(h,function(b,c){a.inArray(c,f)!==-1&&(g=!0)})}g||(e.removeClass(f.join(" ")),e.addClass(b.getButtonSize()))})}return this},getCssClass:function(){return this.options.cssClass},setCssClass:function(a){return this.options.cssClass=a,this},getTitle:function(){return this.options.title},setTitle:function(a){return this.options.title=a,this.updateTitle(),this},updateTitle:function(){if(this.isRealized()){var a=null!==this.getTitle()?this.createDynamicContent(this.getTitle()):this.getDefaultText();this.getModalHeader().find("."+this.getNamespace("title")).html("").append(a).prop("id",this.getId()+"_title")}return this},getMessage:function(){return this.options.message},setMessage:function(a){return this.options.message=a,this.updateMessage(),this},updateMessage:function(){if(this.isRealized()){var a=this.createDynamicContent(this.getMessage());this.getModalBody().find("."+this.getNamespace("message")).html("").append(a)}return this},isClosable:function(){return this.options.closable},setClosable:function(a){return this.options.closable=a,this.updateClosable(),this},setCloseByBackdrop:function(a){return this.options.closeByBackdrop=a,this},canCloseByBackdrop:function(){return this.options.closeByBackdrop},setCloseByKeyboard:function(a){return this.options.closeByKeyboard=a,this},canCloseByKeyboard:function(){return this.options.closeByKeyboard},isAnimate:function(){return this.options.animate},setAnimate:function(a){return this.options.animate=a,this},updateAnimate:function(){return this.isRealized()&&this.getModal().toggleClass("fade",this.isAnimate()),this},getSpinicon:function(){return this.options.spinicon},setSpinicon:function(a){return this.options.spinicon=a,this},addButton:function(a){return this.options.buttons.push(a),this},addButtons:function(b){var c=this;return a.each(b,function(a,b){c.addButton(b)}),this},getButtons:function(){return this.options.buttons},setButtons:function(a){return this.options.buttons=a,this.updateButtons(),this},getButton:function(a){return"undefined"!=typeof this.indexedButtons[a]?this.indexedButtons[a]:null},getButtonSize:function(){return"undefined"!=typeof d.BUTTON_SIZES[this.getSize()]?d.BUTTON_SIZES[this.getSize()]:""},updateButtons:function(){return this.isRealized()&&(0===this.getButtons().length?this.getModalFooter().hide():this.getModalFooter().show().find("."+this.getNamespace("footer")).html("").append(this.createFooterButtons())),this},isAutodestroy:function(){return this.options.autodestroy},setAutodestroy:function(a){this.options.autodestroy=a},getDescription:function(){return this.options.description},setDescription:function(a){return this.options.description=a,this},setTabindex:function(a){return this.options.tabindex=a,this},getTabindex:function(){return this.options.tabindex},updateTabindex:function(){return this.isRealized()&&this.getModal().attr("tabindex",this.getTabindex()),this},getDefaultText:function(){return d.DEFAULT_TEXTS[this.getType()]},getNamespace:function(a){return d.NAMESPACE+"-"+a},createHeaderContent:function(){var b=a("<div></div>");return b.addClass(this.getNamespace("header")),b.append(this.createTitleContent()),b.prepend(this.createCloseButton()),b},createTitleContent:function(){var b=a("<div></div>");return b.addClass(this.getNamespace("title")),b},createCloseButton:function(){var b=a("<div></div>");b.addClass(this.getNamespace("close-button"));var c=a('<button class="close">&times;</button>');return b.append(c),b.on("click",{dialog:this},function(a){a.data.dialog.close()}),b},createBodyContent:function(){var b=a("<div></div>");return b.addClass(this.getNamespace("body")),b.append(this.createMessageContent()),b},createMessageContent:function(){var b=a("<div></div>");return b.addClass(this.getNamespace("message")),b},createFooterContent:function(){var b=a("<div></div>");return b.addClass(this.getNamespace("footer")),b},createFooterButtons:function(){var b=this,c=a("<div></div>");return c.addClass(this.getNamespace("footer-buttons")),this.indexedButtons={},a.each(this.options.buttons,function(a,e){e.id||(e.id=d.newGuid());var f=b.createButton(e);b.indexedButtons[e.id]=f,c.append(f)}),c},createButton:function(b){var c=a('<button class="btn"></button>');return c.prop("id",b.id),c.data("button",b),"undefined"!=typeof b.icon&&""!==a.trim(b.icon)&&c.append(this.createButtonIcon(b.icon)),"undefined"!=typeof b.label&&c.append(b.label),"undefined"!=typeof b.cssClass&&""!==a.trim(b.cssClass)?c.addClass(b.cssClass):c.addClass("btn-default"),"undefined"!=typeof b.hotkey&&(this.registeredButtonHotkeys[b.hotkey]=c),c.on("click",{dialog:this,$button:c,button:b},function(a){var b=a.data.dialog,c=a.data.$button,d=c.data("button");"function"==typeof d.action&&d.action.call(c,b,a),d.autospin&&c.toggleSpin(!0)}),this.enhanceButton(c),c},enhanceButton:function(a){return a.dialog=this,a.toggleEnable=function(a){var b=this;return"undefined"!=typeof a?b.prop("disabled",!a).toggleClass("disabled",!a):b.prop("disabled",!b.prop("disabled")),b},a.enable=function(){var a=this;return a.toggleEnable(!0),a},a.disable=function(){var a=this;return a.toggleEnable(!1),a},a.toggleSpin=function(b){var c=this,d=c.dialog,e=c.find("."+d.getNamespace("button-icon"));return"undefined"==typeof b&&(b=!(a.find(".icon-spin").length>0)),b?(e.hide(),a.prepend(d.createButtonIcon(d.getSpinicon()).addClass("icon-spin"))):(e.show(),a.find(".icon-spin").remove()),c},a.spin=function(){var a=this;return a.toggleSpin(!0),a},a.stopSpin=function(){var a=this;return a.toggleSpin(!1),a},this},createButtonIcon:function(b){var c=a("<span></span>");return c.addClass(this.getNamespace("button-icon")).addClass(b),c},enableButtons:function(b){return a.each(this.indexedButtons,function(a,c){c.toggleEnable(b)}),this},updateClosable:function(){return this.isRealized()&&this.getModalHeader().find("."+this.getNamespace("close-button")).toggle(this.isClosable()),this},onShow:function(a){return this.options.onshow=a,this},onShown:function(a){return this.options.onshown=a,this},onHide:function(a){return this.options.onhide=a,this},onHidden:function(a){return this.options.onhidden=a,this},isRealized:function(){return this.realized},setRealized:function(a){return this.realized=a,this},isOpened:function(){return this.opened},setOpened:function(a){return this.opened=a,this},handleModalEvents:function(){return this.getModal().on("show.bs.modal",{dialog:this},function(a){var b=a.data.dialog;if(b.setOpened(!0),b.isModalEvent(a)&&"function"==typeof b.options.onshow){var c=b.options.onshow(b);return c===!1&&b.setOpened(!1),c}}),this.getModal().on("shown.bs.modal",{dialog:this},function(a){var b=a.data.dialog;b.isModalEvent(a)&&"function"==typeof b.options.onshown&&b.options.onshown(b)}),this.getModal().on("hide.bs.modal",{dialog:this},function(a){var b=a.data.dialog;if(b.setOpened(!1),b.isModalEvent(a)&&"function"==typeof b.options.onhide){var c=b.options.onhide(b);return c===!1&&b.setOpened(!0),c}}),this.getModal().on("hidden.bs.modal",{dialog:this},function(b){var c=b.data.dialog;c.isModalEvent(b)&&"function"==typeof c.options.onhidden&&c.options.onhidden(c),c.isAutodestroy()&&(delete d.dialogs[c.getId()],a(this).remove()),d.moveFocus()}),this.handleModalBackdropEvent(),this.getModal().on("keyup",{dialog:this},function(a){27===a.which&&a.data.dialog.isClosable()&&a.data.dialog.canCloseByKeyboard()&&a.data.dialog.close()}),this.getModal().on("keyup",{dialog:this},function(b){var c=b.data.dialog;if("undefined"!=typeof c.registeredButtonHotkeys[b.which]){var d=a(c.registeredButtonHotkeys[b.which]);!d.prop("disabled")&&d.focus().trigger("click")}}),this},handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(b){a(b.target).hasClass("modal-backdrop")&&b.data.dialog.isClosable()&&b.data.dialog.canCloseByBackdrop()&&b.data.dialog.close()}),this},isModalEvent:function(a){return"undefined"!=typeof a.namespace&&"bs.modal"===a.namespace},makeModalDraggable:function(){return this.options.draggable&&(this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown",{dialog:this},function(a){var b=a.data.dialog;b.draggableData.isMouseDown=!0;var c=b.getModalDialog().offset();b.draggableData.mouseOffset={top:a.clientY-c.top,left:a.clientX-c.left}}),this.getModal().on("mouseup mouseleave",{dialog:this},function(a){a.data.dialog.draggableData.isMouseDown=!1}),a("body").on("mousemove",{dialog:this},function(a){var b=a.data.dialog;b.draggableData.isMouseDown&&b.getModalDialog().offset({top:a.clientY-b.draggableData.mouseOffset.top,left:a.clientX-b.draggableData.mouseOffset.left})})),this},realize:function(){return this.initModalStuff(),this.getModal().addClass(d.NAMESPACE).addClass(this.getCssClass()),this.updateSize(),this.getDescription()&&this.getModal().attr("aria-describedby",this.getDescription()),this.getModalFooter().append(this.createFooterContent()),this.getModalHeader().append(this.createHeaderContent()),this.getModalBody().append(this.createBodyContent()),this.getModal().data("bs.modal",new c(this.getModal(),{backdrop:"static",keyboard:!1,show:!1})),this.makeModalDraggable(),this.handleModalEvents(),this.setRealized(!0),this.updateButtons(),this.updateType(),this.updateTitle(),this.updateMessage(),this.updateClosable(),this.updateAnimate(),this.updateSize(),this.updateTabindex(),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this},close:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("hide"),this}},d.prototype=a.extend(d.prototype,d.METHODS_TO_OVERRIDE[c.getModalVersion()]),d.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})},d.show=function(a){return new d(a).open()},d.alert=function(){var b={},c={type:d.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,buttonLabel:d.DEFAULT_TEXTS.OK,callback:null};return b="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?a.extend(!0,c,arguments[0]):a.extend(!0,c,{message:arguments[0],callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),new d({type:b.type,title:b.title,message:b.message,closable:b.closable,draggable:b.draggable,data:{callback:b.callback},onhide:function(a){!a.getData("btnClicked")&&a.isClosable()&&"function"==typeof a.getData("callback")&&a.getData("callback")(!1)},buttons:[{label:b.buttonLabel,action:function(a){a.setData("btnClicked",!0),"function"==typeof a.getData("callback")&&a.getData("callback")(!0),a.close()}}]}).open()},d.confirm=function(){var b={},c={type:d.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,btnCancelLabel:d.DEFAULT_TEXTS.CANCEL,btnOKLabel:d.DEFAULT_TEXTS.OK,btnOKClass:null,callback:null};return b="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?a.extend(!0,c,arguments[0]):a.extend(!0,c,{message:arguments[0],closable:!1,buttonLabel:d.DEFAULT_TEXTS.OK,callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),null===b.btnOKClass&&(b.btnOKClass=["btn",b.type.split("-")[1]].join("-")),new d({type:b.type,title:b.title,message:b.message,closable:b.closable,draggable:b.draggable,data:{callback:b.callback},buttons:[{label:b.btnCancelLabel,action:function(a){"function"==typeof a.getData("callback")&&a.getData("callback")(!1),a.close()}},{label:b.btnOKLabel,cssClass:b.btnOKClass,action:function(a){"function"==typeof a.getData("callback")&&a.getData("callback")(!0),a.close()}}]}).open()},d.warning=function(a,b){return new d({type:d.TYPE_WARNING,message:a}).open()},d.danger=function(a,b){return new d({type:d.TYPE_DANGER,message:a}).open()},d.success=function(a,b){return new d({type:d.TYPE_SUCCESS,message:a}).open()},d});
