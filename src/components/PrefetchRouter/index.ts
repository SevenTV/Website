import { prefetcher } from "./prefetch";
import { canPrefetch, supportIntersectionObserver, inBrowser } from "./utils";
import { App, defineComponent, DefineComponent } from "vue";

function installRouterPrefetch(app: App, { componentName = "RouterLink", prefetch: enablePrefetch = true } = {}) {
	const observer =
		supportIntersectionObserver &&
		new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					(entry.target as any)._linkPrefetch();
				}
			});
		});

	const requestIdleCallback = window.requestIdleCallback;

	const rl = (app.component("RouterLink") || app.component("router-link"))! as any;

	if (process.env.NODE_ENV === "development" && !rl) {
		console.error(`[vue-router-prefetch] You need to call app.use(VueRouter) before this plugin!`);
	}

	const link = defineComponent({
		// ...rl,
		props: {
			...rl.props,
			prefetch: {
				type: Boolean,
				default: enablePrefetch,
			},
			prefetchFiles: {
				type: Array,
			},
			timeout: {
				type: Number,
				default: 2000,
			},
		},
		setup(props, context) {
			return rl.setup(props, context);
		},
		mounted() {
			if (rl.mounted) {
				rl.mounted();
			}
			if (this.prefetch && observer && canPrefetch) {
				requestIdleCallback(this.observe, { timeout: this.timeout });
			}
		},
		methods: {
			observe() {
				if (observer) {
					observer.observe(this.$el);
				}
				this.$el._linkPrefetch = this.linkPrefetch;
				this._linkObserved = true;
			},
			unobserve() {
				if (this._linkObserved && observer) {
					observer.unobserve(this.$el);
				}
			},
			getRouteComponents(route: any) {
				return route.matched
					.map((record: any) => {
						return Object.values(record.components);
					})
					.flat()
					.filter((Component: any) => {
						return typeof Component === "function" && Component.cid === undefined;
					});
			},
			linkPrefetch() {
				const route = this.$router.resolve(this.to);

				if (route.meta.__prefetched) return;

				route.meta.__prefetched = true;

				if (route.meta.prefetch !== false) {
					// Prefetch route component
					const components = this.getRouteComponents(route);
					for (const Component of components) {
						this.$emit("prefetch", this.to);
						Component(); // eslint-disable-line new-cap
					}
				}

				if (typeof route.meta.prefetch === "function") {
					route.meta.prefetch(route);
				}

				// Prefetch addtional files
				const prefetchFiles = [...(this.prefetchFiles || []), ...((route.meta.prefetchFiles as any[]) || [])];
				if (prefetchFiles.length > 0) {
					for (const file of prefetchFiles) {
						prefetcher(file, false);
					}
				}

				this.unobserve();
			},
		},
	});

	app._context.components[link.name] = link;
}

export {
	prefetcher,
	// Export as `install` to make `app.use(require('vue-router-prefetch'))` work
	installRouterPrefetch as install,
};

export default installRouterPrefetch;
