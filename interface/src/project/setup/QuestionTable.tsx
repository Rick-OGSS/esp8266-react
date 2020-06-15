import React from 'react';
import QuestionBool from './QuestionBool';
import setupDeviceParameters from './setupDeviceParameters'

// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Hidden } from '@material-ui/core';


const QuestionTable: React.FC = () => {

  const question = setupDeviceParameters.parameter.map(e => {

    if (typeof e.lastValue === 'boolean' && e.type === "bool") { return (<TableRow key={e.id}>{QuestionBool(e.help, e.id, e.lastValue, e.offText, e.onText, e.question)}</TableRow>) }
    if (typeof e.lastValue === 'string' && e.type === "string") { return (<TableRow key={e.id}><td></td><td>string question found</td></TableRow>) }
    if (typeof e.lastValue === 'number' && e.type === "number") { return (<TableRow key={e.id}><td></td><td>number question found</td></TableRow>) }
    if (typeof e.lastValue === 'object' && e.type === "options") { return (<TableRow key={e.id}><td></td><td>options List question found</td></TableRow>) }

    else { return (<tr><th></th><th>invalid question found</th></tr>) }
  }
  )

  return (
    <Paper>
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
        <TableBody>{question}</TableBody>

      </Table>
    </Paper>
  )
}

export default QuestionTable;