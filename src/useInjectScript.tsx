import { useEffect, useState } from 'react';

interface InjectorState {
  injectorMap: Record<string, InjectorType>;
  queue: Record<string, ((e: boolean) => void)[]>;
  scriptMap: Record<string, HTMLScriptElement>;
}

let injectorState: InjectorState = {
  injectorMap: {},
  queue: {},
  scriptMap: {},
};

type InjectorType = 'error' | 'init' | 'loaded' | 'loading';

type StateType = {
  error: boolean;
  loaded: boolean;
};

export default function useInjectScript(url: string): [boolean, boolean] {
  const [state, setState] = useState<StateType>({
    error: false,
    loaded: false,
  });

  useEffect(() => {
    if (!injectorState.injectorMap[url]) {
      injectorState.injectorMap[url] = 'init';
    }

    if (injectorState.injectorMap[url] === 'error') {
      setState({
        error: true,
        loaded: true,
      });
      return;
    }

    if (injectorState.injectorMap[url] === 'loaded') {
      setState({
        error: false,
        loaded: true,
      });
      return;
    }

    const onScriptEvent = (error: boolean) => {
      console.log('Script loading', error ? 'failed' : 'succeeded');
      injectorState.queue[url]?.forEach((job) => job(error));

      if (error && injectorState.scriptMap[url]) {
        document.body.removeChild(injectorState.scriptMap[url]);
        injectorState.injectorMap[url] = 'error';
      } else {
        injectorState.injectorMap[url] = 'loaded';
      }
      delete injectorState.scriptMap[url];
    };

    const stateUpdate = (error: boolean) => {
      setState({
        error,
        loaded: true,
      });
    };

    if (!injectorState.scriptMap[url]) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.addEventListener('load', () => onScriptEvent(false));
      script.addEventListener('error', () => onScriptEvent(true));
      injectorState.scriptMap[url] = script;
      injectorState.injectorMap[url] = 'loading';
      document.body.appendChild(script);
    }

    if (!injectorState.queue[url]) {
      injectorState.queue[url] = [stateUpdate];
    } else {
      injectorState.queue[url].push(stateUpdate);
    }

    return () => {
      if (injectorState.scriptMap[url]) {
        injectorState.scriptMap[url].removeEventListener('load', () =>
          onScriptEvent(false)
        );
        injectorState.scriptMap[url].removeEventListener('error', () =>
          onScriptEvent(true)
        );
      }
    };
  }, [url]);

  return [state.error, state.loaded];
}
