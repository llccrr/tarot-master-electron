import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360
  }
};

class PureSelectableList extends React.Component {
  state = {
    checked: []
  };

  handleToggle = item => () => {
    const { checked } = this.state;
    const { onChange } = this.props;

    const currentIndex = checked.findIndex(it => it._id === item._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange(newChecked);
    console.log(newChecked);
    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { items, renderRowContent } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <List>
          {items.map(item => (
            <ListItem
              key={item._id}
              dense
              button
              onClick={this.handleToggle(item)}
            >
              <Checkbox
                checked={!!~checked.findIndex(it => it._id === item._id)}
                tabIndex={-1}
                disableRipple
              />
              {renderRowContent(item)}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

PureSelectableList.defaultProps = {
  onChange: null
};

PureSelectableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRowContent: PropTypes.func.isRequired,
  onChange: PropTypes.func
};

export const SelectableList = withStyles(styles)(PureSelectableList);
