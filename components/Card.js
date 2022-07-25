import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import commonStyles from '../styles/commonStyles';
import {deviceWidth, scale} from '../configs/size';
import {backgroundColors} from '../configs/colors';

const Card = ({data}) => {
  const type = data.types[0].type.name;
  return (
    <View style={{...styles.card, backgroundColor: backgroundColors[type]}}>
      <View style={{padding: 15, paddingRight: 0, width: deviceWidth / 1.8}}>
        <View style={{position: 'absolute', top: 5, right: 0}}>
          <Image
            source={require('../assets/images/dotsCard.png')}
            style={{width: scale(100), height: scale(40)}}
          />
        </View>

        <Text style={commonStyles.number}># {data.id}</Text>
        <Text style={commonStyles.title}>{data.name}</Text>
        {data.types.map((type, index) => (
          <Text key={index} style={commonStyles.subHeading}>
            {type.type.name}
          </Text>
        ))}
      </View>
      <ImageBackground
        source={require('../assets/images/Pokeball_card.png')}
        resizeMode="contain"
        style={styles.imageBackground}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.sprites.front_default}}
            style={styles.image}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: scale(12),
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: scale(150),
    height: scale(130),
    paddingRight: scale(10),
  },
  imageContainer: {
    marginTop: scale(-10),
    marginLeft: scale(-10),
  },
  image: {
    width: scale(170),
    height: scale(130),
  },
});
