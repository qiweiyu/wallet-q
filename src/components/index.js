import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Styles from 'src/styles';
import Colors from 'src/constants/Colors';
import { MonoText } from './StyledText';

export class Container extends React.Component {
  render() {
    return <View {...this.props} style={[this.props.style, Styles.common.container]}/>;
  }
}

export class BigButton extends React.Component {
  render() {
    let color = '';
    switch (this.props.type) {
      case 'warning':
        color = 'warning';
        break;
      case 'danger':
        color = 'danger';
        break;
      default:
        color = 'primary';
    }
    return <View style={Styles.common.buttonContainer}>
      <TouchableOpacity style={[Styles.common.button, { backgroundColor: Colors[color] }]} onPress={
        this.props.onPress ? this.props.onPress : () => {
        }
      }>
        <MonoText style={Styles.common.buttonText}>{this.props.children}</MonoText>
      </TouchableOpacity>
    </View>;
  }
}

export { MonoText };