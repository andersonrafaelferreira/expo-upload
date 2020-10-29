import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import api from './src/services/api';

export default function App() {

  useEffect(()=>{

    async function carrega() {
      
      const result = await api.get('/');
      console.log(result, "o resultado");
    }
    carrega();

  },[])

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("rafael");
  const [latitude, setLatitude] = useState(-23.3830548);
  const [longitude, setLongitude] = useState(-48.5520659);
  const [about, setAbout] = useState("sobre");
  const [instructions, setInstructions] = useState("instrucoes");
  const [opening_hours, setOpeningJours] = useState("das 7 as 17");
  const [open_on_weekends, setOpenOnWeekends] = useState("true");

  async function handleSelectImage() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality:0.3,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    const { uri } = result;

    const novaImagem = {
      filename: String(Date.now()),
      type: "image/jpg",
      uri: result.uri
    };

    setPreview(result.uri);
    setImage(novaImagem);

    console.log(novaImagem, "image saved");

  }

  async function handleSubmit() {
      console.log("submit?");
      const data = new FormData();

      data.append('image', image);

      try {
        const result = await api.post('image', data);
        console.log(result);
      } catch (error) {
        console.log(error);
      }

      
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
        <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        { preview && <Image style={styles.preview} source={{uri: preview}} /> }

        {/* <TextInput 
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={name}
          onChangeText={name => setName(name)}
        />
        
        <TextInput 
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={about}
          onChangeText={about => setAbout(about)}
        />
        
        <TextInput 
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={instructions}
          onChangeText={instructions => setInstructions(instructions)}
        />
        
        <TextInput 
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={opening_hours}
          onChangeText={opening_hours => setOpeningHours(opening_hours)}
        /> */}

        <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16
  },
  shareButton:{
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  }
});
