import React, { Component } from 'react';
import axios from 'axios';

const users = [
    "showashidden",
    "freecodecamp",
    "quirkydev",
    "drdisrespectlive",
    "grimmmz",
    "c9sneaky",
    "shticky",
    "wyvernslayr",
    "notrealtaiikhoan",
    "notrealtaiikho"
];
const API = "https://wind-bow.glitch.me/twitch-api/";
const channels = "channels";
const streams = "streams";

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}

    }

    changeState = (channelsObj) => {
    }
    
    getChannels = () => {
        const channelsObj = {}
            users.forEach(user => {
                axios.get(API + channels + "/" + user)
                .then(res => {
                    console.log(res)
                    if (res.data.error) {
                        throw new Error(res.data.message)
                    }
                    else {
                        channelsObj[user] = { ...res.data }
                        
                        axios.get(API + streams + "/" + user)
                        .then(res => {
                            channelsObj[user] = {
                                ...channelsObj[user],
                                ...res.data,
                            }
                            
                        })
                        .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            });
    }

    componentDidMount() {
        this.getChannels();
    }
    

    render() {
        const Loading = "Loading channels..."
        for (let channel in this.state) {
            console.log(channel)
        }

        return (
            <div>
                <h1>Twitch Viewer</h1>
            </div>
        );
    }
}

export default App;