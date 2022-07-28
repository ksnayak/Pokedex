import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {backgroundColors, colors, textColor} from '../configs/colors';
import {scale} from '../configs/size';
import commonStyles from '../styles/commonStyles';

const Property = ({name, value}) => {
  return (
    <View style={{...commonStyles.row}}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const About = ({data, speciesData}) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const type = data?.types[0]?.type.name;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 500);
  // }, []);

  return isLoaded && speciesData ? (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: scale(30),
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          {speciesData.flavor_text_entries && (
            <Text style={{...commonStyles.subHeading}}>
              {speciesData?.flavor_text_entries[0]?.flavor_text.replace(
                /(\r|\n|\r)/gm,
                ' ',
              )}
            </Text>
          )}
        </View>
        <View>
          <Text style={[styles.headerText, {color: colors[type]}]}>
            Pokédex Data
          </Text>
          <Property
            name="Species"
            value={speciesData?.genera[7]?.genus.replace(/(\r|\n|\r)/gm, ' ')}
          />
          <Property name="Height" value={`${data.height / 10} m`} />
          <Property name="Weight" value={`${data.weight / 10} kg`} />
          <Property name="Abilities" value={data.abilities[0].ability.name} />
        </View>
        <View>
          <Text style={[styles.headerText, {color: colors[type]}]}>
            Training
          </Text>
          <Property name="EV Yield" value={data.stats[0].effort} />
          <Property name="Catch Rate" value={speciesData?.capture_rate} />
          <Property name="Base Happiness" value={speciesData?.base_happiness} />
          <Property name="Base Exp" value={data.base_experience} />
          <Property name="Growth Rate" value={speciesData?.growth_rate.name} />
          <Property
            name=" Egg Groups"
            value={speciesData?.egg_groups.map(value => value.name)}
          />
        </View>
      </ScrollView>
    </View>
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={backgroundColors.steel} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.detailsContainer,
  },
  headerText: {
    fontSize: scale(16),
    fontWeight: '700',
    lineHeight: scale(19),
    marginVertical: scale(20),
  },
  nameText: {
    fontSize: scale(13),
    lineHeight: scale(14),
    fontWeight: '500',
    color: textColor.black,
    width: '40%',
  },
  valueText: {
    fontSize: scale(16),
    lineHeight: scale(19),
    fontWeight: '400',
    color: textColor.grey,
  },
});
