import { NativeModules } from 'react-native';

export class Navigation {
	static present(screen: string, props: object, cb: () => void) {
		if (cb != null) {
			NativeModules.NavigationManager.presentWithFeedback(screen, props, cb);
		} else {
			NativeModules.NavigationManager.present(screen, props || {});
		}
	}
}
