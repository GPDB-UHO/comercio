import React from "react";
import { useAsync } from "react-async";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { fetchProducts, useToggleState } from "helpers";
import EditProduct from "./EditProductModal";

const ProductList = (props) => {
  const { data, reload } = useAsync({ promiseFn: fetchProducts });
  const [open, openModal, closeModal] = useToggleState();
  const [openEdit, openModalEdit, closeModalEdit] = useToggleState();

  return (
    <div>
      <EditProduct
        new={true}
        open={open}
        onClose={closeModal}
        onAddProduct={() => reload()}
      />
      <Card>
        <CardHeader
          action={
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={openModal}
            >
              Agregar producto
            </Button>
          }
          title="Productos"
        />
        <Divider />
        <CardContent style={{ padding: 0 }}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id del Producto</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Notas</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.notas}</TableCell>
                    <TableCell>
                      <EditProduct
                        new={false}
                        instance={product}
                        open={openEdit}
                        onClose={closeModalEdit}
                        onAddProduct={() => reload()}
                      />
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={openModalEdit}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;
