import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

import Icon from '../components/Icon';
import Card from '../components/Card';

import {scale, deviceHeight} from '../configs/size';
import commonStyles from '../styles/commonStyles';
import {textColor} from '../configs/colors';

// import Generation from '../assets/icons/generation.svg';
import Generation from '../assets/icons/generation.svg';
import Filter from '../assets/icons/filter.svg';

const pokePath = 'https://pokeapi.co/api/v2/';
const pokeQuery = 'pokemon?limit=20&offset=0.';
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

const HomeScreen = () => {
  const [pokemonUrl, setPokemonUrl] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonDataIdsResponse = await fetch(firstGenPokemonPath);
      const pokemonIdsBody = await pokemonDataIdsResponse.json();

      const fetchPokemonDetails = await Promise.all(
        pokemonIdsBody.results.map(async pokemon => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          return await pokemonDetailsResponse.json();
        }),
      );
      setPokemon(fetchPokemonDetails);
    };
    fetchData();
  }, []);

  return (
    console.log(pokemon),
    (
      <>
        <ImageBackground
          resizeMode="contain"
          style={{width: '100%', height: deviceHeight / 4}}
          source={require('../assets/images/Pokeball_header.png')}>
          <View style={commonStyles.container}>
            <View
              style={{
                ...commonStyles.row,
                justifyContent: 'flex-end',
                marginVertical: 20,
              }}>
              <Icon>
                {/* <Generation /> */}
                <Filter />
              </Icon>
            </View>
            <Text style={commonStyles.heading}>Pokédex</Text>
            <Text style={commonStyles.subHeading}>
              Search for Pokémon by name or using the National Pokédex number.
            </Text>
          </View>
        </ImageBackground>
        <View>
          <FlatList
            data={pokemon}
            renderItem={({item}) => <Card data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    )
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
