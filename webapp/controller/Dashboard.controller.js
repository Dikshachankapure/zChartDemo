sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	'poc/ZChartDemo/model/InitPage'
], function (Controller, JSONModel, ChartFormatter, Format, InitPageUtil) {
	"use strict";

	return Controller.extend("poc.ZChartDemo.controller.Dashboard", {

		onInit: function () {
			var that = this;
			that.loadChart();
		},

		loadChart: function () {
			var oModel = this.getView().getModel();
			this.getView().setModel(oModel);

			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: 'Product Revenue'
				}
			});
			
			
			
				
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
			InitPageUtil.initPageSettings(this.getView());
			
			
			var idVizFrame = this.getView().byId("idVizFrame");
			idVizFrame.setVizType("line");
		},

		onChartTypeChanged: function (oEvent) {
			if (this.oVizFrame) {
				var chartType = this.getView().byId("chartTypeSelect");
				var idVizFrame = this.getView().byId("idVizFrame");
				idVizFrame.setVizType(chartType.getSelectedKey());
			}
		}
	});
});