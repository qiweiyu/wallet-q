import React from 'react';
import { View, Text } from 'react-native';
import RNGesturePassword from 'react-native-smart-gesture-password-angeloslex';
import Colors from 'src/constants/Colors';
import Layout from 'src/constants/Layout';

export class GesturePassword extends React.Component {
  _calAdjustHeight() {
    let height = Layout.statusBarHeight + (this.props.top ? this.props.top : 0);
    if (this.props.hasHeader) {
      height += Layout.appBarHeight;
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
    const paddingTop = this.props.paddingTop ? this.props.paddingTop : 0;
    return <RNGesturePassword
      style={{ paddingTop: this._calAdjustHeight() + paddingTop, marginTop: -1 * this._calAdjustHeight() }}
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