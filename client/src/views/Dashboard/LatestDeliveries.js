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

import { useData, fetchDaysWithoutProducts, fetchProducts } from "helpers";
import { data1, data2, options } from "./chart";
import { useAsync } from "react-async";
import { async } from "validate.js";
import palette from "theme/palette";

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
    first_product: 10,
    second_product: "Aceite",
    days: 15,
  });
  const daysWithoutProducts = useAsync({
    promiseFn: fetchDaysWithoutProducts,
    producto: state.first_product,
    watch: state.first_product,
  });
  const products = useAsync({
    promiseFn: fetchProducts,
  });

  const classes = useStyles();
  const chartData = {
    labels: daysWithoutProducts.data?.data.map((item) => item.nombre),
    datasets: [
      {
        label: "Días sin entregas",
        backgroundColor: palette.primary.main,
        data: daysWithoutProducts.data?.data.map(
          (item) => item.dias_ultima_distribucion
        ),
      },
    ],
  };
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
                {(products.data?.results || []).map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          }
          title={`Días sin entregas de ${
            (products.data?.results || []).find(
              (item) => item.id == state.first_product
            )?.nombre
          } `}
        />
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
        <Divider />
        {/* <CardActions className={classes.actions}>
          <Button color="primary" size="small" variant="text">
            Mostrar más datos <ArrowRightIcon />
          </Button>
        </CardActions> */}
      </Card>
      <br />
      <br />
      {/* <Card>
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
      </Card> */}
    </>
  );
};

export default LatestDeliveries;
