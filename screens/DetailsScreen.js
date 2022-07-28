import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {Tab, TabView} from '@rneui/themed';

import About from './About';
import Evolution from './Evolution';
import Stats from './Stats';

import Dots from '../assets/images/dots.svg';
import Tag from '../components/Tag';
import commonStyles from '../styles/commonStyles';
import {backgroundColors} from '../configs/colors';
import {scale} from '../configs/size';

const DetailsScreen = ({route}) => {
  const [index, setIndex] = useState(0);
  const [speciesData, setSpeciesData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const data = route?.params?.data;
  const id = data?.id;
  const type = data?.types[0]?.type.name;
  // console.log('id', id);
  // console.log(data);\
  // console.log('speciesData', speciesData);

  const fetchSpeciesData = async () => {
    const speciesDataResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const speciesDataBody = await speciesDataResponse.json();
    setSpeciesData(speciesDataBody);
  };

  const pokemonDetails = async () => {
    const pokemonDetailsResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    const pokemonDetailsBody = await pokemonDetailsResponse.json();
    setPokemonData(pokemonDetailsBody);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    fetchSpeciesData();
    pokemonDetails();
  }, []);

  return isLoaded ? (
    <View
      style={[
        styles.detailsScreenContainer,
        {backgroundColor: backgroundColors[type]},
      ]}>
      <View style={styles.headerContainer}>
        <View style={{...commonStyles.row, flex: scale(1)}}>
          <Image
            source={{uri: data.sprites.front_default}}
            resizeMode="contain"
            style={styles.image}
          />
          <View>
            <Text style={commonStyles.number}># {data.id}</Text>
            <Text style={commonStyles.title}>{data.name}</Text>
            <View style={commonStyles.row}>
              {data.types.map(type => (
                <Tag type={type.type.name} />
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: scale(3),
            right: scale(0),
          }}>
          <Dots />
        </View>
      </View>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'transparent',
        }}>
        <Tab.Item
          title="About"
          titleStyle={{
            fontSize: scale(12),
            color: 'white',
            opacity: index === 0 ? 1 : 0.5,
          }}
          containerStyle={{backgroundColor: backgroundColors[type]}}
        />
        <Tab.Item
          title="Stats"
          titleStyle={{
            fontSize: scale(12),
            color: 'white',
            opacity: index === 1 ? 1 : 0.5,
          }}
          containerStyle={{backgroundColor: backgroundColors[type]}}
        />
        <Tab.Item
          title="Evolution"
          titleStyle={{
            fontSize: scale(12),
            color: 'white',
            opacity: index === 2 ? 1 : 0.5,
          }}
          containerStyle={{backgroundColor: backgroundColors[type]}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{flex: scale(1)}}>
          <About speciesData={speciesData} data={data} />
        </TabView.Item>
        <TabView.Item style={{flex: scale(1)}}>
          <Stats index={index} pokemonData={pokemonData} data={data} />
        </TabView.Item>
        <TabView.Item style={{flex: scale(1)}}>
          <Evolution />
        </TabView.Item>
      </TabView>
    </View>
  ) : (
    isLoaded === false && (
      <View style={[styles.detailsScreenContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  detailsScreenContainer: {
    flex: scale(1),
  },
  headerContainer: {
    flex: scale(0.5),
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '50%',
    height: '100%',
  },
});
