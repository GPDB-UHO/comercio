import React from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  MenuItem,
  TextField,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { useData } from "helpers";
import { data1, data2, options } from "./chart";

const useStyles = makeStyles((theme) => ({
  filterTexfields: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  chartContainer: {
    height: 400,
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const LatestDeliveries = () => {
  const [state, setState] = useData({
    first_product: "Pollo",
    second_product: "Aceite",
    days: 15,
  });

  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader
          action={
            <div className={classes.filterTexfields}>
              <TextField
                label="Producto"
                onChange={(e) => setState({ first_product: e.target.value })}
                select
                style={{ width: "15ch" }}
                value={state.first_product}
              >
                <MenuItem value="Arroz">Arroz</MenuItem>
                <MenuItem value="Frijoles">Frijoles</MenuItem>
                <MenuItem value="Pollo">Pollo</MenuItem>
              </TextField>
            </div>
          }
          title={`Días sin entregas de ${state.first_product} `}
        />
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={data1} options={options} />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button color="primary" size="small" variant="text">
            Mostrar más datos <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
      <br />
      <br />
      <Card>
        <CardHeader
          action={
            <div className={classes.filterTexfields}>
              <TextField
                id="outlined-select-currency"
                label="Producto"
                onChange={(e) => setState({ second_product: e.target.value })}
                select
                style={{ width: "15ch" }}
                value={state.second_product}
              >
                <MenuItem value="Arroz">Arroz</MenuItem>
                <MenuItem value="Frijoles">Frijoles</MenuItem>
                <MenuItem value="Pollo">Pollo</MenuItem>
                <MenuItem value="Aceite">Aceite</MenuItem>
              </TextField>
              <TextField
                id="outlined-select-currency"
                label="Días"
                onChange={(e) => setState({ days: e.target.value })}
                select
                style={{ width: "15ch" }}
                value={state.days}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </TextField>
            </div>
          }
          title={`Cantidad de ${state.second_product} entregado en los últimos ${state.days} días `}
        />
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={data2} options={options} />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button color="primary" size="small" variant="text">
            Mostrar más datos <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default LatestDeliveries;
