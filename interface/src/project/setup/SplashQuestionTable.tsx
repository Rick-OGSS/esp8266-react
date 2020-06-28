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

  const questionTable = setupDeviceParameters.parameter.map(setupData => {

    if (typeof setupData.value === 'boolean' && setupData.type === "bool") { return (<TableRow key={setupData.id}>{QuestionBool(setupData)}</TableRow>) }
    if (typeof setupData.value === 'number' && setupData.type === "number") { return (<TableRow key={setupData.id}>{QuestionNumber(setupData)}</TableRow>) }
    if (typeof setupData.value === 'string' && setupData.type === "string") { return (<TableRow key={setupData.id}><td></td><td>string question found</td></TableRow>) }
    if (typeof setupData.value === 'object' && setupData.type === "options") { return (<TableRow key={setupData.id}><td></td><td>options List question found</td></TableRow>) }

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
        <TableBody >{questionTable}</TableBody>
      </Table>
    </Paper>
  )
}

export default SplashQuestionTable;