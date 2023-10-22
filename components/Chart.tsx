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
      const x = left + width / 2 - image.width / 2
      const y = top + height / 2 - image.height / 2
      ctx.drawImage(image, x, y)
    } else {
      image.onload = () => chart.draw()
    }
  },
}

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  elements: {
    point: {
      pointStyle: "circle",
    },
    line: {
        borderWidth: 10,
    }
  },
}

export const data = {
  datasets: [
    {
      label: "A dataset",
      data: [
        {
          x: 10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 10,
          y: 5,
        },
        {
          x: 5,
          y: 5.5,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
}

export default function Chart() {
  return <Scatter options={options} data={data} plugins={[plugin]} />
}
