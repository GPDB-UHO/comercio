import React from "react";
import { useAsync } from "react-async";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import {
  addDistribution, editDistribution,
  fetchBodegas,
  fetchProducts,
  useData,
  useToggleState,
} from "helpers";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "35vh",
  },
}));

export default function AddDistribution(props) {
  const productsAsyncData = useAsync({ deferFn: fetchProducts });
  const bodegasAsyncData = useAsync({ deferFn: fetchBodegas });
  // const state = useAsync({ promiseFn: fetchAll });

  const [toggleProduct, openProducts, closeProducts] = useToggleState();
  const [toggleBodega, openBodegas, closeBodegas] = useToggleState();

  const [data, setData] = useData({
    producto: null,
    bodegas: [],
    cantidad: 0,
    repartido: 0,
    sobrante: 0,
    fech: null,
    ...props.instance,
  });
  const [errors, setErrors] = useData({});

  const classes = useStyles();

  function handleAddDistribution(data) {
    const func = props.new ? addDistribution : editDistribution;
    func(data)
      .then((response) => {
        props.onClose();
        props.onAddDistribution();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }

  function handleOpenProducts() {
    openProducts();
    productsAsyncData.run();
  }

  function handleCloseProducts() {
    closeProducts();
  }

  function handleOpenBodegas() {
    openBodegas();
    bodegasAsyncData.run();
  }

  function handleCloseBodegas() {
    closeBodegas();
  }

  function handleChangeField(value, field) {
    // console.log(field, value);
    setData({ [field]: value });
  }

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      maxWidth="sm"
      fullWidth
      disableBackdropClick
    >
      <DialogTitle>{props.new ? "Agregar distribución" : "Editar distribución"}</DialogTitle>
      <DialogContent classes={{ root: classes.root }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="fecha"
              label="Fecha"
              type="date"
              onChange={(evt) => handleChangeField(evt.target.value, "fecha")}
              variant="outlined"
              fullWidth
              value={data.fecha}
              error={errors.fecha}
              InputLabelProps={{ shrink: true }}
              helperText={errors.fecha}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              defaultValue={props?.instance?.producto_detalles}
              id="select-product"
              open={toggleProduct}
              onOpen={handleOpenProducts}
              onClose={handleCloseProducts}
              onChange={(_, value) => handleChangeField(value?.id, "producto")}
              getOptionSelected={(option, value) =>
                option.nombre === value.nombre
              }
              getOptionLabel={(option) => option.nombre}
              options={productsAsyncData.data?.results || []}
              loading={productsAsyncData.isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Producto"
                  variant="outlined"
                  error={errors.producto}
                  helperText={errors.producto}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {productsAsyncData.isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="cantidad"
              label="Cantidad"
              type="number"
              onChange={(evt) =>
                handleChangeField(evt.target.value, "cantidad")
              }
              variant="outlined"
              fullWidth
              value={data.cantidad}
              error={errors.cantidad}
              helperText={errors.cantidad}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="repartido"
              label="Repartido"
              type="number"
              onChange={(evt) =>
                handleChangeField(evt.target.value, "repartido")
              }
              variant="outlined"
              fullWidth
              value={data.repartido}
              error={errors.repartido}
              helperText={errors.repartido}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="sobrante"
              label="Sobrante"
              type="number"
              onChange={(evt) =>
                handleChangeField(evt.target.value, "sobrante")
              }
              variant="outlined"
              fullWidth
              value={data.sobrante}
              error={errors.sobrante}
              helperText={errors.sobrante}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              defaultValue={props?.instance?.bodegas_detalles}
              id="select-bodegas"
              open={toggleBodega}
              multiple
              onOpen={handleOpenBodegas}
              onChange={(_, value) =>
                handleChangeField(
                  value.map((i) => i.id),
                  "bodegas"
                )
              }
              onClose={handleCloseBodegas}
              getOptionSelected={(option, value) =>
                option.nombre === value.nombre
              }
              getOptionLabel={(option) => option.nombre}
              options={bodegasAsyncData.data?.results || []}
              loading={bodegasAsyncData.isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Bodega"
                  variant="outlined"
                  error={errors.bodegas}
                  helperText={errors.bodegas}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {bodegasAsyncData.isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleAddDistribution(data)}>
          {props.new ? "Agregar distribución" : "Guardar"}
        </Button>
        <Button color="error" onClick={() => props.onClose()}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
