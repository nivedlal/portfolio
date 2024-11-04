import React, { useEffect, useState } from 'react';
import ApexCharts from "apexcharts";

function Stack() {
  const [chartHeight, setChartHeight] = useState(335);
  const [savedColors, setSavedColors] = useState([]);

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem('themeData')) || {};
      setSavedColors(savedData.colors || []);
    };

    updateSavedColors();
    const handleThemeChange = () => {
      updateSavedColors();
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1536) {
        setChartHeight(510);
      } else {
        setChartHeight(335); 
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const proficiencyData = [85, 90, 52, 51, 74, 76, 54, 53, 50];

  const options = {
    series: [
      {
        name: "Proficiency",
        data: proficiencyData, 
      },
    ],
    chart: {
      type: "bar",
      stacked: true,
      height: chartHeight,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
      },
    },
    xaxis: {
      categories: ["Bootstrap", "Tailwind", "SCSS", "GSAP", "React", "NextJS", "Blazor", ".NET Core", "T-SQL"],
      labels: {
        formatter: (value) => value + "%", 
      },
    },
    yaxis: {
      title: { text: undefined },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
        return value + "% Proficiency";
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
    },
    theme: {
      mode: "dark", 
      palette: "palette2", 
    },
    fill: {
      type: 'pattern',
      pattern: {
        style: 'slantedLines',
        width: 10,
        height: 10,
        strokeWidth: 2
      }
    },
    colors: [`${savedColors[1]}`]
  };

  const donutOptions = {
    series: proficiencyData, 
    chart: {
      type: 'donut',
      height: 350,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 270,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
    labels: ["Bootstrap", "Tailwind", "SCSS", "GSAP", "React", "NextJS", "Blazor", ".NET Core", "T-SQL"],
  };

  useEffect(() => {
    const barChartElement = document.getElementById("skill-chart");
    const barChart = new ApexCharts(barChartElement, options);
    barChart.render();

    const donutChartElement = document.getElementById("donut-chart");
    const donutChart = new ApexCharts(donutChartElement, donutOptions);
    donutChart.render();

    return () => {
      barChart.destroy();
      donutChart.destroy();
    };
  }, [options, donutOptions, chartHeight]);

  return (
    <div className="p-4 w-full overflow-y-auto h-[28rem] 2xl:h-[35rem]">
      <div className="lg:flex justify-between w-full gap-8 items-center">
        <div id="skill-chart" className="lg:w-3/4"></div>
        <div className="lg:w-1/4 w-full p-4 h-max rounded-md border border-gray-100" style={{ backgroundColor: savedColors[1], color: savedColors[1] }}>
          <div id="donut-chart"></div>
        </div>
      </div>
    </div>
  );
}

export default Stack;
