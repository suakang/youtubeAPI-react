import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from '../api/youtube';

const KEY = 'AIzaSyC3a-BQ6GrkFsVW6LqJOjZU8TiSNf8Fp0Y';

class App extends React.Component {
  // 2. Initialize state
  state = { videos: [], selectedVideo: null };

  // make a default search when app component first is rendered
  componentDidMount() {
    this.onTermSubmit('baby')
  }

  onTermSubmit = async term => {

    // 1. ASYNC API REQUEST
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        key: KEY
      }
    });

    console.log(response);
    // response.data.items
    this.setState({ 
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    })
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video })
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList 
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
