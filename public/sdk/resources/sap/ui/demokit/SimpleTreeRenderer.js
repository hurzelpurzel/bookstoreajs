/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var S={};S.render=function(r,t){var a=r;_();if(t.getTitle()){b();}if(t.getShowFilter()&&t.getModel()){c();}d();e(t.getNodes());f();g();function _(){a.write("<div");a.writeControlData(t);a.addClass("sapDkSimpleTree sapUiSizeCompact");a.writeClasses();a.addStyle("width",t.getWidth()||"auto");a.addStyle("height",t.getHeight()||"auto");a.writeStyles();a.writeAttribute("role","tree");a.write(">");}function b(){a.write("<div");a.addClass("sapDkSimpleTreeTitle");a.writeClasses();a.writeAttribute("role","heading");a.write(">");a.writeEscaped(t.getTitle());a.write("</div>");}function c(){a.renderControl(t.getAggregation("_searchField"));}function d(){a.write("<ul");a.addClass("sapDkSimpleTreeRootList");a.writeClasses();a.write(">");}function e(n){for(var i=0;i<n.length;i++){S.renderNode(a,n[i],n.length,i);}}function f(){a.write("</ul>");}function g(){a.write("</div>");}};S.renderNode=function(r,t,R,a){var B=15;var N=15;var b=0;_(t,b,R,a);function _(n,g,s,h){c(n,g,s,h);var C=n.getNodes();if(C&&C.length>0){g++;e(n.getExpanded());for(var i=0;i<C.length;i++){_(C[i],g,C.length,i);}g--;f();}d(n);}function c(n,i,s,g){var h=(n.getNodes()&&n.getNodes().length>0);r.write("<li");r.writeElementData(n);r.addClass("sapDkSimpleTreeNode");if(i===0){if(n.getExpanded()){r.addClass("sapDkSimpleTreeNodeFirstLvlRootExp");}else if(h){r.addClass("sapDkSimpleTreeNodeFirstLvlRootCol");}}r.writeClasses();r.write(">");r.write("<div");var I=sap.ui.getCore().getConfiguration().getRTL();r.addStyle(I?"padding-right":"padding-left",((i*N)+B)+"px");r.writeStyles();r.writeAttribute("tabindex","-1");if(i===0){r.addClass("sapDkSimpleTreeNodeFirstLvl");r.writeClasses();}var p={role:'treeitem',level:i+1,setsize:s,posinset:g+1};if(n.getExpanded()){p["expanded"]=true;}else if(h){p["expanded"]=false;}r.writeAccessibilityState(n,p);r.write(">");if(h){r.renderControl(n.getAggregation("_iconControl"));}else{r.write("<span");r.addClass("sapDkSimpleTreeNodeNoChildren");r.writeClasses();r.write(">");r.write("</span>");}r.write("<span");r.addClass("sapDkSimpleTreeNodeLabel");r.writeClasses();r.write(">");r.writeEscaped(n.getText());r.write("</span>");r.write("</div>");}function d(){r.write("</li>");}function e(i){r.write("<ul");if(i){r.addClass("sapDkSimpleTreeVisibleChildrenNodes");}else{r.addClass("sapDkSimpleTreeHiddenChildrenNodes");}r.writeClasses();r.write(">");}function f(){r.write("</ul>");}};return S;},true);
