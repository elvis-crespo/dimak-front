import styled, { keyframes } from "styled-components";

const opacityAnimation = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const outAnimation = keyframes`
  0% { r: 1; opacity: 0.9; }
  25% { r: 10; opacity: 0.5; }
  50% { r: 20; opacity: 0.3; }
  75% { r: 30; opacity: 0.1; }
  100% { r: 40; opacity: 0; }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.bgContainer};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.hover};
  font-size: 24px;
  padding-bottom: 20px;
  &:before,
  &:after {
    content: "[";
    color: ${({ theme }) => theme.hover};
    font-size: 20px;
    animation: ${opacityAnimation} 2s infinite;
    margin: 0 10px;
  }
  &:after {
    content: "]";
  }
`;

const Svg = styled.svg`
  width: 80vw;
  // max-width: 600px;
  min-width: 100vw;
  height: auto;
  fill: ${({ theme }) => theme.hover};
  text {
    fill: ${({ theme }) => theme.hover};
  }
`;

const Circle = styled.circle`
  animation: ${outAnimation} 2s infinite ease-out;
  fill: ${({ theme }) => theme.hover};
`;

const RotatingEllipse = styled.ellipse`
  cx: 100;
  cy: 50;
  rx: 20; /* Reducido */
  ry: 30; /* Reducido */
  fill: transparent;
  stroke: ${({ theme }) => theme.hover};
  stroke-width: 6;
  animation: ${rotateAnimation} 7s linear infinite;
`;

export default function NotFound() {
  return (
    <Container>
      <Svg viewBox="0 0 200 100">
        <g>
          <text x="20" y="85" fontSize="83px" fill="#ff5757">
            4
          </text>
          <text x="140" y="85" fontSize="83px" fill="#ff5757">
            4
          </text>
        </g>
        <g>
          <RotatingEllipse />
          <Circle cx="100" cy="50" r="1" />
        </g>
      </Svg>
      <Message>¡Oops! Página no encontrada</Message>
      <Message>La página que buscas no existe o fue eliminada.</Message>
    </Container>
  );
}
