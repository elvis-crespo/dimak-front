import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Logomin = ({ currentColor }) => {
  return (
    <Link to="/">
      <svg
        width="50"
        height="50"
        viewBox="0 0 2048 2048"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H2048V2048H0V0Z" fill="transparent" />
        <path
          d="M631.889 1003.66L390.178 653.598L620.776 423H1226.44L631.889 1003.66Z"
          fill={currentColor}
        />
        <path
          d="M29 1012L329.055 720.277L943.058 1626H445.744L29 1012Z"
          fill={currentColor}
        />
        <path
          d="M1065.3 1626L845.818 1300.94H1434.82C1490.97 1269.03 1516.6 1246.65 1540.39 1189.81L1601.51 906.423C1601.51 831.409 1490.38 745.282 1451.48 745.282H1029.18L1359.8 423H1757.1C1901.57 453.561 2018.26 550.801 2018.26 756.395C2018.26 961.988 1851.56 1425.96 1851.56 1425.96C1791.96 1549.1 1739.47 1589.95 1620.96 1626H1065.3Z"
          fill={currentColor}
        />
        <path
          d="M631.889 1003.66L390.178 653.598L620.776 423H1226.44L631.889 1003.66Z"
          stroke={currentColor}
          strokeWidth="5.55658"
        />
        <path
          d="M29 1012L329.055 720.277L943.058 1626H445.744L29 1012Z"
          stroke={currentColor}
          strokeWidth="5.55658"
        />
        <path
          d="M1065.3 1626L845.818 1300.94H1434.82C1490.97 1269.03 1516.6 1246.65 1540.39 1189.81L1601.51 906.423C1601.51 831.409 1490.38 745.282 1451.48 745.282H1029.18L1359.8 423H1757.1C1901.57 453.561 2018.26 550.801 2018.26 756.395C2018.26 961.988 1851.56 1425.96 1851.56 1425.96C1791.96 1549.1 1739.47 1589.95 1620.96 1626H1065.3Z"
          stroke={currentColor}
          strokeWidth="5.55658"
        />
      </svg>
    </Link>
  );
};
