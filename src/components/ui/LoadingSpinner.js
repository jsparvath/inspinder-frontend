import { withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const styles = theme => ({
  circularProgress: {
    color: theme.palette.secondary.main
  }
});

const LoadingSpinner = ({ classes }) => {
  return <CircularProgress className={classes.circularProgress} />;
};

export default withStyles(styles)(LoadingSpinner);
