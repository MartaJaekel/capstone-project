import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

export default function EntryDetail({ entries }) {
  const router = useRouter();
  const { id } = router.query;

  const goBack = () => {
    router.back();
  };
  const entry = entries.find((entry) => entry.id === id);
  if (!entry) {
    return <p>Entry not found</p>;
  }

  return (
    <StyledMain>
      <StyledBackButton type="button" aria-label="Go Back" onClick={goBack}>
        <Image src="/assets/ArrowIcon.svg" alt="Back Link" width={25} height={20} />
      </StyledBackButton>
        <StyledImage
          src={entry.url}
          width={375}
          height={357}
          alt={entry.name}
        />
        <StyledArticle>
          <StyledName lang="en">{entry.name}</StyledName>
          <StyledDescription>Description</StyledDescription>
          <StyledParagraph>{entry.description}</StyledParagraph>
          <StyledDescription>Care Tips</StyledDescription>
          <StyledParagraph>{entry.careTipps}</StyledParagraph>
          <StyledDescription>Location</StyledDescription>
          <StyledParagraph>{entry.location}</StyledParagraph>
        </StyledArticle>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  position: relative;
  
  @media (min-width: 1024px) {
    display: flex;
    max-width: 90rem;
    margin: 0 auto;
  }
`;
const StyledBackButton = styled.button`
  position: absolute;
  top: 1.75rem;
  left: 1rem;
  background-color: ${({ theme }) => theme.primaryGreen};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  border: none;
`;
const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  
  @media (min-width: 1024px) {
    width: 60%;
    height: 51.6rem;
  }
`;
const StyledName = styled.h1`
  font-family: serif;
  font-size: 2rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.formText};
  margin: 0;
  hyphens: auto;
`;

const StyledArticle = styled.article`
  padding: 1rem 2rem 6rem 2rem;
`;

const StyledDescription = styled.h3`
  color: ${({ theme }) => theme.infoText};
  margin:0;
  padding: 1.5rem 0 0.5rem 0;
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.infoText};
  margin: 0;
  padding-bottom: 1rem;
  &:not(:last-child)  {
    border-bottom: 2px solid ${({ theme }) => theme.divider};
  }
`;
