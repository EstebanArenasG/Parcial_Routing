import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemonList = async (limit = 20, offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pokemonList = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const pokemonData = await fetch(pokemon.url).then((res) => res.json());
          return {
            id: offset + index + 1,
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            url: pokemon.url,
          };
        })
      );
      setPokemonList(pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    getPokemonList(60, 0);
  }, []);

  const half = Math.floor(pokemonList.length / 2);
  const firstHalf = pokemonList.slice(0, half);
  const secondHalf = pokemonList.slice(half);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.listsContainer}>
        <View style={styles.listContainer}>
          {firstHalf.map((pokemon) => (
            <TouchableOpacity
              style={styles.pokemonContainer}
              key={pokemon.id}
              onPress={() => navigation.navigate('Información Pokemon', { pokemon })}
            >
              <Text style={styles.pokemonName}>{pokemon.name}</Text>
              <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.listContainer}>
          {secondHalf.map((pokemon) => (
            <TouchableOpacity
              style={styles.pokemonContainer}
              key={pokemon.id}
              onPress={() => navigation.navigate('Información Pokemon', { pokemon })}
            >
              <Text style={styles.pokemonName}>{pokemon.name}</Text>
              <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#98FF98',
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pokemonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F5F5DC',
    padding: 10,
    borderRadius: 10,
  },
  pokemonName: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: 'lightblue',
    width: 200,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});
