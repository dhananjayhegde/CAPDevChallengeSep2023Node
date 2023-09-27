using fullstack_dev_challenge from '../db/data-model';  

service DevChallengeService @(path: '/dev-challenge') {  
    @odata.draft.enabled: true 
    entity Tests as projection on fullstack_dev_challenge.Tests
        actions {
            
            @cds.odata.bindingparameter.name : '_it'
            @Common.SideEffects : {
                TargetProperties : ['_it/questions']
            } 
            action assignQuestionsToTest (questionsCount : Integer @Common.Label : 'Questions Count') returns String
        }
    ;
    entity Questions as projection on fullstack_dev_challenge.Questions; 
} 