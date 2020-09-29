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

import {fetchDistributions, useTargetAction} from "helpers";
import AddDistributionModal from "./AddDistributionModal";
import DeleteDistribution from "./DeleteDistributionModal";

const Distributions = (props) => {
  const { data, reload } = useAsync({ promiseFn: fetchDistributions });
  const [action, target, handleAction] = useTargetAction();

  return (
    <div>
      {["new", "edit"].includes(action) && (
        <AddDistributionModal
          open
          new={action=="new"}
          instance={target}
          onClose={handleAction}
          onAddDistribution={() => reload()}
        />
      )}
      {action == "delete" && (
        <DeleteDistribution
          open
          instance={target}
          onClose={handleAction}
          onAddDistribution={() => reload()}
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
              Agregar distribución
            </Button>
          }
          title="Distribuciones"
        />
        <Divider />
        <CardContent style={{ padding: 0 }}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Repartido</TableCell>
                  <TableCell>Sobrante</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Bodegas</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.results || []).map((dist) => (
                  <TableRow hover key={dist.id}>
                    <TableCell>{dist.id}</TableCell>
                    <TableCell>{dist.cantidad}</TableCell>
                    <TableCell>{dist.repartido}</TableCell>
                    <TableCell>{dist.sobrante}</TableCell>
                    <TableCell>{dist.fecha}</TableCell>
                    <TableCell>{dist.producto_detalles.nombre}</TableCell>
                    <TableCell>
                      {dist.bodegas_detalles
                        .map((item) => item.nombre)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => handleAction("edit", dist)}
                      >
                        Editar
                      </Button>
                      {" "}
                      <Button
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={() => handleAction("delete", dist)}
                      >
                        Eliminar
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

export default Distributions;
