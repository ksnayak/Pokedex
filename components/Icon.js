import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import Bug from '../assets/icons/bug.svg';
import Dark from '../assets/icons/dark.svg';
import Dragon from '../assets/icons/dragon.svg';
import Electric from '../assets/icons/electric.svg';
import Fairy from '../assets/icons/fairy.svg';
import Fighting from '../assets/icons/fighting.svg';
import Fire from '../assets/icons/fire.svg';
import Flying from '../assets/icons/flying.svg';
import Ghost from '../assets/icons/ghost.svg';
import Grass from '../assets/icons/grass.svg';
import Ground from '../assets/icons/ground.svg';
import Ice from '../assets/icons/ice.svg';
import Normal from '../assets/icons/normal.svg';
import Poison from '../assets/icons/poison.svg';
import Psychic from '../assets/icons/psychic.svg';
import Rock from '../assets/icons/rock.svg';
import Steel from '../assets/icons/steel.svg';
import Water from '../assets/icons/water.svg';

import {textColor} from '../configs/colors';
import {scale} from '../configs/size';

const Icon = ({children, onPress, name, style, width, height, ...props}) => {
  let RenderIcon = name;
  switch (name) {
    case 'bug':
      RenderIcon = Bug;
      break;
    case 'dark':
      RenderIcon = Dark;
      break;
    case 'dragon':
      RenderIcon = Dragon;
      break;
    case 'electric':
      RenderIcon = Electric;
      break;
    case 'fairy':
      RenderIcon = Fairy;
      break;
    case 'fighting':
      RenderIcon = Fighting;
      break;
    case 'fire':
      RenderIcon = Fire;
      break;
    case 'flying':
      RenderIcon = Flying;
      break;
    case 'ghost':
      RenderIcon = Ghost;
      break;
    case 'grass':
      RenderIcon = Grass;
      break;
    case 'ground':
      RenderIcon = Ground;
      break;
    case 'ice':
      RenderIcon = Ice;
      break;
    case 'normal':
      RenderIcon = Normal;
      break;
    case 'poison':
      RenderIcon = Poison;
      break;
    case 'psychic':
      RenderIcon = Psychic;
      break;
    case 'rock':
      RenderIcon = Rock;
      break;
    case 'steel':
      RenderIcon = Steel;
      break;
    case 'water':
      RenderIcon = Water;
      break;
  }
  return (
    <View style={{...styles.icon, ...style}}>
      <TouchableWithoutFeedback onPress={onPress}>
        {name ? (
          <RenderIcon height={height} width={width} color={textColor.white} />
        ) : (
          children
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: scale(10),
  },
});
