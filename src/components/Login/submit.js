import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    return sleep(1000).then(() => {
        if (values.email !== '1') {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'Login failed!'
            })
        } else if (values.password !== '1') {
            throw new SubmissionError({
                password: 'Wrong password',
                _error: 'Login failed!'
            })
        }

    })
}

export default submit