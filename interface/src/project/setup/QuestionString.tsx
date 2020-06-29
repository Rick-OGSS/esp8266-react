import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover, makeStyles, FormControl, InputLabel, Input, InputAdornment, FormHelperText } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import setupDeviceParameters from "./setupDeviceParameters";


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  text: {
    width: 150,
    color: "secondary"
  }
}));

const QuestionString = (setupData: any) => {

  const [value, setValue] = useState(setupData.value);
  const [lastValue, setLastValue] = useState(setupData.value)
  const [errorMsg, setMsg] = useState("Required Field");
  const [inputError, setError] = useState(false)
  let currentIndex = setupDeviceParameters.parameter.findIndex(e => e.id === setupData.id)

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  let theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 8,
      },
    }
  });

  const handleHelp = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   console.log("Clearing text area")
  //   //e.target.value = '';

  // });
  const handleChange = (event: any) => {
    setValue(event.target.value);
    //console.log("string value: ", event.target.value)
    validateChange(event);
  };

  const handleBlur = (e: any) => {
    console.log("Element going out of focus.  Validate error: ", inputError)

    if (inputError) {
      setValue("")
      setMsg(" Invalid:  Reverting to saved");
      setLastValue(setupData.value);
    } else {

      setupDeviceParameters.parameter[currentIndex].value = e.target.value;
      console.log("onSubmit= ", e.target.value, "id: ", setupData.id, " index: ", currentIndex);
      setMsg("Validated and saved")
      setLastValue(e.target.value)

    }
  }

  const validateChange = (e: any) => {
    //console.log("string error: ", event.target.error);
    let checkValue: string = e.target.value;
    if (checkValue.length < e.target.minLength) {
      console.log("string error: Too short")
      setError(true);
      setMsg("Text too short.  Min: " + e.target.minLength.toString())
      return;
    }
    // add new error checks here
    let validChars: any = new RegExp(setupData.regexp);
    if (!e.target.value.match(validChars)) {
      console.log("string error: Invalid Character for regexp: ", validChars.toString())
      setError(true);
      setMsg("Invalid Character")
      return;
    }
    // if no errors
    setError(false);
    setMsg("Valid Input");
    setValue(checkValue);
  }
  // use popover for help with xs screen
  const open = Boolean(anchorEl);
  const id1 = open ? 'simple-popover' : undefined;  //enable popovers for help in xs

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableCell >{setupData.id}</TableCell>
        <TableCell >{setupData.question}</TableCell>
        <TableCell >
          <Typography component="div" variant="subtitle1">
            <Grid component="label" container alignItems="center"
              spacing={0} wrap="nowrap">
              <Hidden xsDown>
                <Grid item >{setupData.offText}</Grid>
              </Hidden>
              <Grid item>
                <FormControl className={classes.text} error={inputError}>
                  <InputLabel htmlFor="component-error">{lastValue}</InputLabel>
                  <Input
                    multiline
                    color='primary'
                    margin='dense'
                    fullWidth
                    required
                    id="component-error"
                    //value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="component-error-text"
                    type="string"
                    inputProps={{
                      minLength: setupData.min,
                      maxLength: setupData.max,
                    }}
                    endAdornment={<InputAdornment position="end">{setupData.units}</InputAdornment>}
                  />
                  <FormHelperText id="component-error-text">{errorMsg}</FormHelperText>
                </FormControl>
              </Grid>
              <Hidden xsDown>
                <Grid item>{setupData.onText}</Grid>
              </Hidden>
            </Grid>
          </Typography>
        </TableCell>
        <Hidden smDown>
          <TableCell >{setupData.help}</TableCell>
        </Hidden>
        <Hidden mdUp>
          <TableCell ><HelpIcon onClick={handleHelp} /></TableCell>
        </Hidden>
        <Popover
          id={id1}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>{setupData.help}</Typography>
        </Popover>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default QuestionString;
