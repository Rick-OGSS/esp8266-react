import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import setupDeviceParameters from "./setupDeviceParameters";


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  text: {
    width: 150,
    color: "secondary"
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const QuestionSelect = (setupData: any) => {

  let currentIndex = setupDeviceParameters.parameter.findIndex(e => e.id === setupData.id)

  const classes = useStyles();
  const [option, setOption] = useState(setupData.value);
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

  const handleClick = (event: any) => {
    setOption(event.target.value);
    //console.log("id: ",currentIndex, " Option selected: ", event.target.value )

    setupDeviceParameters.parameter[currentIndex].value = event.target.value;
    console.log("onSubmit= ", setupData.value, " id: ", setupData.id, " index: ", currentIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listOptions = setupData.selections.map((setupData: any, i: number) => {
    console.log("key: ", i, "value", setupData.option)

    return (

      <MenuItem
        key={i}
        value={setupData.value}
        onClick={handleClick}
      >{setupData.option}</MenuItem>
    )
  });



  // use popover for help with xs screen
  const openHelp = Boolean(anchorEl);
  const id1 = openHelp ? 'simple-popover' : undefined;  //enable popovers for help in xs

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
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-label">Default Label</InputLabel>
                  <Select
                    labelId="select-label"
                    id="question-select"
                    value={option}
                    onChange={handleClick}
                  > {listOptions} </Select>
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
          open={openHelp}
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

export default QuestionSelect;
