import React from "react";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MCheckbox from "@material-ui/core/Checkbox";

export const Checkbox = ({ label, formLabel, helperText, ...props }) => (
  <FormControl component="fieldset">
    {formLabel && (
      <FormLabel component="legend">{formLabel}</FormLabel>
    )}
    <FormGroup>
      <FormControlLabel
        control={<MCheckbox {...props} />}
        label={label}
      />
    </FormGroup>
    {helperText && <FormHelperText>Be careful</FormHelperText>}
  </FormControl>
);


Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  formLabel: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired
};
