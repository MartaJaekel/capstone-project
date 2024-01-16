import { useRouter } from "next/router";
import styled from "styled-components";
import PlantCard from "@/components/Card";
import Headline from "@/components/Headline";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Preference({
  preferences,
  onToggleFavorite,
  favorites,
  plants,
  theme,
}) {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const goBack = () => {
    router.back();
  };

  const preference = preferences.find((preference) => preference.id === id);

  const preferencePlants = plants.filter((plant) =>
    preference?.preferencePlants.includes(plant._id)
  );

  let counterMessage;

  if (
    preference?.preferencePlants.length > 0 &&
    preference?.preferencePlants.length < plants.length
  ) {
    counterMessage = `Showing ${preference?.preferencePlants.length} of ${plants.length} plants:`;
  } else if (preference?.preferencePlants.length === plants.length) {
    counterMessage = "";
  }

  return (
    <>
      <Headline />
      {status === "authenticated" && (
        <>
          <main />
          <StyledBackButton
            type="button"
            aria-label="Go Back"
            onClick={goBack}
            status={status}
          >
            <Image
              src="/assets/ArrowIcon.svg"
              alt="Back Link"
              width={25}
              height={20}
            />
          </StyledBackButton>
          <StyledTitle status={status}>{preference?.preferenceTitle}</StyledTitle>
          <StyledCounterMessage>{counterMessage}</StyledCounterMessage>
          {preferencePlants.length === 0 ? (
            <StyledCallText>
              Sorry, unfortunately <StyledSpan>none</StyledSpan> of the plants
              matched your preferences
            </StyledCallText>
          ) : (
            <StyledPlantList>
              {preferencePlants.map((plant) => (
                <PlantCard
                  key={plant._id}
                  plant={plant}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.includes(plant._id)}
                  theme={theme}
                />
              ))}
            </StyledPlantList>
          )}
        </>
      )}
    </>
  );
}

const StyledCallText = styled.p`
  text-align: center;
  padding: 0 2rem;
`;

const StyledSpan = styled.span`
  font-family: serif;
  font-style: italic;
`;

const StyledTitle = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primaryGreen};
  word-wrap: break-word;
  padding: 0 2rem 0 2rem;
  margin-top: ${({ status }) => (status === "authenticated" ? "9rem" : "6rem")};
`;

const StyledCounterMessage = styled.p`
  margin: 1rem auto;
  max-width: 19rem;
  color: ${({ theme }) => theme.primaryGreen};
  font-weight: 600;
`;

const StyledPlantList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const StyledBackButton = styled.button`
  position: fixed;
  top: ${({ status }) => (status === "authenticated" ? "4.75rem" : "1.75rem")};
  left: 1rem;
  background-color: ${({ theme }) => theme.primaryGreen};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  z-index: 2;
  border: none;
`;
