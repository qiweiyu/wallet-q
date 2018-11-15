import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import i18n from 'src/i18n';

export class LoadingMore extends React.Component {
  render() {
    if (this.props.noMore) {
      return (
        <View style={styles.loadingMoreContainer}>
          <Text style={styles.onMoreText}>--- {i18n.t('components.loadingMore.noMore')} ---</Text>
        </View>
      );
    } else if (this.props.onLoading) {
      return (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size={'large'}/>
        </View>);
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create(
  {
    loadingMoreContainer: {
      backgroundColor: '#dedede',
      paddingTop: 20,
    },
    onMoreText: {
      textAlign: 'center',
    },
  },
);
