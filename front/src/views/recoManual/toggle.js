import React from "react";
import { FormCheckbox } from "shards-react";

class BasicToggleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    return (
      <FormCheckbox
        toggle
        checked={this.state.checked}
        onChange={this.handleChange}>
        Cont1
      </FormCheckbox>
    );
  }
}

export default BasicToggleExample;

