/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Blue-500
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "#374151",
            a: {
              color: "#3B82F6",
              "&:hover": {
                color: "#2563EB",
              },
            },
            h1: {
              color: "#1F2937",
              fontWeight: "700",
            },
            h2: {
              color: "#1F2937",
              fontWeight: "700",
            },
            h3: {
              color: "#1F2937",
              fontWeight: "600",
            },
            h4: {
              color: "#1F2937",
              fontWeight: "600",
            },
            blockquote: {
              color: "#4B5563",
              borderLeftColor: "#3B82F6",
            },
            code: {
              color: "#111827",
              backgroundColor: "#F3F4F6",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            pre: {
              backgroundColor: "#1F2937",
              color: "#F9FAFB",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
