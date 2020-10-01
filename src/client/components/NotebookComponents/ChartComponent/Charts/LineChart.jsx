import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme, fade } from "@material-ui/core";

const LineChart = ({ labels, datasets, title }) => {
  // theme
  const theme = useTheme();

  datasets[0] = {
    ...datasets[0],
    backgroundColor: fade(theme.palette.common.black, 0.25),
  };

  return (
    <div>
      <Line
        data={{ labels, datasets }}
        options={{
          title: {
            display: true,
            text: title,
          },
          legend: {
            display: true,
          },
        }}
      />
    </div>
  );
};

export default LineChart;
