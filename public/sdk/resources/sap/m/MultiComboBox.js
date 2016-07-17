/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./InputBase','./ComboBoxBase','./Dialog','./List','./MultiComboBoxRenderer','./Popover','./library','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','jquery.sap.xml'],function(q,B,I,C,D,L,M,P,l,E,a){"use strict";var b=C.extend("sap.m.MultiComboBox",{metadata:{library:"sap.m",properties:{selectedKeys:{type:"string[]",group:"Data",defaultValue:[]}},associations:{selectedItems:{type:"sap.ui.core.Item",multiple:true,singularName:"selectedItem"}},events:{selectionChange:{parameters:{changedItem:{type:"sap.ui.core.Item"},selected:{type:"boolean"}}},selectionFinish:{parameters:{selectedItems:{type:"sap.ui.core.Item[]"}}}}}});a.insertFontFaceStyle();E.apply(b.prototype,[true]);b.prototype.onsapend=function(e){sap.m.Tokenizer.prototype.onsapend.apply(this._oTokenizer,arguments);};b.prototype.onsaphome=function(e){sap.m.Tokenizer.prototype.onsaphome.apply(this._oTokenizer,arguments);};b.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var i=this.getSelectableItems();var o=i[0];if(o&&this.isOpen()){this.getListItem(o).focus();return;}if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getNextTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}this._setContainerSizes();};b.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getPreviousTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}this._setContainerSizes();};b.prototype._selectItemByKey=function(e){if(!this.getEnabled()||!this.getEditable()){return;}if(e){e.setMarked();}var v;if(this.isOpen()){v=this._getUnselectedItems();}else{v=this._getItemsStartingText(this.getValue());}if(v.length>1){this._showWrongValueVisualEffect();}if(v.length===1){var i=v[0];var p={item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false};if(this.getValue()===""||q.sap.startsWithIgnoreCase(i.getText(),this.getValue())){if(this.getListItem(i).isSelected()){this.setValue('');}else{this.setSelection(p);}}}if(e){this.close();}};b.prototype.onsapenter=function(e){I.prototype.onsapenter.apply(this,arguments);this._selectItemByKey(e);};b.prototype.onsaptabnext=function(e){var i=this.getValue();if(i){var s=this._getUnselectedItemsStartingText(i);if(s.length===1){this._selectItemByKey(e);}else{this._showWrongValueVisualEffect();this.setValue(null);}}};b.prototype.onsapfocusleave=function(e){var p=this.getAggregation("picker");var c=sap.ui.getCore().byId(e.relatedControlId);var f=c&&c.getFocusDomRef();if(!p||!p.getFocusDomRef()||!f||!q.contains(p.getFocusDomRef(),f)){this.setValue(null);}if(p&&f){if(q.sap.equal(p.getFocusDomRef(),f)){this.focus();}}this._setContainerSizes();};b.prototype.onfocusin=function(e){this.addStyleClass("sapMFocus");if(e.target===this.getOpenArea()){this.focus();}if(!this.isOpen()){this.openValueStateMessage();}};b.prototype.onsapescape=function(e){C.prototype.onsapescape.apply(this,arguments);this._setContainerSizes();};b.prototype._handleItemTap=function(e){if(e.target.childElementCount===0||e.target.childElementCount===2){if(this.isOpen()&&!this._isListInSuggestMode()){this.close();}}};b.prototype._handleItemPress=function(e){if(this.isOpen()&&this._isListInSuggestMode()&&this.getPicker().oPopup.getOpenState()!==sap.ui.core.OpenState.CLOSING){this.clearFilter();var i=this._getLastSelectedItem();if(i){this.getListItem(i).focus();}}};b.prototype._handleSelectionLiveChange=function(e){var o=e.getParameter("listItem");var i=e.getParameter("selected");var n=this._getItemByListItem(o);if(o.getType()==="Inactive"){return;}if(!n){return;}var p={item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true};if(i){this.fireChangeEvent(n.getText());this.setSelection(p);}else{this.fireChangeEvent(n.getText());this.removeSelection(p);this.setValue('');}if(this.isOpen()&&this.getPicker().oPopup.getOpenState()!==sap.ui.core.OpenState.CLOSING){o.focus();}};b.prototype.onkeydown=function(e){C.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}this._bIsPasteEvent=(e.ctrlKey||e.metaKey)&&(e.which===q.sap.KeyCodes.V);if(this.getValue().length===0&&(e.ctrlKey||e.metaKey)&&(e.which===q.sap.KeyCodes.A)&&this._hasTokens()){this._oTokenizer.focus();this._oTokenizer.selectAllTokens(true);e.preventDefault();}};b.prototype.oninput=function(e){C.prototype.oninput.apply(this,arguments);var v=e.target.value;if(!this.getEnabled()||!this.getEditable()){return;}if(this._bIsPasteEvent){this.updateDomValue(this._sOldValue||"");return;}var i=this._getItemsStartingText(v);var V=!!i.length;if(!V&&v!==""){this.updateDomValue(this._sOldValue||"");if(this._iOldCursorPos){q(this.getFocusDomRef()).cursorPos(this._iOldCursorPos);}this._showWrongValueVisualEffect();return;}var c=this.getSelectableItems();if(this._sOldInput&&this._sOldInput.length>v.length){c=this.getItems();}c.forEach(function(o){var m=q.sap.startsWithIgnoreCase(o.getText(),v);if(v===""){m=true;}var d=this.getListItem(o);if(d){d.setVisible(m);}},this);this._setContainerSizes();if(!this.getValue()||!V){this.close();}else{this.open();}this._sOldInput=v;};b.prototype.onkeyup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}this._sOldValue=this.getValue();this._iOldCursorPos=q(this.getFocusDomRef()).cursorPos();};b.prototype._showWrongValueVisualEffect=function(){var o=this.getValueState();if(o===sap.ui.core.ValueState.Error){return;}this.setValueState(sap.ui.core.ValueState.Error);q.sap.delayedCall(1000,this,"setValueState",[o]);};b.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}o=this["_create"+p]();this.setAggregation("picker",o,true);var r=this.getRenderer(),c=r.CSS_CLASS_MULTICOMBOBOX;o.setHorizontalScrolling(false).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"Picker").addStyleClass(c+"Picker").addStyleClass(c+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getList());return o;};b.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);var i=this.getItems();var o=this.getList();if(o){this._synchronizeSelectedItemAndKey(i);o.destroyItems();this._clearTokenizer();this._fillList(i);if(o.getItemNavigation()){this._iFocusedIndex=o.getItemNavigation().getFocusedIndex();}this.setEditable(this.getEditable());}};b.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];if(o){o.call(this);}};b.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];if(o){o.call(this);}};b.prototype.onBeforeOpen=function(){var p=this["_onBeforeOpen"+this.getPickerType()];this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");this._resetCurrentItem();this.addContent();if(p){p.call(this);}};b.prototype.onAfterOpen=function(){this.closeValueStateMessage();};b.prototype.onBeforeClose=function(){};b.prototype.onAfterClose=function(){this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");this.clearFilter();this.fireSelectionFinish({selectedItems:this.getSelectedItems()});};b.prototype._onBeforeOpenDialog=function(){};b.prototype._onBeforeOpenPopover=function(){var p=this.getPicker(),d=this.getDomRef(),w;if(d&&p){w=(d.offsetWidth/parseFloat(sap.m.BaseFontSize))+"rem";p.setContentMinWidth(w);}};b.prototype._createDialog=function(){var c=this.getRenderer().CSS_CLASS_COMBOBOXBASE;var d=new D({stretch:true,customHeader:new B({contentLeft:new sap.m.InputBase({width:"100%",editable:false}).addStyleClass(c+"Input")}).addStyleClass(c+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close();},this);return d;};b.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};b.prototype._createPopover=function(){var p=new P({showArrow:false,showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p;};b.prototype.createList=function(){var r=this.getRenderer();this._oList=new L({width:"100%",mode:sap.m.ListMode.MultiSelect,includeItemInSelection:true,rememberSelections:false}).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_MULTICOMBOBOX+"List").attachBrowserEvent("tap",this._handleItemTap,this).attachSelectionChange(this._handleSelectionLiveChange,this).attachItemPress(this._handleItemPress,this);this._oList.addEventDelegate({onAfterRendering:this.onAfterRenderingList},this);};b.prototype.setSelection=function(o){if(o.item&&this.isItemSelected(o.item)){return;}if(!o.item){return;}this.addAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),true);}var t=new sap.m.Token({key:o.key,text:o.item.getText(),tooltip:o.item.getText()});o.item.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",t);this._oTokenizer.addToken(t);this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());this.setValue('');if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:true});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};b.prototype.removeSelection=function(o){if(o.item&&!this.isItemSelected(o.item)){return;}if(!o.item){return;}this.removeAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),false);}if(!o.tokenUpdated){var t=this._getTokenByItem(o.item);o.item.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",null);this._oTokenizer.removeToken(t);}this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:false});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};b.prototype._synchronizeSelectedItemAndKey=function(c){if(!c.length){q.sap.log.info("Info: _synchronizeSelectedItemAndKey() the MultiComboBox control does not contain any item on ",this);return;}var s=this.getSelectedKeys()||this._aCustomerKeys;var k=this.getKeys(this.getSelectedItems());if(s.length){for(var i=0,K=null,o=null,d=null,e=s.length;i<e;i++){K=s[i];if(k.indexOf(K)>-1){if(this._aCustomerKeys.length&&(d=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(d,1);}continue;}o=this.getItemByKey(""+K);if(o){if(this._aCustomerKeys.length&&(d=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(d,1);}this.setSelection({item:o,id:o.getId(),key:o.getKey(),fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:false});}}return;}};b.prototype._setContainerSizes=function(){var m=this.$();if(!m.length){return;}var c=this.getRenderer().DOT_CSS_CLASS_MULTICOMBOBOX;var i=m.find(c+"InputContainer");var s=m.children(c+"ShadowDiv");s.text(this.getValue());var d=q(this.getOpenArea()).outerWidth(true);var t=(this._oTokenizer.getScrollWidth()/parseFloat(sap.m.BaseFontSize))+"rem";var e=((s.outerWidth()+d)/parseFloat(sap.m.BaseFontSize))+"rem";this._oTokenizer.$().css("width","calc(100% - "+e+")");i.css("width","calc(100% - "+t+")");i.css("min-width",e);};b.prototype._getTokenByItem=function(i){return i?i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token"):null;};b.prototype._getSelectedItemsOf=function(c){for(var i=0,d=c.length,s=[];i<d;i++){if(this.getListItem(c[i]).isSelected()){s.push(c[i]);}}return s;};b.prototype._getLastSelectedItem=function(){var t=this._oTokenizer.getTokens();var T=t.length?t[t.length-1]:null;if(!T){return null;}return this._getItemByToken(T);};b.prototype._getOrderedSelectedItems=function(){var c=[];for(var i=0,t=this._oTokenizer.getTokens(),d=t.length;i<d;i++){c[i]=this._getItemByToken(t[i]);}return c;};b.prototype._getFocusedListItem=function(){if(!document.activeElement){return null;}var f=sap.ui.getCore().byId(document.activeElement.id);if(this.getList()&&q.sap.containsOrEquals(this.getList().getFocusDomRef(),f.getFocusDomRef())){return f;}return null;};b.prototype._getFocusedItem=function(){var o=this._getFocusedListItem();return this._getItemByListItem(o);};b.prototype._isRangeSelectionSet=function(o){var $=o.getDomRef();return $.indexOf(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"ItemRangeSelection")>-1?true:false;};b.prototype._hasTokens=function(){return this._oTokenizer.getTokens().length>0;};b.prototype._getCurrentItem=function(){if(!this._oCurrentItem){return this._getFocusedItem();}return this._oCurrentItem;};b.prototype._setCurrentItem=function(i){this._oCurrentItem=i;};b.prototype._resetCurrentItem=function(){this._oCurrentItem=null;};b.prototype._decorateListItem=function(o){o.addDelegate({onkeyup:function(e){var i=null;if(e.which==q.sap.KeyCodes.SPACE&&this.isOpen()&&this._isListInSuggestMode()){this.clearFilter();this.open();i=this._getLastSelectedItem();if(i){this.getListItem(i).focus();}return;}},onkeydown:function(e){var i=null,c=null;if(e.shiftKey&&e.which==q.sap.KeyCodes.ARROW_DOWN){c=this._getCurrentItem();i=this._getNextVisibleItemOf(c);}if(e.shiftKey&&e.which==q.sap.KeyCodes.ARROW_UP){c=this._getCurrentItem();i=this._getPreviousVisibleItemOf(c);}if(e.shiftKey&&e.which===q.sap.KeyCodes.SPACE){c=this._getCurrentItem();this._selectPreviousItemsOf(c);}if(i&&i!==c){if(this.getListItem(c).isSelected()){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(i);}else{this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(i);}return;}this._resetCurrentItem();if((e.ctrlKey||e.metaKey)&&e.which==q.sap.KeyCodes.A){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var s=this._getSelectedItemsOf(v);if(s.length!==v.length){v.forEach(function(i){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}else{v.forEach(function(i){this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}}}},true,this);o.addEventDelegate({onsapbackspace:function(e){e.preventDefault();},onsapshow:function(e){e.setMarked();if(e.keyCode===q.sap.KeyCodes.F4){e.preventDefault();}if(this.isOpen()){this.close();return;}if(this.hasContent()){this.open();}},onsaphide:function(e){this.onsapshow(e);},onsapenter:function(e){e.setMarked();this.close();},onsaphome:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[0];this.getListItem(i).focus();},onsapend:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[v.length-1];this.getListItem(i).focus();},onsapup:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[0];var c=q(document.activeElement).control()[0];if(c===this.getListItem(i)){this.focus();e.stopPropagation(true);}},onfocusin:function(e){this.addStyleClass(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Focused");},onfocusout:function(e){this.removeStyleClass(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Focused");},onsapfocusleave:function(e){var p=this.getAggregation("picker");var c=sap.ui.getCore().byId(e.relatedControlId);if(p&&c&&q.sap.equal(p.getFocusDomRef(),c.getFocusDomRef())){if(e.srcControl){e.srcControl.focus();}}}},this);if(sap.ui.Device.support.touch){o.addEventDelegate({ontouchstart:function(e){e.setMark("cancelAutoClose");}});}};b.prototype._createTokenizer=function(){var t=new sap.m.Tokenizer({tokens:[]}).attachTokenChange(this._handleTokenChange,this);t.setParent(this);t.addEventDelegate({onAfterRendering:this._onAfterRenderingTokenizer},this);this.getRenderer().placeholderToBeShown=function(r,c){return(!c._oTokenizer.getTokens().length)&&(c.getPlaceholder()?true:false);};return t;};b.prototype._handleTokenChange=function(e){var t=e.getParameter("type");var T=e.getParameter("token");var i=null;if(t!==sap.m.Tokenizer.TokenChangeType.Removed&&t!==sap.m.Tokenizer.TokenChangeType.Added){return;}if(t===sap.m.Tokenizer.TokenChangeType.Removed){i=(T&&this._getItemByToken(T));if(i&&this.isItemSelected(i)){this.removeSelection({item:i,id:i.getId(),key:i.getKey(),tokenUpdated:true,fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true});this.focus();this.fireChangeEvent("");}}};b.prototype._onAfterRenderingTokenizer=function(){this._setContainerSizes();};b.prototype.onAfterRenderingList=function(){var o=this.getList();if(this._iFocusedIndex!=null&&o.getItems().length>this._iFocusedIndex){o.getItems()[this._iFocusedIndex].focus();this._iFocusedIndex=null;}else{var f=this.getFocusDomRef();if(f){f.focus();}}};b.prototype.onAfterRendering=function(){C.prototype.onAfterRendering.apply(this,arguments);var p=this.getPicker();var d=q(this.getDomRef());var o=d.find(this.getRenderer().DOT_CSS_CLASS_MULTICOMBOBOX+"Border");p._oOpenBy=o[0];};b.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");C.prototype.onfocusout.apply(this,arguments);};b.prototype.onpaste=function(e){var o;if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var s=this._oTokenizer._parseString(o);if(s&&s.length>0){this.getSelectableItems().forEach(function(i){if(q.inArray(i.getText(),s)>-1){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false});}},this);}};b.prototype.onsapbackspace=function(e){if(!this.getEnabled()||!this.getEditable()){e.preventDefault();return;}if(this.getCursorPosition()>0||this.getValue().length>0){return;}sap.m.Tokenizer.prototype.onsapbackspace.apply(this._oTokenizer,arguments);e.preventDefault();};b.prototype.onsapdelete=function(e){if(!this.getEnabled()||!this.getEditable()){return;}if(this.getValue()&&!this._isCompleteTextSelected()){return;}sap.m.Tokenizer.prototype.onsapdelete.apply(this._oTokenizer,arguments);};b.prototype.onsapnext=function(e){if(e.isMarked()){return;}var f=q(document.activeElement).control()[0];if(!f){return;}if(f===this._oTokenizer||this._oTokenizer.$().find(f.$()).length>0&&this.getEditable()){this.focus();}};b.prototype.onsapprevious=function(e){if(this.getCursorPosition()===0&&!this._isCompleteTextSelected()){if(e.srcControl===this){sap.m.Tokenizer.prototype.onsapprevious.apply(this._oTokenizer,arguments);}}};b.prototype._getItemsStartingText=function(t){var i=[];this.getSelectableItems().forEach(function(o){if(q.sap.startsWithIgnoreCase(o.getText(),t)){i.push(o);}},this);return i;};b.prototype._getUnselectedItemsStartingText=function(t){var i=[];this._getUnselectedItems().forEach(function(o){if(q.sap.startsWithIgnoreCase(o.getText(),t)){i.push(o);}},this);return i;};b.prototype.getCursorPosition=function(){return this._$input.cursorPos();};b.prototype._isCompleteTextSelected=function(){if(!this.getValue().length){return false;}var i=this._$input[0];if(i.selectionStart!==0||i.selectionEnd!==this.getValue().length){return false;}return true;};b.prototype._selectPreviousItemsOf=function(i){var c;do{c=true;var p=this._getPreviousVisibleItemOf(i);if(p){var o=this.getListItem(p);if(o){c=this.getListItem(p).getSelected();}}this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});i=p;}while(!c);};b.prototype._getNextVisibleItemOf=function(i){var c=this.getSelectableItems();var d=c.indexOf(i)+1;if(d<=0||d>c.length-1){return null;}return c[d];};b.prototype._getPreviousVisibleItemOf=function(i){var c=this.getSelectableItems();var d=c.indexOf(i)-1;if(d<0){return null;}return c[d];};b.prototype._getNextUnselectedItemOf=function(i){var c=this._getUnselectedItems();var d=c.indexOf(i)+1;if(d<=0||d>c.length-1){return null;}return c[d];};b.prototype._getPreviousUnselectedItemOf=function(i){var c=this._getUnselectedItems();var d=c.indexOf(i)-1;if(d<0){return null;}return c[d];};b.prototype._getNextTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());var s=this._getUnselectedItems();if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getNextUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[0].getText()===this.getValue()){return this._getNextUnselectedItemOf(i[0]);}return i.length?i[0]:s[0];};b.prototype._getPreviousTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getPreviousUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[i.length-1].getText()===this.getValue()){return this._getPreviousUnselectedItemOf(i[i.length-1]);}if(i.length){return i[i.length-1];}else{var s=this._getUnselectedItems();if(s.length>0){return s[s.length-1];}else{return null;}}};b.prototype.findFirstEnabledItem=function(c){c=c||this.getItems();for(var i=0;i<c.length;i++){if(c[i].getEnabled()){return c[i];}}return null;};b.prototype.getVisibleItems=function(){for(var i=0,o,c=this.getItems(),v=[];i<c.length;i++){o=this.getListItem(c[i]);if(o&&o.getVisible()){v.push(c[i]);}}return v;};b.prototype.findLastEnabledItem=function(i){i=i||this.getItems();return this.findFirstEnabledItem(i.reverse());};b.prototype.setSelectedItems=function(i){this.removeAllSelectedItems();if(!i||!i.length){return this;}if(!q.isArray(i)){q.sap.log.warning("Warning: setSelectedItems() has to be an array of sap.ui.core.Item instances or of valid sap.ui.core.Item IDs",this);return this;}i.forEach(function(o){if(!(o instanceof sap.ui.core.Item)&&(typeof o!=="string")){q.sap.log.warning("Warning: setSelectedItems() has to be an array of sap.ui.core.Item instances or of valid sap.ui.core.Item IDs",this);return;}if(typeof o==="string"){o=sap.ui.getCore().byId(o);}this.setSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",suppressInvalidate:true});},this);return this;};b.prototype.addSelectedItem=function(i){if(!i){return this;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}this.setSelection({item:i?i:null,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true});return this;};b.prototype.removeSelectedItem=function(i){if(!i){return null;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(!this.isItemSelected(i)){return null;}this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:false,suppressInvalidate:true});return i;};b.prototype.removeAllSelectedItems=function(){var i=[];var c=this.getAssociation("selectedItems",[]);c.forEach(function(o){var d=this.removeSelectedItem(o);if(d){i.push(d.getId());}},this);return i;};b.prototype.removeSelectedKeys=function(k){var i=[],c;if(!k||!k.length||!q.isArray(k)){return i;}var o;k.forEach(function(K){o=this.getItemByKey(K);if(o){this.removeSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",fireChangeEvent:false,suppressInvalidate:true});i.push(o);}if(this._aCustomerKeys.length&&(c=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(c,1);}},this);return i;};b.prototype.setSelectedKeys=function(k){this.removeAllSelectedItems();this._aCustomerKeys=[];this.addSelectedKeys(k);return this;};b.prototype.addSelectedKeys=function(k){k=this.validateProperty("selectedKeys",k);k.forEach(function(K){var i=this.getItemByKey(K);if(i){this.addSelectedItem(i);}else if(K!=null){this._aCustomerKeys.push(K);}},this);return this;};b.prototype.getSelectedKeys=function(){var i=this.getSelectedItems()||[],k=[];i.forEach(function(o){k.push(o.getKey());},this);if(this._aCustomerKeys.length){k=k.concat(this._aCustomerKeys);}return k;};b.prototype._getUnselectedItems=function(){return q(this.getSelectableItems()).not(this.getSelectedItems()).get();};b.prototype.getSelectedItems=function(){var i=[],c=this.getAssociation("selectedItems")||[];c.forEach(function(s){var o=sap.ui.getCore().byId(s);if(o){i.push(o);}},this);return i;};b.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems());};b.prototype.getWidth=function(){return this.getProperty("width")||"100%";};b.prototype.setEditable=function(e){C.prototype.setEditable.apply(this,arguments);this._oTokenizer.setEditable(e);return this;};b.prototype.clearFilter=function(){this.getItems().forEach(function(i){this.getListItem(i).setVisible(i.getEnabled()&&this.getSelectable(i));},this);};b.prototype._isListInSuggestMode=function(){return this.getList().getItems().some(function(o){return!o.getVisible()&&this._getItemByListItem(o).getEnabled();},this);};b.prototype._mapItemToListItem=function(i){if(!i){return null;}var s=this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Item";var c=(this.isItemSelected(i))?s+"Selected":"";var o=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,visible:i.getEnabled()}).addStyleClass(s+" "+c);o.setTooltip(i.getTooltip());i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem",o);if(c){var t=new sap.m.Token({key:i.getKey(),text:i.getText(),tooltip:i.getText()});i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",t);this._oTokenizer.addToken(t);}this.setSelectable(i,i.getEnabled());this._decorateListItem(o);return o;};b.prototype._findMappedItem=function(o,c){for(var i=0,c=c||this.getItems(),d=c.length;i<d;i++){if(this.getListItem(c[i])===o){return c[i];}}return null;};b.prototype.setSelectable=function(i,s){if(this.indexOfItem(i)<0){return;}i._bSelectable=s;var o=this.getListItem(i);if(o){o.setVisible(s);}var t=this._getTokenByItem(i);if(t){t.setVisible(s);}};b.prototype.getSelectable=function(i){return i._bSelectable;};b.prototype._fillList=function(c){if(!c){return null;}if(!this._oListItemEnterEventDelegate){this._oListItemEnterEventDelegate={onsapenter:function(e){if(e.srcControl.isSelected()){e.setMarked();}}};}for(var i=0,o,d=c.length;i<d;i++){o=this._mapItemToListItem(c[i]);o.removeEventDelegate(this._oListItemEnterEventDelegate);o.addDelegate(this._oListItemEnterEventDelegate,true,this,true);this.getList().addAggregation("items",o,true);if(this.isItemSelected(c[i])){this.getList().setSelectedItem(o,true);}}};b.prototype.init=function(){I.prototype.init.apply(this,arguments);this.createList();this.bItemsUpdated=false;this.setPickerType(sap.ui.Device.system.phone?"Dialog":"Popover");this._oTokenizer=this._createTokenizer();this._aCustomerKeys=[];};b.prototype.clearSelection=function(){this.removeAllSelectedItems();};b.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}if(this.getList()){this.getList().addItem(this._mapItemToListItem(i));}return this;};b.prototype.insertItem=function(i,c){this.insertAggregation("items",i,c,true);if(i){i.attachEvent("_change",this.onItemChange,this);}if(this.getList()){this.getList().insertItem(this._mapItemToListItem(i),c);}return this;};b.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(o){return o.getEnabled();});};b.prototype.getItemByKey=function(k){return this.findItem("key",k);};b.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&this.getListItem(i));}this.removeSelection({item:i,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:true});return i;};b.prototype.isItemSelected=function(i){return this.getSelectedItems().indexOf(i)>-1;};b.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,c=this.getItems();i<c.length;i++){if(c[i][m]()===v){return c[i];}}return null;};b.prototype._clearTokenizer=function(){this._oTokenizer.destroyAggregation("tokens",true);};b.prototype.getList=function(){return this._oList;};b.prototype.exit=function(){C.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null;}if(this._oTokenizer){this._oTokenizer.destroy();this._oTokenizer=null;}};b.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems();}this._oTokenizer.destroyTokens();return this;};b.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.removeAllSelectedItems();if(this.getList()){this.getList().removeAllItems();}return i;};b.prototype._getItemByListItem=function(o){return this._getItemBy(o,"ListItem");};b.prototype._getItemByToken=function(t){return this._getItemBy(t,"Token");};b.prototype._getItemBy=function(d,s){s=this.getRenderer().CSS_CLASS_COMBOBOXBASE+s;for(var i=0,c=this.getItems(),e=c.length;i<e;i++){if(c[i].data(s)===d){return c[i];}}return null;};b.prototype.getListItem=function(i){return i?i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem"):null;};b.prototype.getAccessibilityInfo=function(){var t=this.getSelectedItems().map(function(o){return o.getText();}).join(" ");var i=C.prototype.getAccessibilityInfo.apply(this,arguments);i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_MULTICOMBO");i.description=((i.description||"")+" "+t).trim();return i;};return b;},true);
