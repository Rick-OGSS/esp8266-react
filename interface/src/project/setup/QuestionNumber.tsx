import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover, makeStyles, Slider } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import setupDeviceParameters from "./setupDeviceParameters"

// type Inputs = {
//   inputNumber: number
// };

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  slider: {
    width: 150,
    color: "secondary"  }
}));

const QuestionNumber = (setupData: any) => {

  const [ value, setValue ] = useState(setupData.value)

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

  const handleChange = (event: any, newValue: any) => {    
    setValue(newValue);
    console.log("slider value: ", newValue.toString());
    let currentIndex = setupDeviceParameters.parameter.findIndex(e => e.id === setupData.id)
    setupDeviceParameters.parameter[currentIndex].value = newValue;
    console.log("onSubmit= ", setupData.value, "id: ", setupData.id, " index: ", currentIndex);
    
  }

  const open = Boolean(anchorEl);
  const id1 = open ? 'simple-popover' : undefined;

  const marks = [
    {
      key: 1,
      value: setupData.min,
      label: setupData.value > 0.15*(setupData.max-setupData.min)+setupData.min ? setupData.min.toString()+setupData.units:"",
    },
    {
      key: 2,
      value: setupData.value,
      label: setupData.value.toString()+setupData.units,
    },
    {
      key: 3,
      value: setupData.max,
      label: setupData.value < 0.80*(setupData.max-setupData.min)+setupData.min ? setupData.max.toString()+setupData.units:"",
    }

  ];

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
                <Slider className={classes.slider}
                  min={setupData.min}
                  max={setupData.max}
                  step={setupData.steps}
                  valueLabelDisplay="auto"
                  marks={marks}
                  value={value} 
                  onChange={handleChange} 
                  aria-labelledby="continuous-slider"
                />
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

export default QuestionNumber;
