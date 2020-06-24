import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover, makeStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import setupDeviceParameters from "./setupDeviceParameters"
import { useForm } from "react-hook-form";

type Inputs = {
  example: string,
  exampleRequired: string,
};

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const QuestionNumber = (help: string, id: number, value: number, offText: string, onText: string, question: string) => {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 8,
      },
    }
  });

  // const ToggleSwitch = Switch; // allows for styling switch later
  // const handleChange = (event: any) => {
    
  //   setupDeviceParameters.parameter[id].value = value;
  //   console.log("Id; ", id, " last Value updated to: ", setupDeviceParameters.parameter[id].value)
  // };

  const handleHelp = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id1 = open ? 'simple-popover' : undefined;


  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => console.log("onSubmit= ", data);

  //console.log(watch("example")); // watch input value by passing the name of it


  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableCell column-width="10%">{id}</TableCell>
        <TableCell column-width="30%">{question}</TableCell>
        <TableCell column-width="10%">
          <Typography component="div" variant="subtitle1">
            <Grid component="label" container alignItems="center"
              spacing={0} wrap="nowrap">
              <Hidden xsDown>
                <Grid item >{offText}</Grid>
              </Hidden>
              <Grid item>

                "handleSubmit" will validate your inputs before invoking "onSubmit"
                <form onSubmit={handleSubmit(onSubmit) }>
                  {/* register your input into the hook by invoking the "register" function */}
                  {<input name="example" defaultValue="test default number value" ref={register} />}

                  {/* include validation with required or other standard HTML validation rules */}
                  <input name="exampleRequired" ref={register({ required: true })} key={id} />
                  {/* errors will return when field validation fails  */}
                  {errors.exampleRequired && <span>This field is required text here</span>}

                  <input type="submit" />
                </form>

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

export default QuestionNumber;
