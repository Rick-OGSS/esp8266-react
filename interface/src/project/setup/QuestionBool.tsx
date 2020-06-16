import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import { Hidden, Popover } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';


// const networkQuestionsFile = '../assets/formQuestions/networkQuestions.js'

const QuestionBool = (help: string, id: number, lastValue: boolean, offText: string, onText: string, question: string) => {
  const [toggleValue, setState] = useState(lastValue);

  function updateJSONfile(id: number, value: boolean) {
    // console.log("Updating networkQuestions JSON file for id: ", id, " value: ", value)
  }

  let theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 10,
      },
    }
  });


  const ToggleSwitch = Switch; // allows for styling switch later

  const handleChange = (event: any) => {

    setState(!toggleValue);
    console.log("Toggle button ", id, " :", toggleValue);
    //updateJSONfile(id, toggleValue)
  };

  const handleHelp = () => {
    console.log(" Help: ",{help})

    // return(
    // <Popover 
    // )
  }

  return (

    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableCell column-width="10%">{id}</TableCell>
        <TableCell column-width="30%">{question}</TableCell>
        <TableCell column-width="10%">
          <Typography component="div" variant="subtitle1">
            <Grid component="label" container alignItems="center"
              spacing={0} wrap="nowrap">
              {/* lg={3} xs={1} */}
              <Hidden xsDown>
                <Grid item >{offText}</Grid>
              </Hidden>
              <Grid item>
                <ToggleSwitch
                  onChange={handleChange}
                />
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
        <TableCell column-width="15%"><HelpIcon onClick={handleHelp}/></TableCell>
        </Hidden>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default QuestionBool;