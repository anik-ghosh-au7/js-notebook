import React from "react";
import { Polar } from "react-chartjs-2";
import { useTheme, fade } from "@material-ui/core";

const PolarChart = ({ labels, datasets, title }) => {
  // theme
  const theme = useTheme();
  let setPercent = 0.2;
  // adding color
  let backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(fade(theme.palette.common.black, setPercent));
    setPercent += 0.1;
  }

  datasets[0] = { ...datasets[0], backgroundColor };

  return (
    <div>
      <Polar
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

export default PolarChart;
