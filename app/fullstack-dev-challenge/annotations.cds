using DevChallengeService as service from '../../srv/cat-service';

annotate service.Tests with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Title',
        Value: title,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Description',
        Value: description,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Created By',
        Value: createdBy,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Created At',
        Value: createdAt,
    },
]);

annotate service.Tests with @(
    UI.HeaderInfo: {
        TypeName: 'Test',
        TypeNamePlural: 'Tests',
        Title : { 
            $Type : 'UI.DataField',
            Value : title,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description,
        }
    },
    
    UI.FieldGroup #TestDetails: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Title',
                Value: title,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Description',
                Value: description,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created By',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created At',
                Value: createdAt,
            },
        ],
    });

annotate service.Questions with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Question Text',
        Value: text,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Answer Text',
        Value: answers.text,
    }
]);


annotate service.Tests with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'TestDetailsFacet',
            Label : 'Test Details',
            Target : '@UI.FieldGroup#TestDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target : 'questions/@UI.LineItem',
            Label : 'Questions',
            ID : 'idQuestionsTable',
        }
    ]
);
