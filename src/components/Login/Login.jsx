import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import { withRouter } from 'react-router-dom';
import style from './Login.module.css'

let logged = true;

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit(submit)} className={style.form}>
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Email"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Log In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default withRouter(
reduxForm({
  form: 'login',
  onSubmitSuccess: (result, dispatch, props) => {
    props.history.push('/')
    localStorage.setItem('logged', logged);;
  },

})(SubmitValidationForm))