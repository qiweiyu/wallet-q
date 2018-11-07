import { StyleSheet } from 'react-native';
import Colors from 'src/constants/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 10,
  },
  buttonText: {
    color: Colors.textInPrimary,
  },
});