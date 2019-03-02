import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';
import { AccountCircle, VisibilityOff, Visibility } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class TextInputBase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getType() {
    const { typeField, showPassword } = this.props;
    if (typeField === 'text') {
      return 'text';
    }

    return showPassword ? 'text' : 'password';
  }

  renderAdornment() {
    const {
      showPassword,
      typeField,
      adornment,
      handleClickShowPassword
    } = this.props;

    if (!adornment) {
      return null;
    }

    if (typeField === 'text') {
      return (
        <InputAdornment position="end">
          <AccountCircle style={{ marginLeft: 11, marginRight: 12 }} />
        </InputAdornment>
      );
    }

    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="Toggle password visibility"
          onClick={handleClickShowPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  }

  render() {
    const {
      classes,
      label,
      className,
      input: { value, ...inputProps },
      meta: { touched, error }
    } = this.props;

    const idComponent = `component-${label}`;
    const hasError = touched && (error && error.length > 0);

    return (
      <FormControl
        // className={classes.margin}
        className={classNames(classes.margin, className)}
        error={hasError}
      >
        <InputLabel htmlFor={idComponent}>{label}</InputLabel>
        <Input
          id={idComponent}
          value={value}
          type={this.getType()}
          aria-describedby="component-error-text"
          {...inputProps}
          endAdornment={this.renderAdornment()}
        />
        {touched && (
          <FormHelperText id="component-error-text">{error}</FormHelperText>
        )}
      </FormControl>
      // <TextField
      //   className={classes.margin}
      //   label={label}
      //   value={value}
      //   type={this.getType()}
      //   {...inputProps}
      //   InputProps={this.renderAdornment()}
      //   error={error}
      // />
    );
  }
}

TextInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  showPassword: PropTypes.bool,
  typeField: PropTypes.string,
  adornment: PropTypes.bool,
  handleClickShowPassword: PropTypes.func
};

TextInputBase.defaultProps = {
  showPassword: false,
  typeField: 'text',
  adornment: false,
  className: '',
  handleClickShowPassword: () => {}
};

export default withStyles(styles)(TextInputBase);
