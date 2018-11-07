import React from 'react';
import { Platform, View, Text } from 'react-native';
import RNGesturePassword from 'react-native-smart-gesture-password-angeloslex';
import Colors from 'src/constants/Colors';

export class GesturePassword extends React.Component {
  _calAdjustHeight() {
    // next two line copy from react-navigation-stack/dist/view/Header/Header.js
    const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

    let height = 0;
    if (this.props.hasHeader) {
      height += APPBAR_HEIGHT;
    }
    if (this.props.hasStatusBar) {
      height += STATUSBAR_HEIGHT;
    }
    return height;
  }

  _renderDescription = () => {
    return (
      <View style={{ paddingBottom: 10, paddingLeft: 40, paddingRight: 40, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 14,
            marginVertical: 6,
            color: this.props.isWarning ? Colors.error : Colors.primary,
          }}>{this.props.isWarning ? this.props.warningMessage : this.props.message}</Text>
        {this.props.desc && (<Text>{this.props.desc}</Text>)}
      </View>
    );
  };

  render() {
    return <RNGesturePassword
      style={{ paddingTop: this._calAdjustHeight() + this.props.paddingTop, marginTop: -1 * this._calAdjustHeight() }}
      pointBackgroundColor={'#F4F4F4'}
      color={'#A9A9A9'}
      activeColor={Colors.primary}
      warningColor={Colors.error}
      warningDuration={1500}
      allowCross={true}
      topComponent={this._renderDescription()}
      isWarning={this.props.isWarning}
      onStart={this.props.onStart}
      onFinish={this.props.onFinish}
    />;
  }
}