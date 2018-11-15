import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import i18n from 'src/i18n';

export class LoadingMore extends React.Component {
  render() {
    if (this.props.noMore) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>--- {i18n.t('components.loadingMore.noMore')} ---</Text>
        </View>
      );
    } else if (this.props.onLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={'large'}/>
        </View>);
    } else if (this.props.showEmpty) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>--- {i18n.t('components.loadingMore.empty')} ---</Text>
        </View>);
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: '#dedede',
      paddingTop: 20,
      paddingBottom: 20,
    },
    text: {
      textAlign: 'center',
    },
  },
);
