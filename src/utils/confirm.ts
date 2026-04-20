import { Alert, Platform } from 'react-native';

export const confirmAction = async (title: string, message: string) => {
  if (Platform.OS === 'web') {
    return window.confirm(`${title}\n\n${message}`);
  }

  return await new Promise<boolean>((resolve) => {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: 'Continue', style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
};

