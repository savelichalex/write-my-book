/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]']);

import { NewcomerScreen } from './src/NewcomerScreen';
import { BookOverviewScreen } from './src/BookOverviewScreen';
import { ChapterEditScreen } from './src/ChapterEditScreen';

// Please see src/Navigation.ts and corresponding native modules
// for details about navigation I was used
AppRegistry.registerComponent('NewcomerScreen', () => NewcomerScreen);
AppRegistry.registerComponent('BookOverviewScreen', () => BookOverviewScreen);
AppRegistry.registerComponent('ChapterEditScreen', () => ChapterEditScreen);
