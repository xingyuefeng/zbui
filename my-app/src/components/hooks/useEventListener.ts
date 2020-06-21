import { MutableRefObject, useEffect, useRef } from 'react';
import useSSR from 'use-ssr'

type Target = HTMLElement | Window;
type Options = { dom?: Dom; capture?: boolean; once?: boolean; passive?: boolean; }
type Dom = Target | (() => Target) | null;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { capture?: boolean; once?: boolean; passive?: boolean; },
): MutableRefObject<T>;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, capture?: boolean; once?: boolean; passive?: boolean; },
): void

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: Options,
) {
  const ref = useRef<T>();
  const savedHandler = useRef<Function>();
  const { isBrowser } = useSSR()

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    if (!isBrowser) return
    const passedInElement = options &&
      (typeof options.dom === 'function' ? options.dom() : options.dom);
    let element = passedInElement ? passedInElement : ref.current || window;
    const isSupported = element.addEventListener;
    if (!isSupported) return;
    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

      isBrowser && element.addEventListener(eventName, eventListener,{
      capture:options?.capture,
      once:options?.once,
      passive:options?.passive
    });

    return () => {
      isBrowser && element.removeEventListener(eventName, eventListener,{
        capture:options?.capture,
      });
    };
  }, [eventName, isBrowser, options]);
  return ref;
}

export default useEventListener;