import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

function Stack() {
  const [chartHeight, setChartHeight] = useState(335);
  const [savedColors, setSavedColors] = useState([]);

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem("themeData")) || {};
      setSavedColors(savedData.colors || []);
    };

    updateSavedColors();
    const handleThemeChange = () => {
      updateSavedColors();
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1536) {
        setChartHeight(425);
      } else if (window.innerWidth > 1280) {
        setChartHeight(310);
      } else {
        setChartHeight(300);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const proficiencyData = [85, 90, 52, 51, 74, 76, 54, 53, 50, 62];

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
      categories: [
        "Bootstrap",
        "Tailwind",
        "SASS",
        "GSAP",
        "React",
        "NextJS",
        "Blazor",
        ".NET Core",
        "T-SQL",
        "Three.JS"
      ],
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
      palette: "palette1",
    },
    fill: {
      type: "pattern",
      pattern: {
        style: "slantedLines",
        width: 10,
        height: 10,
        strokeWidth: 2,
      },
    },
    colors: [`${savedColors[1]}`],
  };

  useEffect(() => {
    const barChartElement = document.getElementById("skill-chart");
    const barChart = new ApexCharts(barChartElement, options);
    barChart.render();

    return () => {
      barChart.destroy();
    };
  }, [options, chartHeight]);

  return (
    <div className="p-4 w-full overflow-y-auto h-[28rem] 2xl:h-[35rem]">
      <div className="lg:flex justify-between w-full gap-4 items-center h-full">
        <div className="lg:w-3/4 flex flex-col justify-between">
          <div
            className="w-full p-4 h-max border border-gray-100"
            style={{ backgroundColor: savedColors[2] }}
          >
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <img
                  src="research.png"
                  alt="research"
                  className="w-8 h-8 invert opacity-80"
                />
                <span className="text-xs lg:text-base">Research</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="design.png"
                  alt="design"
                  className="w-8 h-8 invert opacity-80"
                />
                <span className="text-xs lg:text-base">Design</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="development.png"
                  alt="development"
                  className="w-8 h-8 invert opacity-80"
                />
                <span className="text-xs lg:text-base">Development</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="execution.png"
                  alt="execution"
                  className="w-8 h-8 invert opacity-80"
                />
                <span className="text-xs lg:text-base">Execution</span>
              </div>
            </div>
          </div>
          <div id="skill-chart" className="flex items-end mb-2 lg:mb-0"></div>
        </div>
        <div className="lg:w-1/4 w-full p-4 h-full border border-gray-100">
          <div className="p-4 w-full">
            <div className="py-2 px-4 flex justify-between"
            style={{ backgroundColor: savedColors[2] }}><span>Perfection in progress</span><span>x</span></div>
            <div className="bg-gray-100 bg-opacity-10">
              <div className="p-4">
                <div className="w-full bg-gray-200 rounded-sm h-12 border border-gray-950 flex items-center justify-between p-1">
                  <div
                    className="h-10 border border-gray-950 rounded-sm p-2"
                    style={{ width: "70%", backgroundColor: savedColors[1], color: savedColors[2] }}
                  >70%</div>
                  <p style={{ color: savedColors[2] }} className="text-6xl font-bold">∞</p>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-y-scroll max-h-[14rem] 2xl:max-h-full 2xl:overflow-y-hidden">
            <p className="mb-2">◘ Research – Understanding: Gain insights into the <span className="curly" style={{ color: savedColors[1] }}>problem</span> space, user needs, and business objectives.</p>
            <p className="my-2">◘ Design – Creation: Bring those insights to life through design, establishing a cohesive, user-friendly, and visually engaging <span className="curly" style={{ color: savedColors[1] }}>experience</span>.</p>
            <p className="my-2">◘ Development – Realization: Build and optimize the product to match the design, ensuring smooth <span className="curly" style={{ color: savedColors[1] }}>functionality</span> and scalability.</p>
            <p className="mt-2">◘ Execution – Delivery: Test, finalize, and <span className="curly" style={{ color: savedColors[1] }}>launch</span> the project, ensuring it delivers an exceptional experience and performs as intended.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stack;
