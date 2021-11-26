/**
 * Portions copyright 2018 Google Inc.
 * Inspired by Gatsby's prefetching logic, with those portions
 * remaining MIT. Additions include support for Fetch API,
 * XHR switching, SaveData and Effective Connection Type checking.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import { inBrowser, canPrefetch } from "./utils";

const preFetched = new Map<string, boolean>();

export const support = (feature: string) => {
	if (!inBrowser) {
		return;
	}
	const link = document.createElement("link");
	return link.relList && link.relList.supports && link.relList.supports(feature);
};

export const linkPrefetchStrategy = (url: string) => {
	return new Promise((resolve, reject) => {
		const link = document.createElement(`link`);
		link.rel = `prefetch`;
		link.href = url;

		link.addEventListener("load", resolve);
		link.addEventListener("error", reject);

		document.head.appendChild(link);
	});
};

export const xhrPrefetchStrategy = (url: string) => {
	return new Promise<void>((resolve, reject) => {
		const req = new XMLHttpRequest();

		req.open(`GET`, url, (req.withCredentials = true));

		req.addEventListener("load", () => {
			req.status === 200 ? resolve() : reject();
		});

		req.send();
	});
};

export const highPriFetchStrategy = (url: string) => {
	// TODO: Investigate using preload for high-priority
	// fetches. May have to sniff file-extension to provide
	// valid 'as' values. In the future, we may be able to
	// use Priority Hints here.
	//
	// As of 2018, fetch() is high-priority in Chrome
	// and medium-priority in Safari.
	return fetch ? fetch(url, { credentials: `include` }) : xhrPrefetchStrategy(url);
};

const supportedPrefetchStrategy = support("prefetch") ? linkPrefetchStrategy : xhrPrefetchStrategy;

export const prefetcher = (url: string, isPriority: boolean) => {
	if (!canPrefetch || preFetched.get(url)) {
		return;
	}

	// Wanna do something on catch()?
	return (isPriority ? highPriFetchStrategy : supportedPrefetchStrategy)(url).then(() => {
		preFetched.set(url, true);
	});
};
