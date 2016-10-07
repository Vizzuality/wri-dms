import React, { PropTypes, Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class MultiselectForm extends Component {

  constructor(props) {
    super(props);

    this.onCreate = this.onCreate.bind(this);
  }

  onCreate(name) {
    if (!this.props.input.value) {
      this.props.input.onChange([name]);
      return;
    }
    this.props.input.onChange(this.props.input.value.concat(name));
  }

  render() {
    const { input, create, ...rest } = this.props;
    return (
      <Multiselect
        {...input}
        onBlur={() => { input.onBlur(); }}
        value={input.value || []} // requires value to be an array
        onCreate={create ? this.onCreate : false}
        {...rest}
      />
    );
  }

}

MultiselectForm.propTypes = {
  input: PropTypes.object,
  onChange: PropTypes.func,
  create: PropTypes.bool,
};

export default MultiselectForm;
