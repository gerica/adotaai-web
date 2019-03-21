import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { TextError } from './style';

const styles = () => ({
  margin: {
    // margin: theme.spacing.unit
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5
  },
  borderError: {
    border: '1px solid red',
    borderRadius: 5
  }
});

const customStyles = {
  option: provided => ({
    ...provided
    // zIndex: 9999
    // marginTop: 20
  })
};

class SelectBase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      label,
      options,
      className,
      onCustomChange,
      // input: { value }
      input,
      name,
      id,
      meta: { touched, error, warning }
    } = this.props;

    const viewErrorWarning = (
      <div style={{ marginBottom: 10 }}>
        {(error && <TextError>{error}</TextError>) ||
          (warning && <TextError>{warning}</TextError>)}
      </div>
    );

    const classSelect =
      touched && error
        ? classNames(classes.margin, className, classes.borderError)
        : classNames(classes.margin, className);

    return (
      <Fragment>
        <Select
          styles={customStyles}
          className={classSelect}
          {...input}
          id={id}
          name={name}
          placeholder={label}
          options={options}
          value={input.value}
          onChange={valueLocal => {
            input.onChange(valueLocal);
            onCustomChange(valueLocal);
          }}
          onBlur={() => input.onBlur(input.value)}
        />
        {touched && viewErrorWarning}
      </Fragment>
    );
  }
}

SelectBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  onCustomChange: PropTypes.func
};

SelectBase.defaultProps = {
  className: '',
  onCustomChange: () => {}
};

export default withStyles(styles)(SelectBase);
