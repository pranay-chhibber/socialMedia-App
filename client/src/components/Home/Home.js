import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  // const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState('')
  
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

    const handleKeyPress = (e) =>{
      if(e.keyCode === 13){
        //@ search post
      } 
    }
    const handleAdd = (tag) => setTags([...tags,tags])
    
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag)=>tag !== tagToDelete))
    
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          fy="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="Search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
              />
              <ChipInput 
              style={{margin: '10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant='outlined'
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
