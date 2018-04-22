import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store';

class NewMessageEntry extends Component {
  constructor(){
    super()
    this.state = {
      value: 'fr'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    const { name, newMessageEntry, handleChange, handleSubmit } = this.props;
    return (
    <form id="new-message-form" onSubmit={evt => handleSubmit(name, newMessageEntry, evt, this.state.value)}>
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={newMessageEntry}
          onChange={handleChange}
          placeholder="Say something nice..."
        />
        <div class="form-group">
          <label for="exampleFormControlSelect1" className="translateLabel">Translate</label>
          <select class="form-control" value={this.state.value} onChange={this.handleChange}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="zh-Hans">Chinese</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="tr">Turkish</option>
          </select>
        </div>
      </div>
    </form>
  );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeMessage(evt.target.value));
    },
    handleSubmit (name, content, evt, language) {
      evt.preventDefault();

      const { channelId } = ownProps;

      dispatch(postMessage({ name, content, channelId, language }));
      dispatch(writeMessage(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
