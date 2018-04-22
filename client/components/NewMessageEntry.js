import React from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store';

function NewMessageEntry (props) {

  const { name, newMessageEntry, handleChange, handleSubmit } = props;

  return (
    <form id="new-message-form" onSubmit={evt => handleSubmit(name, newMessageEntry, evt)}>
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
          <label for="exampleFormControlSelect1">translate!</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>English</option>
            <option>French</option>
            <option>Chinese</option>
            <option>German</option>
            <option>Italian</option>
            <option>Turkish</option>
          </select>
        </div>
      </div>
    </form>
  );
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
    handleSubmit (name, content, evt) {
      evt.preventDefault();

      const { channelId } = ownProps;

      dispatch(postMessage({ name, content, channelId }));
      dispatch(writeMessage(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
