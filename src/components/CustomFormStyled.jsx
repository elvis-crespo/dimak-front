// export default ReusableForm;
import styled from "styled-components";
import { themeTypography } from "../utils/themes";

export const Container = styled.div`
  // position: relative;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  // max-width: 64rem;
  min-width: 100vw;
  min-height: 100vh;
  flex: 1;
  // margin-left: auto;
  // margin-right: auto;
  scroll-margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // width: 100%;
  // height: 100%;
  --s: 37px; /* control the size */
  --c: #0000, ${({ theme }) => theme.bgContainer} 0.5deg 119.5deg, #0000 120deg;
  --g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
  --g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
  --g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));
  background: var(--g1), var(--g1) var(--s) calc(1.73 * var(--s)), var(--g2),
    var(--g2) var(--s) calc(1.73 * var(--s)), var(--g3) var(--s) 0,
    var(--g3) 0 calc(1.73 * var(--s)) ${({ theme }) => theme.bgContainer2};
  background-size: calc(2 * var(--s)) calc(3.46 * var(--s));

  // content: "";
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-image: radial-gradient(
  //   rgba(255, 255, 255, 0.171) 2px,
  //   transparent 0
  // );

  // width: 100%;
  // height: 100%;
  // /* Add your background pattern here */
  // background-color: #313131;
  // background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  // background-size: 30px 30px;
  // background-position: -5px -5px
  // background-size: 30px 30px;

  // width: 100%;
  // height: 100%;
  // /* Add your background pattern here */
  // background-color:rgb(219, 219, 219);
  // background-image: radial-gradient(rgba(0, 0, 0, 0.17) 2px, transparent 0);
  // background-size: 30px 30px;
  // background-position: -5px -5px
  // background-size: 30px 30px;

  // width: 100%;
  // height: 100%;
  // /* Add your background pattern here */
  // background-color:${({ theme }) => theme.bgContainer};
  // background-image: radial-gradient(${({ theme }) =>
    theme.bgContainer2} 2px, transparent 0);
  // background-size: 30px 30px;
  // background-position: -5px -5px
  // background-size: 30px 30px;
`;
export const ResponsiveContainerCard = styled(Container)`
  justify-content: space-evenly;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 920px) {
    flex-direction: column;
  }

  @media (max-width: 570px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bgForm};
  border-radius: 10px;
  border: 0px solid #fff;
  inline-size: 100%;
  font-family: ${themeTypography.fontFamily};
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgb(0 0 0 / 32%);
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: ${themeTypography.fontFamily};
  color: ${({ theme }) => theme.text};
  line-height: 1.3em;
  font-weight: 500;
  font-size: clamp(1.8rem, 1.2rem, 1rem);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

export const SectionTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  // background-color: #cce7ff;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bgSubtitle};
  color: white;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: ${themeTypography.fontFamily};
`;

export const FormField = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  line-height: 1.3em;
  font-weight: 500;
  margin-bottom: 0px;
  color: ${({ theme }) => theme.labelForm};
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.inputForm};

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const InputFile = styled(Input)`
  color: #000;
`;
// const FormField = styled.div`
//   padding-top: 6px;
//   padding-bottom: 6px;
//   border-width: 2px;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const Label = styled.label`
//   font-size: 1rem;
//   line-height: 1.3em;
//   font-weight: 500;
//   margin-bottom: 0px;
//   color: rgb(35, 36, 38);
// `;

// const Input = styled.input`
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 5px;

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
//   }
// `;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.inputForm};

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  word-break: break-word;
  background-color: ${({ theme }) => theme.inputForm};

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
