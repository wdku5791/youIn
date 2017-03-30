import React from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import Sidebar from './Sidebar.jsx';
import EventShow from './EventShow.jsx';
import Chatbox from './Chatbox.jsx';
import MessageInputBox from './MessageInputBox.jsx';
import data from './../../../../server/data.js';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: data.users,
      myEvents: data.myEvents,
      friendEvents: data.friendEvents,
      currentEvent: data.myEvents[0],
      currentUser: null,
      messages: null,
      isGoing: false
    }

    this.handleSidebarEventClick = this.handleSidebarEventClick.bind(this);
    this.handleDeclineEvent = this.handleDeclineEvent.bind(this);
    this.handleAcceptEvent = this.handleAcceptEvent.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
	}

  fetchMessages() {
    $.ajax({
      url: '/messages',
      method: 'GET',
      contentType: 'application/json',
      success: data => {
        this.setState({
          messages: data
        })
      },
      error: err => {
        console.err('err', err);
      }
    });
  }

  handleDeclineEvent() {
    console.log('Declined!');
    this.setState({
      isGoing: false,
    })
  }

  handleAcceptEvent() {
    console.log('Accepted!');
    this.setState({
      isGoing: true,
      // friends: friends.push(currentUser);
    })
  }

  handleSidebarEventClick(event) {
    console.log(event);
    this.setState({
      currentEvent: event
    })
  }

  render() {
    return (
      <div>
        <div className="ui visible sidebar">
          <Sidebar myEvents={ this.state.myEvents }
            friendEvents={ this.state.friendEvents }
            handleSidebarEventClick={ this.handleSidebarEventClick }/>
        </div>
        <div className="pushable">
          <EventShow
            friends={ this.state.friends }
            event={ this.state.currentEvent }
            isGoing={ this.state.isGoing }
            handleDeclineEvent={ this.handleDeclineEvent }
            handleAcceptEvent={ this.handleAcceptEvent }
            messages={ this.state.messages }
          />
        </div>
      </div>
    );
  }
}
