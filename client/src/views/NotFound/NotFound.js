import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={12}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              404: La página que usted ha solicitado no se encuentra ):
            </Typography>
            <Typography variant="subtitle2">
              Intente probar otra ruta o simplemente refresque el navegador.
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
