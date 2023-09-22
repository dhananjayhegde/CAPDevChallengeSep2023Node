sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPressAddQuestionsToTest: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
