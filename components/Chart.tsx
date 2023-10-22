import Image from "next/image"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Scatter } from "react-chartjs-2"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface Window {
  Image: {
    prototype: HTMLImageElement
    new (): HTMLImageElement
  }
}
var image: any
if (typeof window !== "undefined") {
  // browser code
  image = new window.Image()
  image.src =
    "https://github.com/Aladdin4u/injury-tracking-system-nextJs/assets/101972392/1d20cce2-7c58-4841-85df-107e80295f8e"
}

export const plugin = {
  id: "customCanvasBackgroundImage",
  beforeDraw: chart => {
    if (image.complete) {
      const ctx = chart.ctx
      const { top, left, width, height } = chart.chartArea
      const x = left
      const y = top
      ctx.drawImage(image, x, y, width, height)
    } else {
      image.onload = () => chart.draw()
    }
  },
}

const footer = tooltipItems => {
  return "cat"
}
const toolChart = tooltipItems => {
  return ""
}

export const options = {
  scales: {
    x: {
      min: 0,
      max: 100,
    },
    y: {
      min: 0,
      max: 100,
    },
  },
  elements: {
    point: {
      pointStyle: "circle",
    },
    line: {
      borderWidth: 10,
    },
  },
  plugins: {
    tooltip: {
      yAlign: "bottom",
      displayColors: false,
      callback: {
        footer: footer,
        label: toolChart,
      },
    },
  },
}

export const data = {
  datasets: [
    {
      label: "A dataset",
      data: [
        {
          x: 29,
          y: 90,
        },
        {
          x: 39,
          y: 90,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
}

export default function Chart() {
  return <Scatter options={options} data={data} plugins={[plugin]} />
}
