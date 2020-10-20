import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    return sleep(1000).then(() => {
        if (values.email !== 'root@gmail.com') {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'Login failed!'
            })
        } else if (values.password !== 'rootpassword') {
            throw new SubmissionError({
                password: 'Wrong password',
                _error: 'Login failed!'
            })
        }

    })
}

export default submit