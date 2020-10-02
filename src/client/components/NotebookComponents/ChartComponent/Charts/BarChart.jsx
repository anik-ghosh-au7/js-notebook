import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme, fade } from "@material-ui/core";

const BarChart = ({ labels, datasets, title }) => {
  // theme
  const theme = useTheme();

  datasets[0] = {
    ...datasets[0],
    backgroundColor: fade(theme.palette.common.black, 0.55),
  };

  return (
    <div>
      <Bar
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

export default BarChart;
