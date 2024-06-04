import styled from "styled-components";
import { baseText, lightPrimary, primaryText } from "../../BaseStyle";

export const Base = `
    ${baseText} 
    ${primaryText};  
    font-size: 1rem;    
    padding: 2%; 
`;
export const Container = styled.div`
    width: 70%;
    min-width: 400px;
    box-shadow: 0px 2px 4px ${lightPrimary};
    margin: 4% auto;
    border-radius: 1em;
`;
export const ContainerRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2% auto;
    padding: 2% 0;
    align-items: center;
`;
export const Block = styled.div`
    display: flex;
    padding: 0 0 2% 0;
`;
export const InfoContainer = styled.div`
    display: flex;
    width: 50%;
    padding: 0 4%;
    flex-direction: column;
    justify-content: space-between;
`;
export const Title = styled.div`
    ${Base};
    font-size: 1.5rem;
    width: 45%;
    padding: 2% 4%;
    border-bottom: 0.1em solid ${lightPrimary};
`;
export const InfoRow = styled.div`
    display: flex;
    margin: 1% 0;
    flex-wrap: wrap;
`;
export const CommentBlock = styled.div`
    margin: 3% 0;
`;
export const Parameter = styled.div`
    background-color: ${lightPrimary};
    ${Base};
    width: 10rem;
    height: 2.25rem;
    justify-content: center;
    margin: 1%;
    display: flex;
    align-items: center;
`;
export const BookingText = styled.div`
    ${Base};
    padding: 3% 2% 2% 2%;
    display: flex;
    align-items: center;
    width: 10rem;
    height: 2.25rem;
`;
export const CommentText = styled.div`
    ${Base};
    display: flex;
    align-items: flex-end;
    margin: 3% 0;
    text-align: justify;
`;
export const Button = styled.button`
    ${Base};
    display: flex;
    align-items: center;
    padding: 3.25% 4%;
    border: 0;
    border-radius: 10em;
    width: 10rem;
    font-size: 1.125rem;
    height: 2.25rem;
    justify-content: center;
    background-color: ${lightPrimary};
    margin: 0 2%;
`;

export const TextStatusBase = styled.div`
    ${Base};
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    height: 2.25rem;
    justify-content: center;
`;

export const TextStatusParam = styled(TextStatusBase)`
    padding: 1.25% 2%;
    border: 2px solid ${lightPrimary};
    border-radius: 10em;
    width: 10rem;
`;

export const TextStatus = styled(TextStatusBase)`
    padding: 1% 2%;
    width: 5rem;
`;
