import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;`; 
  
export const Converter = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width:40%;
padding: 20px;
border: 1px solid #000;
gap: 20px;
width: 40%;
border-radius: 10px
`;

export const ConvertorHeading = styled.h1`
margin: 0;
padding: 0;
font-size: 24px;`

export const StyledForm = styled.form`    
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
width: 100%;
`;

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    `;

    export const ResultHeader = styled.p`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    margin: 0;
    `;

    export const Result = styled.p`
    height: 19px;
    margin: 0;
    border: 1px solid #767676;
    font-size: 14px;
    padding: 0 2px;
    `