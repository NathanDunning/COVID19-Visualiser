// React imports
import React, { useState, useEffect } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
      marginBottom: 0,
    },
  },
}));

export default function MenuSelector(props) {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Helper function for finding number of days difference
    const daysDiff = (start, end) => {
      return Math.round(Math.abs((end - start) / 86400000));
    };

    const startDate = new Date('January 22, 2020');
    const today = new Date();
    const diff = daysDiff(startDate, today);
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    let dateElem = [];
    for (let i = 0; i <= diff; i++) {
      const temp = new Date(startDate);
      const date = temp.setTime(temp.getTime() + i * 86400000);
      const dateAsEpoch = date / 1000;
      const formattedDate = new Date(date).toLocaleDateString(
        'en-GB',
        formatOptions
      );

      dateElem.push(
        <MenuItem value={dateAsEpoch} key={dateAsEpoch}>
          {formattedDate}
        </MenuItem>
      );
    }
    setCurrentDate(dateElem);
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Start Date</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={startDate}
          onChange={handleStartDateChange}
        >
          {currentDate.map((e) => {
            return e;
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>End Date</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={endDate}
          onChange={handleEndDateChange}
        >
          {currentDate.map((e) => {
            return e;
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.button}>
        <Button
          variant='outlined'
          disableElevation
          disabled={
            startDate !== '' && endDate !== '' && startDate <= endDate
              ? false
              : true
          }
          onClick={() => props.submitHandler(startDate, endDate)}
        >
          Submit
        </Button>
      </FormControl>
    </div>
  );
}
