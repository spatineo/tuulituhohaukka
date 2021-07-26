import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

// interface interfaceName {
//   value: string
// }

const NoVisualization: React.FC = () => {
  const classes = useStyles();
  return <div>No Visualization</div>;
};

const useStyles = makeStyles(() => createStyles({}));

export default NoVisualization;
