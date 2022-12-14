import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API,Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  Image,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";
import "./Pictures.css"
const Pictures = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }
  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <View as="form" margin="3rem 0" onSubmit={createNote}>
      
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Course Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Date"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
            type='date'
          />
          <View
  name="image"
  as="input"
  type="file"
  style={{ alignSelf: "end" }}
/>
          <Button type="submit" variation="primary">
            Upload Image
          </Button>
        </Flex>
      </View>
      <Heading className='my-uploads' level={2}>My Uploads</Heading>
      <View margin="3rem 0" className='map-view'>
      {notes.map((note) => (
  <Flex
    key={note.id || note.name}
    direction="row"
    justifyContent="center"
    alignItems="center"
  >
    <Text className='text-in-map' as="strong" fontWeight={700}>
      {note.name}
    </Text>
    <Text className='text-in-map' as="span">{note.description}</Text>
    {note.image && (
      <Image
        src={note.image}
        alt={`visual aid for ${notes.name}`}
        style={{ width: 200,height:200,margin: 50}}
      />
    )}
    <Button className='delete-btn' variation="link" onClick={() => deleteNote(note)}>
      Delete Image
    </Button>
  </Flex>
))}
      </View>
    </View>
  );
};

export default withAuthenticator(Pictures);