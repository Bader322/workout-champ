/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
import { content as _content, plugin } from "flowbite-react/tailwind";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import withMT from "@material-tailwind/react/utils/withMT";


export default withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    _content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(),
  ],
});