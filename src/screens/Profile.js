import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function Profile({ route }) {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  useEffect(() => {
    fetchPokemonDetails(pokemon.id);
  }, [pokemon.id]);

  if (!pokemonDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerPokemon}>
        <Text style={styles.title}>{pokemonDetails.name}</Text>
        <Text style={styles.info}>Id: {pokemonDetails.id}</Text>
        <Text style={styles.info}>Tipo: {pokemonDetails.types.map((type) => type.type.name).join(', ')}</Text>
        <Text style={styles.info}>
          Habilidades: {pokemonDetails.abilities.map((ability) => ability.ability.name).join(', ')}
        </Text>
        <Text style={styles.info}>Altura: {pokemonDetails.height} dm</Text>
        <Text style={styles.info}>Peso: {pokemonDetails.weight} hg</Text>
        <View style={styles.containerPokeData}>
          <Image source={{ uri: pokemonDetails.sprites.front_default }} style={styles.image} />
          <FlatList
            data={pokemonDetails.stats}
            keyExtractor={(stat, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.stats}>
                {item.stat.name}: {item.base_stat}
              </Text>
            )}
          />
        </View>
        <Text style={styles.info}>
          Movimientos:{' '}
          {pokemonDetails.moves
            .slice(0, 5)
            .map((move) => move.move.name)
            .join(', ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E6E6FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Cochin',
  },
  containerPokemon: {
    margin: 20,
    padding: 10,
    backgroundColor: '#F5F5DC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Cochin',
  },
  containerPokeData: {
    margin: 5,
    flexDirection: 'row',
    textAlign: 'center',
    height: 'auto',
    width: 'auto',
  },
  stats: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Cochin',
  },
});
