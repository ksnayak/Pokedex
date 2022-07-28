import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

import Icon from '../components/Icon';
import Card from '../components/Card';

import {scale, deviceHeight} from '../configs/size';
import commonStyles from '../styles/commonStyles';
import {customColor, textColor} from '../configs/colors';

import Generation from '../assets/icons/generation.svg';
import Filter from '../assets/icons/filter.svg';
import Search from '../assets/icons/search.svg';

const pokePath = 'https://pokeapi.co/api/v2/';
const pokeQuery = 'pokemon?limit=20&offset=0.';
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

const SearchInput = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.searchInputContainer}>
      <Icon>
        <Search color={textColor.grey} />
      </Icon>
      <TextInput
        style={commonStyles.subHeading}
        placeholder="What Pokémon are you looking for?"
        placeholderTextColor={textColor.grey}
        onChangeText={text => setSearch(text)}
        value={search}
      />
    </View>
  );
};

const HomeScreen = ({navigation}) => {
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
    // console.log(pokemon),
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: deviceHeight / scale(2.5)}}
        source={require('../assets/images/Pokeball_header.png')}>
        <View style={commonStyles.container}>
          <View
            style={{
              ...commonStyles.row,
              justifyContent: 'flex-end',
              marginVertical: scale(20),
            }}>
            <Icon>
              <Generation color={textColor.black} />
            </Icon>
            <Icon>
              <Filter color={textColor.black} />
            </Icon>
          </View>
          <Text style={commonStyles.heading}>Pokédex</Text>
          <Text style={commonStyles.subHeading}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>
          <SearchInput />
        </View>
      </ImageBackground>
      <View
        style={{
          ...commonStyles.container,
          paddingBottom: scale(80),
          marginTop: scale(10),
        }}>
        <FlatList
          contentContainerStyle={{paddingBottom: scale(20)}}
          showsVerticalScrollIndicator={false}
          data={pokemon}
          renderItem={({item}) => <Card data={item} navigation={navigation} />}
          keyExtractor={item => item.name}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    ...commonStyles.row,
    marginVertical: scale(15),
    padding: scale(10),
    backgroundColor: customColor.input,
    borderRadius: scale(10),
    justifyContent: 'center',
  },
});
