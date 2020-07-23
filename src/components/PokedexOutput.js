import React, { useContext } from "react";
import {
  Segment,
  Icon,
  Grid,
  Label,
  Image,
  Header,
  Button,
} from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString } from ".";

const DexOutput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { pokeDexEntry, globalPokedexIndex } = state;

  const getEntry = async (entry) => {
    //get pokemon source url
    let entryFound = globalPokedexIndex.find((obj) => obj.pokedexId === entry);
    let dataURL = entryFound.url;
    //get pokemon data
    let entryDataFetch = await fetch(`${dataURL}`).catch((err) =>
      console.log(err)
    );

    let pokedexDataEntry = await entryDataFetch.json();
    //value return

    let name = capitalizeString(pokedexDataEntry.name);
    let id = pokedexDataEntry.id;
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let types = pokedexDataEntry.types;

    console.log(`Selected Pokemon: ( #${id}, ${name} )`);
    return { name, primarySprite, id, types };
  };

  const handlePrev = () =>
    getEntry(pokeDexEntry.id - 1)
      .then((res) => {
        dispatch({
          type: "UPDATE_POKEDEX_ENTRY",
          payload: {
            photo: res.primarySprite,
            name: res.name,
            id: res.id,
            types: res.types,
          },
        });
      })
      .catch((err) => console.log("Error @ Submit", err));

  const handleNext = () =>
    getEntry(pokeDexEntry.id + 1)
      .then((res) => {
        dispatch({
          type: "UPDATE_POKEDEX_ENTRY",
          payload: {
            photo: res.primarySprite,
            name: res.name,
            id: res.id,
            types: res.types,
          },
        });
      })
      .catch((err) => console.log("Error @ Submit", err));

  const handleRandomPokemon = () =>
    getEntry(Math.floor(Math.random() * 810))
      .then((res) => {
        dispatch({
          type: "UPDATE_POKEDEX_ENTRY",
          payload: {
            photo: res.primarySprite,
            name: res.name,
            id: res.id,
            types: res.types,
          },
        });
      })
      .catch((err) => console.log("Error @ Submit", err));

  return pokeDexEntry ? (
    <Segment inverted color="grey">
      <Label
        as="a"
        color="black"
        size="large"
        attached="top left"
        icon="random"
        content="Shuffle"
        onClick={() => handleRandomPokemon()}
      />
      <Label as="a" size="huge" color="red" ribbon="right">
        Pokédex #{pokeDexEntry.id} {pokeDexEntry.name}
      </Label>
      <Grid>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <Image
              src={pokeDexEntry.photo}
              alt="Pokemon"
              height="100%"
              width="88%"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={3}>
          {pokeDexEntry.types.map((i, k) => (
            <Grid.Column>
              <Image
                key={k}
                src={require(`../typeIcons/${i.type.name}.png`)}
                alt="A Pokemon type"
                width={"75%"}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <div style={{ marginTop: "10%" }}>
        <Label
          as="a"
          color="black"
          size="big"
          attached="bottom left"
          icon="hand point left outline"
          content="Back"
          onClick={() => handlePrev()}
        />
        <Label
          as="a"
          color="black"
          size="big"
          attached="bottom right"
          icon="hand point right outline"
          content="Next"
          onClick={() => handleNext()}
        />
      </div>
    </Segment>
  ) : (
    <Segment inverted color="grey">
      <Label
        as="a"
        color="black"
        size="large"
        attached="top left"
        icon="random"
        content="Shuffle"
        onClick={() => handleRandomPokemon()}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            {/* <Button
              onClick={() => handleRandomPokemon()}
              content="Random"
              icon="random"
              labelPosition="left"
              size="massive"
            /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default DexOutput;
