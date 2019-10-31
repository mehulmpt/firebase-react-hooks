import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ef9a9a",
      main: "#e57373",
      dark: "#b61827",
      contrastText: "#000"
    },
    secondary: {
      light: "#80deea",
      main: "#4dd0e1",
      dark: "#0093c4",
      contrastText: "#000"
    }
  }
});

export default Theme;
