import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { hashAvatar } from 'src/utils/encrypt';
import utils from 'src/utils';

export class AddressAvatar extends React.Component {
  render() {
    return <Image
      {...this.props}
      style={[this.props.style, styles.avatar]}
      source={{ uri: hashAvatar(this.props.address) }}/>;
  }
}

export class AddressTitle extends React.Component {
  render() {
    return (
      <View style={styles.titleContainer}>
        <AddressAvatar address={this.props.address}/>
        <Text style={styles.titleAddress}>{utils.wallet.shortAddress(this.props.address)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  titleAddress: {
    fontSize: 16,
  },
});