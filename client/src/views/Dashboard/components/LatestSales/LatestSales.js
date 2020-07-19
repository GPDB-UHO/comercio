import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data1, data2, options } from './chart';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;
  const [product, setProduct] = React.useState('Pollo');
  const [product2, setProduct2] = React.useState('Aceite');
  const [days, setDays] = React.useState(15);

  const classes = useStyles();

  return (
    <>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          action={
            <form
              autoComplete="off"
              className={classes.root}
              noValidate
            >
              <TextField
                id="outlined-select-currency"
                label="Producto"
                onChange={e => setProduct(e.target.value)}
                select
                style={{ width: '15ch' }}
                value={product}
              >
                <MenuItem value="Arroz">Arroz</MenuItem>
                <MenuItem value="Frijoles">Frijoles</MenuItem>
                <MenuItem value="Pollo">Pollo</MenuItem>
              </TextField>
              {/* <TextField
              id="outlined-select-currency"
              label="Circunscripción"
              onChange={e => setCirc(e.target.value)}
              select
              value={circ}
            >
              <MenuItem value={1}>Circunscripción #1</MenuItem>
              <MenuItem value={2}>Circunscripción #2</MenuItem>
              <MenuItem value={3}>Circunscripción #3</MenuItem>
            </TextField> */}
            </form>
          }
          title={`Días sin entregas de ${product} `}
        />
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar
              data={data1}
              options={options}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            Mostrar más datos <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
      <br />
      <br />
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          action={
            <form
              autoComplete="off"
              className={classes.root}
              noValidate
            >
              <TextField
                id="outlined-select-currency"
                label="Producto"
                onChange={e => setProduct2(e.target.value)}
                select
                style={{ width: '15ch' }}
                value={product2}
              >
                <MenuItem value="Arroz">Arroz</MenuItem>
                <MenuItem value="Frijoles">Frijoles</MenuItem>
                <MenuItem value="Pollo">Pollo</MenuItem>
                <MenuItem value="Aceite">Aceite</MenuItem>
              </TextField>
              <TextField
                id="outlined-select-currency"
                label="Días"
                onChange={e => setDays(e.target.value)}
                select
                style={{ width: '15ch' }}
                value={days}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </TextField>
              {/* <TextField
              id="outlined-select-currency"
              label="Circunscripción"
              onChange={e => setCirc(e.target.value)}
              select
              value={circ}
            >
              <MenuItem value={1}>Circunscripción #1</MenuItem>
              <MenuItem value={2}>Circunscripción #2</MenuItem>
              <MenuItem value={3}>Circunscripción #3</MenuItem>
            </TextField> */}
            </form>
          }
          title={`Cantidad de ${product2} entregado en los últimos ${days} días `}
        />
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar
              data={data2}
              options={options}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            Mostrar más datos <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
