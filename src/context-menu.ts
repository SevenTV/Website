import type { Component } from "vue";

export type ContextMenuFunction = (ev: MouseEvent, component: Component, props: Record<string, unknown>) => void;
