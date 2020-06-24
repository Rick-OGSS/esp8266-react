import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover, makeStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import setupDeviceParameters from "./setupDeviceParameters"

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const QuestionBool = (help: string, idSwitch: number, value: boolean, offText: string, onText: string, question: string) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setValue] = useState({
    toggle1: value
  })

  let theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 10,
      },
    }
  });

  const ToggleSwitch = Switch; // allows for styling switch later

  const handleChange = (event: any) => {

    setValue({ ...state, [event.target.name]: event.target.checked });

     let currentIndex = setupDeviceParameters.parameter.findIndex(e => e.id === idSwitch)    
     setupDeviceParameters.parameter[currentIndex].value = event.target.checked;
     console.log("id: ", idSwitch," index: ",currentIndex, "value updated to: ", setupDeviceParameters.parameter[currentIndex].value)   
   };

  const handleHelp = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id1 = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableCell column-width="10%">{idSwitch}</TableCell>
        <TableCell column-width="30%">{question}</TableCell>
        <TableCell column-width="10%">
          <Typography component="div" variant="subtitle1">
            <Grid component="label" container alignItems="center"
              spacing={0} wrap="nowrap">
              <Hidden xsDown>
                <Grid item >{offText}</Grid>
              </Hidden>
              <Grid item>
                <ToggleSwitch onChange={handleChange} checked={state.toggle1} name="toggle1"/>
              </Grid>
              <Hidden xsDown>
                <Grid item>{onText}</Grid>
              </Hidden>
            </Grid>
          </Typography>
        </TableCell>
        <Hidden smDown>
          <TableCell column-width="50%">{help}</TableCell>
        </Hidden>
        <Hidden mdUp>
          <TableCell column-width="5%"><HelpIcon onClick={handleHelp} /></TableCell>
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
          <Typography className={classes.typography}>{help}</Typography>
        </Popover>

      </ThemeProvider>
    </React.Fragment>
  );
}

export default QuestionBool;