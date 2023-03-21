import { styled } from "@mui/material";

const GradientContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: -1,
  overflow: 'hidden',
}));

export default function BackgroundGradient() {
  return (
    <GradientContainer draggable={false}>
      <svg width="1001" height="860" viewBox="0 0 1001 860" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_311_73)">
          <path d="M1485 228.5C1485 466.811 1197.56 660 842.998 660C488.431 660 200.998 466.811 200.998 228.5C200.998 -9.81088 488.431 -203 842.998 -203C1197.56 -203 1485 -9.81088 1485 228.5Z" fill="url(#paint0_linear_311_73)" fillOpacity="0.13" />
        </g>
        <defs>
          <filter id="filter0_f_311_73" x="0.997803" y="-403" width="1684" height="1263" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_311_73" />
          </filter>
          <linearGradient id="paint0_linear_311_73" x1="1174.8" y1="110.059" x2="958.26" y2="624.565" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C2FF" />
            <stop offset="1" stopColor="#00C2FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </GradientContainer>
  );
}