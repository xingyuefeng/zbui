import {
  useState,
  useRef,
  useCallback,
  useEffect,
  MutableRefObject,
  DOMAttributes,
  SyntheticEvent,
  useMemo,
  ReactNode
} from "react";
import { createPortal, findDOMNode } from "react-dom";
import useSSR from 'use-ssr'

type HTMLElRef = MutableRefObject<HTMLElement>;

type CustomEvent = {
  // 合成时间
  event?: SyntheticEvent<any, Event>;
  portal: HTMLElRef;
  targetEl: HTMLElRef;
} & SyntheticEvent<any, Event>;

type CustomEventHandler = (customEvent: CustomEvent) => void;

type CustomEventHandlers = {
  [K in keyof DOMAttributes<K>]?: CustomEventHandler;
};

type EventListenerRef = MutableRefObject<
  {
    [K in keyof DOMAttributes<K>]?: (event: SyntheticEvent<any, Event>) => void;
  }
>;

export type UsePortalOptions = {
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  bindTo?: HTMLElement; // attach the portal to this node in the DOM
  isOpen?: boolean;
  onOpen?: CustomEventHandler;
  onClose?: CustomEventHandler;
  onPortalClick?: CustomEventHandler;
} & CustomEventHandlers;

export const errorMessage1 =
  "You must either add a `ref` to the element you are interacting with or pass an `event` to openPortal(e) or togglePortal(e).";

export default function usePortal({
  closeOnOutsideClick = true,
  closeOnEsc = true,
  bindTo, // attach the portal to this node in the DOM
  isOpen: defaultIsOpen = false,
  onOpen,
  onClose,
  onPortalClick,
  ...eventHandlers
}: UsePortalOptions = {}) {
  const { isServer, isBrowser } = useSSR()
  const [isOpen, makeOpen] = useState(defaultIsOpen);
  // we use this ref because `isOpen` is stale for handleOutsideMouseClick

  const open = useRef(isOpen);

  const setOpen = useCallback((v: boolean) => {
    // workaround to not have stale `isOpen` in the handleOutsideMouseClick
    open.current = v;
    makeOpen(v);
  }, []);

  const targetEl = useRef() as HTMLElRef; // this is the element you are clicking/hovering/whatever, to trigger opening the portal
  const portal =  useRef( isBrowser ? document.createElement("div") : null) as HTMLElRef;

  useEffect(() => {
    if (isBrowser && !portal.current) portal.current = document.createElement('div')
  }, [isBrowser, portal])

  const elToMountTo = useMemo(() => {
    if (isServer) return
    return (bindTo && findDOMNode(bindTo)) || document.body;
  }, [bindTo, isServer]);

  const createCustomEvent = (e: any) => {
    if (!e) return { portal, targetEl, event: e };
    const event = e || {};
    if (event.persist) event.persist(); 
    event.portal = portal;
    event.targetEl = targetEl;
    event.event = e;
    const { currentTarget } = e;
    if (!targetEl.current && currentTarget && currentTarget !== document)
      targetEl.current = event.currentTarget;
    return event;
  };

  // this should handle all eventHandlers like onClick, onMouseOver, etc. passed into the config
  // 这应该处理传递到配置中的所有事件处理程序，例如onClick，onMouseOver等。
  const customEventHandlers: CustomEventHandlers = Object.entries(
    eventHandlers
  ).reduce<any>((acc, [handlerName, eventHandler]) => {
    acc[handlerName] = (event?: SyntheticEvent<any, Event>) => {
      if (isServer) return
      eventHandler(createCustomEvent(event));
    };
    return acc;
  }, {});

  const openPortal = useCallback(
    (e: any) => {
      if (isServer) return
      const customEvent = createCustomEvent(e);
      // for some reason, when we don't have the event argument, there
      // is a weird race condition. Would like to see if we can remove
      // setTimeout, but for now this works
      if (targetEl.current == null) {
        setTimeout(() => setOpen(true), 0);
        throw Error(errorMessage1);
      }
      if (onOpen) onOpen(customEvent);
      setOpen(true);
      
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [portal, targetEl, onOpen, setOpen, isServer]
  );

  const closePortal = useCallback((e: any) => {
    if (isServer) return
    const customEvent = createCustomEvent(e)
    if (onClose && open.current) onClose(customEvent)
    if (open.current) setOpen(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, setOpen, isServer])


  const togglePortal = useCallback((e: SyntheticEvent<any, Event>): void => 
    open.current ? closePortal(e) : openPortal(e),
    [closePortal, openPortal]
  )

  const handleKeydown = useCallback((e: KeyboardEvent): void => 
    (e.key === 'Escape' && closeOnEsc) ? closePortal(e) : undefined,
    [closeOnEsc, closePortal]
  ) 

  const handleOutsideMouseClick = useCallback((e: MouseEvent): void => {
    const containsTarget = (target: HTMLElRef) => target.current && target.current.contains ? target.current.contains(e.target as HTMLElement) : null
    if (containsTarget(portal) || (e as any).button !== 0 || !open.current || containsTarget(targetEl)) return
    if (closeOnOutsideClick) closePortal(e)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServer, closePortal, closeOnOutsideClick, portal])

  const handleMouseDown = useCallback((e: MouseEvent): void => {
  
    if (isServer || !(portal.current instanceof HTMLElement)) return
    const customEvent = createCustomEvent(e)
    if (portal.current.contains && portal.current.contains(customEvent.target as HTMLElement) && onPortalClick) onPortalClick(customEvent)
    handleOutsideMouseClick(e)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOutsideMouseClick])


  useEffect(() => {
    if (isServer) return
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('mousedown', handleMouseDown as any)
    if (!(elToMountTo instanceof HTMLElement) || !(portal.current instanceof HTMLElement)) return
    
    const node = portal.current

    elToMountTo.appendChild(portal.current)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('mousedown', handleMouseDown as any)
      elToMountTo.removeChild(node)
    }
  })

  const Portal = useCallback(({ children }: { children: ReactNode }) => {
    if (portal.current != null) return createPortal(children, portal.current)
   
    return null
  }, [portal])

 

  return Object.assign(
    [openPortal, closePortal, open.current, Portal, togglePortal, targetEl, portal],
    {
      isOpen: open.current,
      openPortal,
      ref: targetEl,
      closePortal,
      togglePortal,
      setOpen,
      Portal,
      portalRef: portal,
      ...customEventHandlers,
      bind: { // used if you want to spread all html attributes onto the target element
        ref: targetEl,
        ...customEventHandlers
      }
    }
  )
}
