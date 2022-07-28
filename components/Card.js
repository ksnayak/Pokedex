import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Tag from './Tag';

import commonStyles from '../styles/commonStyles';
import {deviceWidth, scale} from '../configs/size';
import {backgroundColors} from '../configs/colors';

const Card = ({data, navigation}) => {
  const type = data.types[0].type.name;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {data: data})}>
      <View style={{...styles.card, backgroundColor: backgroundColors[type]}}>
        <View
          style={{
            padding: scale(15),
            paddingRight: scale(0),
            width: deviceWidth / scale(1.8),
          }}>
          <View style={{position: 'absolute', top: scale(5), right: scale(0)}}>
            <Image
              source={require('../assets/images/dotsCard.png')}
              style={{width: scale(100), height: scale(40)}}
            />
          </View>

          <Text style={[commonStyles.number, {marginVertical: scale(5)}]}>
            # {data.id}
          </Text>
          <Text style={commonStyles.title}>{data.name}</Text>
          <View style={commonStyles.row}>
            {data.types.map(type => (
              <Tag type={type.type.name} />
            ))}
          </View>
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
    </TouchableOpacity>
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
