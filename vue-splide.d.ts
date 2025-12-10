declare module '@splidejs/vue-splide' {
  import type { ComponentPublicInstance, DefineComponent, Plugin } from 'vue';
  import type { ComponentConstructor, Options, Splide as SplideApi } from '@splidejs/splide';

  export interface SplideProps {
    tag?: string;
    options?: Options;
    extensions?: Record<string, ComponentConstructor>;
    transition?: ComponentConstructor;
    hasTrack?: boolean;
  }

  export interface SplideExposed {
    splide?: SplideApi;
    root?: HTMLElement;
    index: number;
    length: number;
    go(control: number | string): void;
    sync(target: SplideApi): void;
  }

  export type SplideInstance = ComponentPublicInstance<SplideProps, SplideExposed>;

  export interface SplideComponent extends DefineComponent<SplideProps> {
    new (): SplideInstance;
  }

  export const Splide: SplideComponent;
  export const SplideTrack: DefineComponent<Record<string, never>>;
  export const SplideSlide: DefineComponent<Record<string, never>>;
  export const VueSplide: Plugin;

  export type { Options };
  export default VueSplide;
}
