/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";

const Path = styled.path`
  fill: ${({ customColor2 }) => customColor2} ;
  transition: all 0.3s ease;
`;
const Path2 = styled.path`
  fill: ${({ theme }) =>  theme.svgFill2};
  transition: all 0.3s ease;
`;
const Path3 = styled.path`
  fill: ${({ theme, customColor }) => customColor || theme.hover};
  transition: all 0.1s ease;
`;
export const Logo = ({ currentColor, currentColor2, currentWidth, currentHeight }) => {
  return (
    <Link to="/">
      <svg
        width={currentWidth || "150"}
        height={currentHeight || "150"}
        viewBox="0 0 1504 513"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M91 270.5L40.5 321L37 324H211C221.913 327.881 226.055 331.866 228.5 343.5L221 384.5C218.736 397.215 213.32 401.686 199.5 407H102.5L119 337.5H31.5L1 460.5H261C280.816 454.094 287.963 447.079 296 430.5L321.5 325.5C326 295.5 309.5 273.5 279.5 270.5C249.5 267.5 91 270.5 91 270.5Z"
          fill="white"
          // customColor2={currentColor2}
        />
        <Path
          d="M317 460.5L349.5 337.5H437.5L407.5 460.5H317Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path d="M453.5 274L441 322.5H353.5L365.5 274H453.5Z" fill="white" />
        <Path
          d="M570 274H486L427 512L525 465L554 359L638 465L744 384.5L723.5 465H811.5L859 274H762L643 365L570 274Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path
          d="M938 465H840.5L999.5 274H1095.5L1160 465H1071.5L1064 442H956L938 465Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path
          d="M1184 465L1230.5 274H1318.5L1271.5 465H1184Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path
          d="M1458.5 465L1357.5 318.5L1306.5 369L1373 465H1458.5Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path
          d="M1402.5 274L1366 311.5L1407 369L1502.5 274H1402.5Z"
          fill="white"
          customColor2={currentColor2}
        />
        <Path
          d="M91 270.5L40.5 321L37 324H211C221.913 327.881 226.055 331.866 228.5 343.5L221 384.5C218.736 397.215 213.32 401.686 199.5 407H102.5L119 337.5H31.5L1 460.5H261C280.816 454.094 287.963 447.079 296 430.5L321.5 325.5C326 295.5 309.5 273.5 279.5 270.5C249.5 267.5 91 270.5 91 270.5Z"
          stroke="transparent"
          customColor2={currentColor2}
        />
        <Path
          d="M317 460.5L349.5 337.5H437.5L407.5 460.5H317Z"
          stroke="transparent"
          customColor2={currentColor2}
        />
        <Path
          d="M453.5 274L441 322.5H353.5L365.5 274H453.5Z"
          stroke="transparent"
          customColor2={currentColor2}
        />
        <path
          d="M570 274H486L427 512L525 465L554 359L638 465L744 384.5L723.5 465H811.5L859 274H762L643 365L570 274Z"
          stroke="transparent"
        />
        <Path
          d="M938 465H840.5L999.5 274H1095.5L1160 465H1071.5L1064 442H956L938 465Z"
          stroke="transparent"
          customColor2={currentColor2}
        />
        <Path
          d="M1184 465L1230.5 274H1318.5L1271.5 465H1184Z"
          stroke="transparent"
        />
        <Path
          d="M1458.5 465L1357.5 318.5L1306.5 369L1373 465H1458.5Z"
          stroke="transparent"
        />
        <Path
          d="M1402.5 274L1366 311.5L1407 369L1502.5 274H1402.5Z"
          stroke="transparent"
        />
        <Path
          d="M699.76 109.603L654.552 44.1293L697.681 1H810.961L699.76 109.603Z"
          fill="black"
        />
        <Path
          d="M587 111.162L643.12 56.6005L757.958 226H664.945L587 111.162Z"
          fill="black"
        />
        <Path2
          d="M780.822 226L739.771 165.203H849.933C860.435 159.236 865.23 155.049 869.679 144.418L881.111 91.4157C881.111 77.3857 860.326 61.2771 853.051 61.2771H774.067L835.903 1H910.21C937.231 6.71594 959.055 24.903 959.055 63.3557C959.055 101.808 927.878 188.587 927.878 188.587C916.73 211.617 906.913 219.257 884.748 226H780.822Z"
          fill="black"
        />
        <Path2
          d="M699.76 109.603L654.552 44.1293L697.681 1H810.961L699.76 109.603Z"
          stroke="transparent"
          strokeWidth="1.03926"
        />
        <Path2
          d="M587 111.162L643.12 56.6005L757.958 226H664.945L587 111.162Z"
          stroke="transparent"
          strokeWidth="1.03926"
        />
        <Path2
          d="M780.822 226L739.771 165.203H849.933C860.435 159.236 865.23 155.049 869.679 144.418L881.111 91.4157C881.111 77.3857 860.326 61.2771 853.051 61.2771H774.067L835.903 1H910.21C937.231 6.71594 959.055 24.903 959.055 63.3557C959.055 101.808 927.878 188.587 927.878 188.587C916.73 211.617 906.913 219.257 884.748 226H780.822Z"
          stroke="transparent"
          strokeWidth="1.03926"
        />
        <Path3
          d="M1042.5 391.5H997L1029.5 345L1042.5 391.5Z"
          stroke="transparent"
          customColor={currentColor}
        />
      </svg>
    </Link>
  );
};
