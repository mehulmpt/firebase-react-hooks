import React from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: "20px",
    marginRight: "20px",
    [theme.breakpoints.up(400)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: "20px"
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Hello Guest!
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
          className={classes.submit}
        >
          Register
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
          className={classes.submit}
        >
          Login
        </Button>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(HomePage);
