import styled from "styled-components";
import { background, lightPrimary, primary, secondaryText } from "../BaseStyle";

export const Ico2 = styled.img`
    width: 40px;
    height: 40px;
    margin: auto 0;
    background-color: ${lightPrimary};
`;
export const Container = styled.div`
    background-color: ${lightPrimary};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
export const HeaderRow = styled.div`
    display: flex;
    width: 55%;
    margin: 2% auto;
`;
export const ReviewTextContainer = styled.div`
    width: 65%;
    margin: 2%;
`;
export const Plus = styled.img`
    width: 60px;
    height: 60px;
    margin: auto 0;
    background-color: ${primary};
`;
export const AddRating = styled.p`
    margin-right: 2%;
    margin-left: auto;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    text-align: center;
    ${secondaryText};
    font-size: 1.5rem;
`;
export const HSecondary = styled.p`
    ${secondaryText};
    font-size: 2.25rem;
    margin: 2% 0;
`;
export const ReviewContainer = styled.div`
    background-color: ${background};
    width: 55%;
    margin: 2% auto;
    display: flex;
    padding: 0 2%;
    border-left: 3px solid ${primary};
    border-radius: 0.25em;
`;
export const HeaderRowReview = styled.div`
    display: flex;
`;
export const CommentReview = styled.p`
    ${secondaryText};
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 0%;
`;
export const Content = styled.p`
    margin-top: 0;
`;
export const Photo = styled.img`
    background-color: ${primary};
    width: 14em;
    height: 12em;
    margin: auto;
`;
