import React from 'react';

import setupDeviceParameters from './setupDeviceParameters'
import QuestionBool from './QuestionBool';
import QuestionNumber from './QuestionNumber';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Hidden, Button } from '@material-ui/core';


const SplashQuestionTable: React.FC = () => {
  const shortid = require('shortid')

  const question = setupDeviceParameters.parameter.map(e => {

    if (typeof e.value === 'boolean' && e.type === "bool") { return (<TableRow key={e.id}>{QuestionBool(e.help, e.id, e.value, e.offText, e.onText, e.question)}</TableRow>) }
    if (typeof e.value === 'number' && e.type === "number") { return (<TableRow key={e.id}>{QuestionNumber(e.help, e.id, e.value, e.offText, e.onText, e.question)}</TableRow>) }
    if (typeof e.value === 'string' && e.type === "string") { return (<TableRow key={e.id}><td></td><td>number question found</td></TableRow>) }
    if (typeof e.value === 'object' && e.type === "options") { return (<TableRow key={e.id}><td></td><td>options List question found</td></TableRow>) }

    else { return (<tr key={shortid} ><th></th><th>invalid question found</th></tr>) }
  })

  const jsonReport = () => {
    //@ts-ignore
    console.table(setupDeviceParameters.parameter)
  }
    
  
  return (
    <Paper elevation={3}  variant="outlined">
      <span>
        <Button onClick= {jsonReport}>JSON console Report</Button>
      </span>
      <Table className="questions">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Variable</TableCell>
            <Hidden smDown>
              <TableCell>Help</TableCell>
            </Hidden>

          </TableRow>
        </TableHead>
        {/* // dont know if i need a key here */}
        <TableBody >{question}</TableBody>

      </Table>
    </Paper>
  )
}

export default SplashQuestionTable;