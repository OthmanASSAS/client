import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux';
import {createStream} from '../../actions'

class StreamCreate extends Component {
  renderInput(formProps) {
    // <input onChange={formProps.input.onChange} value={formProps.input.value} />;
    // En dessous un raccourci de ce qui est au-dessus
    return <input {...formProps.input} />;
  }

  renderError=({ error, touched })=> {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInputDestructuring = ({ input, label, meta }) => {
    const className=`field ${meta.error && meta.touched ? 'error':''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInputDestructuring}
          label="Enter Title"
        />
        <Field
          name="description"
          component={this.renderInputDestructuring}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

export default connect(null, {createStream})(formWrapped)
