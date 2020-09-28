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

import { fetchProducts, useToggleState, useTargetAction } from "helpers";
import EditProduct from "./EditProductModal";

const ProductList = (props) => {
  const { data, reload } = useAsync({ promiseFn: fetchProducts });
  const [action, target, handleAction] = useTargetAction();
  return (
    <div>
      {!!["new", "edit"].includes(action) && (
        <EditProduct
          new={action === "new"}
          open={["new", "edit"].includes(action)}
          instance={target}
          onClose={handleAction}
          onAddProduct={() => reload()}
        />
      )}
      <Card>
        <CardHeader
          action={
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => handleAction("new")}
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
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.notas}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => handleAction("edit", product)}
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
