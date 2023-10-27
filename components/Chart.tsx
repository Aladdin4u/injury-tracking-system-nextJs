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
  image = new window.Image()
  image.src =
    "https://github.com/Aladdin4u/injury-tracking-system-nextJs/assets/101972392/1d20cce2-7c58-4841-85df-107e80295f8e"
}

export const plugin = {
  id: "customCanvasBackgroundImage",
  beforeDraw: (chart: any) => {
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

export const data = {
  labels: [
    "Face",
    "Right Jaw",
    "Left Jaw",
    "Right Chest/Breast",
    "Left Chest/Breast",
    "Right Upper Arm",
    "left Upper Arm",
    "Right Elbow",
    "Left Elbow",
    "Right Lower Arm",
    "Left Upper Arm",
    "Right Wrist/Hand",
    "Left Wrist/Hand",
    "Abdomen",
    "Pelvis",
    "Right Groin",
    "Left Groin",
    "Right Upper Leg",
    "Left Upper Leg",
    "Right Knee",
    "Left Knee",
    "Right Lower Leg",
    "Left Lower Leg",
    "Right Ankle/Foot",
    "Left Ankle/Foot",
    "Head",
    "Neck",
    "Left Shoulder",
    "Right Shoulder",
    "Upper Back",
    "Lower Back",
    "Right Hip",
    "Left Hip",
    "Left Buttocks",
    "Right Buttocks",
  ],
  datasets: [
    {
      label: "Body Map Injury",
      data: [
        {
          x: 28.7,
          y: 90,
        },
        {
          x: 26,
          y: 86,
        },
        {
          x: 31.2,
          y: 86,
        },
        {
          x: 25,
          y: 70,
        },
        {
          x: 33,
          y: 70,
        },
        {
          x: 17,
          y: 70,
        },
        {
          x: 40,
          y: 70,
        },
        {
          x: 17,
          y: 60,
        },
        {
          x: 40,
          y: 60,
        },
        {
          x: 16,
          y: 55,
        },
        {
          x: 41,
          y: 55,
        },
        {
          x: 15,
          y: 50,
        },
        {
          x: 42,
          y: 50,
        },
        {
          x: 28.7,
          y: 56,
        },
        {
          x: 28.7,
          y: 50,
        },
        {
          x: 24,
          y: 49,
        },
        {
          x: 33,
          y: 49,
        },
        {
          x: 24,
          y: 40,
        },
        {
          x: 33,
          y: 40,
        },
        {
          x: 25,
          y: 30,
        },
        {
          x: 32,
          y: 30,
        },
        {
          x: 26,
          y: 20,
        },
        {
          x: 32,
          y: 20,
        },
        {
          x: 26,
          y: 10,
        },
        {
          x: 31,
          y: 10,
        },
        {
          x: 71.2,
          y: 90,
        },
        {
          x: 71.2,
          y: 80,
        },
        {
          x: 60,
          y: 70,
        },
        {
          x: 82,
          y: 70,
        },
        {
          x: 71.2,
          y: 70,
        },
        {
          x: 71.2,
          y: 59,
        },
        {
          x: 66,
          y: 56,
        },
        {
          x: 76,
          y: 56,
        },
        {
          x: 67,
          y: 47,
        },
        {
          x: 76,
          y: 47,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
}


const Chart = (props:any) => {
  return <Scatter options={props.options} data={data} plugins={[plugin]} />
}

export default Chart
