import { NativeModules } from 'react-native';

// I'm using native navigation in this project
// A reason why I did it, is that I curious how to use
// native navigation with RN properly.
// RNN is big and buggy, and you need to keep a fork.
// But why we need native navigation in RN anyway?
// The answer is to reduce risks. With native navigation
// we could always implement some screens with increased
// requirements to perfomance completely on native side,
// without need to rewrite whole app
export class Navigation {
	static present(screen: string, props: object, cb: () => void) {
		if (cb != null) {
			NativeModules.NavigationManager.presentWithFeedback(screen, props, cb);
		} else {
			NativeModules.NavigationManager.present(screen, props || {});
		}
	}
}
