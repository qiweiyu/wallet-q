import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Layout from 'src/constants/Layout';

export default class AppLoadingScreen extends React.Component {
  componentDidMount() {
    const onStart = this.props.onStart ? this.props.onStart : () => {
      return new Promise((resolve) => {
        setTimeout(() => {resolve();}, 3000);
      })
    };
    const onFinish = this.props.onFinish ? this.props.onFinish : () => {};
    const loadingRes = onStart();
    if (loadingRes instanceof Promise) {
      loadingRes.then((res) => {
        onFinish(res);
      });
    } else {
      onFinish(loadingRes);
    }
  }

  render() {
    return (
      <View>
        <Image
          source={
            require('assets/images/splash.png')
          }
          style={styles.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    width: Layout.window.width,
    height: Layout.window.height,
    resizeMode: 'cover',
  },
});