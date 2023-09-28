sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function(MessageToast, Fragment) {
    'use strict';

    return {
        onPressCancelDialog: function(oEvent) {
           this.oParamDialog.close()     
        },
        
        onPressSubmitAction: function(oEvent) {
            let oActionContext = this.byId("idDialog").getObjectBinding() // this.oParamDialog.getObjectBinding()
            
            oActionContext.execute()
            .then(function(oResponse){
                // this.getView().byId("idQuestionsTable").getObjectBinding()
                oActionContext.requestSideEffects()
            })
            .catch(function(oError){
                console.log(">>> Error calling action:", oError)
            })
            .finally(() => {
                this.oParamDialog.close()
            });            
        },
        
        onPressAddQuestionsToTest: function(oEvent, oContext) {
            
            // if(!this.oParamDialog) {
            //     this.loadFragment({
            //         name: 'fullstackdevchallenge.ext.fragments.AssignQuestionsParameterDialog'
            //     }).then(function(oDialog){
            //         this.oParamDialog = oDialog
            //         this.oParamDialog.open()
            //     }.bind(this)).catch((oError) => {
            //         console.log(">>> Error opening the dialog: ", oError)
            //     })
            // } else {
            //     this.oParamDialog.open()
            // }
            
            
            this.editFlow.invokeAction("DevChallengeService.assignQuestionsToTest", {
                contexts: oContext,
                skipParameterDialog: false
            })
            .then((oResponse) => {
                console.log(oResponse)
            })
            .catch((oError) => {
                console.error(oError)
            })

            // let _assignQuestionsToTest = function(oController, oContext) {
            //     return function() {
            //         return new Promise((resolve, reject) => {
            //             oController.editFlow.invokeAction("DevChallengeService.assignQuestionsToTest", {
            //                 contexts: oContext,
            //                 skipParameterDialog: false
            //             })
            //             .then((oResponse) => resolve(oResponse))
            //             .catch((oError) => reject(oError)) 
            //         })
            //     }
            // }
            // var that = this
            // console.log(">>> oContext: ", oContext)
            // this.editFlow.securedExecution(function() {
            //     return new Promise((resolve, reject) => {
            //         that.editFlow.invokeAction("DevChallengeService.assignQuestionsToTest", {
            //             contexts: oContext,
            //             parameterValues: {}
            //         })
            //         .then(resolve)
            //         .catch(reject) 
            //     })
            // }).then((oResponse) => {
            //     console.log(">>> Secured execution finished", oResponse)
            // }).catch((oError) => {
            //     console.log(">>> Error in secured execution", oError)
            // })
        }        
    };
});
