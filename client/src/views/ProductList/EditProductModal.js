import React from "react";
import { useEffect } from "react";
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

import { addProduct, editProduct, useData } from "helpers";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "200px",
  },
}));

export default function EditProduct(props) {
  const [data, setData] = useData({ name: "", notes: "" });
  const [errors, setErrors] = useData({});

  const classes = useStyles();

  useEffect(() => {
    if (!props.new) {
      console.log(props.instance, "<<<");
      setData({name: props.instance.nombre, notes: props.instance.notas});
    }
  }, [props.instance]);

  function handleSubmit(data) {
    const newData = props.new ? data : {...data, id: props.instance.id};
    const func = props.new ? addProduct : editProduct;
    func(newData)
      .then(() => {
        props.onClose();
        props.onAddProduct();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      maxWidth="sm"
      fullWidth
      disableBackdropClick
    >
      <DialogTitle>{props.new ? "Agregar producto" : "Editar producto"}</DialogTitle>
      <DialogContent classes={{ root: classes.root }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              id="name-product"
              label="Nombre"
              variant="outlined"
              fullWidth
              value={data.name}
              error={errors.nombre}
              helperText={errors.nombre}
              onChange={(evt) => setData({ name: evt.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="note-product"
              multiline
              fullWidth
              label="Notas"
              value={data.notes}
              variant="outlined"
              rows={4}
              error={errors.notas}
              helperText={errors.notas}
              onChange={(evt) => setData({ notes: evt.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleSubmit(data)}>
          {props.new ? "Agregar producto" : "Guardar"}
        </Button>
        <Button color="error" onClick={props.onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
