import ImageColors from 'react-native-image-colors';
import {Image} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

export const getColorFromImage = async (image: string) => {
  const fallbackColor = 'grey';
  const colors = await ImageColors.getColors(image, {
    fallback: fallbackColor, //Si no encuentra que lo deje en grey
  });
  //Detectar en que plataforma me encuentro
  switch (colors.platform) {
    case 'android':
      return colors.dominant ?? fallbackColor;
    case 'ios':
      return colors.background ?? fallbackColor;

    default:
      return fallbackColor;
  }
};
