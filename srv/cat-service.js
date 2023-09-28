const cds = require('@sap/cds')

module.exports = async function DevChallengeService() {

    const db = await cds.connect.to("db")

    this.on('assignQuestionsToTest', 'Tests', async (req) => {
        console.debug('> recevied', req.event, req.data)

        const reqQuestionsCount = req.data.questionsCount
        const testID = req.params[0].ID
        console.debug('> reqQuestionsCount : ', reqQuestionsCount)
        console.debug('> recevied targeted instance:', testID)

        if (reqQuestionsCount < 1) {
            req.error(`Quesntions Count should be at least 1`)
            return //"Quesntions Count should be at least 1"
        }

        // Try to select number of unassigned questions
        const { Questions } = db.entities('fullstack_dev_challenge')

        try {
            const avlblQuestions = await SELECT.from(Questions).where({ test_ID: null }).columns(b => { b.ID }).limit(reqQuestionsCount).forUpdate()
            const avlblQuestionsCount = avlblQuestions.length
            console.debug('> number of questions available:\n', avlblQuestionsCount)

            if ( avlblQuestionsCount <= 0 ) {
                req.error(`No questions available for assignment, create more questions`)
                return // `No questions available for assignment, create more questions`
            }
            
            var updateConunt = 0
            avlblQuestions.forEach(async (q) => {
                let n = await UPDATE(Questions).with({
                    test_ID: testID
                }).where({ ID : q.ID })

                updateConunt += n
            })

            console.debug('> updates: \n', updateConunt)            

            if ( avlblQuestionsCount >= reqQuestionsCount ) {
                req.notify(`${ avlblQuestionsCount } questions assigned to test`)
                // return `${ avlblQuestionsCount } questions assigned to test`
            } else {
                req.warn(`Only ${ avlblQuestionsCount } questions assigned to test.  Create more questions and then try again`)
                // return `Only ${ avlblQuestionsCount } questions assigned to test.  Create more questions and then try again`
            }

        } catch (e) {
            console.error(e)
        }

    })
}

// module.exports = class DevChallengeService extends cds.ApplicationService {
//     init() {
//         return super.init()
//     }

//     assignQuestionsToTest(Tests, req) {
//         console.debug('> recevied', req.event, req.data)
//     }
// } 