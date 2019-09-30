import { observable, action } from 'mobx';
import { InteractionManager, NativeModules } from 'react-native';

interface Chapter {
	title: string;
	text: string;
}

export class Store {
	constructor() {
		NativeModules.UserDefaultsManager.getBook().then(json => {
			if (json != null) {
				this.fromString(json);
			}
		});
	}

	@observable title = '';
	@observable chapters: Array<Chapters> = [];

	tempChapter: Chapter = {
		title: '',
		text: '',
	};

	@action
	setTitle(title: string) {
		this.title = title;
		this.commitSave();
	}

	@action
	changeChapter(index: number) {
		// It means we need to add new chapter
		if (index === -1) {
			this.chapters.push({ ...this.tempChapter });
		} else {
			this.chapters[index] = { ...this.tempChapter };
		}
		this.commitSave();
	}

	@action
	deleteChapter(indexToDelete: number) {
		this.chapters = this.chapters.filter((_, index) => index !== indexToDelete);
		this.commitSave();
	}

	changeTempChapterTitle(title: string) {
		this.tempChapter.title = title;
	}

	changeTempChapterText(text: string) {
		this.tempChapter.text = text;
	}

	commitSave() {
		InteractionManager.runAfterInteractions(() => {
			NativeModules.UserDefaultsManager.save(this.toString());
		});
	}

	// Serialization
	toString() {
		return JSON.stringify({
			title: this.title,
			chapters: this.chapters,
		});
	}

	fromString(json) {
		const { title, chapters } = JSON.parse(json);
		this.title = title;
		this.chapters = chapters;
	}

	// Singleton
	private static _instance: Store = null;
	static get sharedInstance(): Store {
		if (this._instance == null) {
			this._instance = new Store();
		}

		return this._instance;
	}
}
