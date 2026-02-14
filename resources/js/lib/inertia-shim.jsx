/**
 * Inertia.js shim for standalone dev mode.
 * Provides mock implementations of Head, Link, usePage, and router
 * so components render without a real Inertia server.
 */
import { useEffect, forwardRef } from 'react';

// Head — sets document.title from the title prop or first child text
export function Head({ title, children }) {
  useEffect(() => {
    if (title) {
      document.title = title + " — Festival d'El Jem";
    }
  }, [title]);
  return null;
}

// Link — renders a hash-based <a> for standalone routing
export const Link = forwardRef(function Link(
  { href, method, as, preserveState, preserveScroll, className, children, onClick, ...rest },
  ref
) {
  const hashHref = href ? `#${href.replace(/^\//, '')}` : '#';

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Let the browser handle the hash navigation
  };

  return (
    <a ref={ref} href={hashHref} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});

// usePage — returns mock page props
export function usePage() {
  return {
    props: {
      auth: {
        user: null, // Not logged in by default; change to mock user to test auth state
      },
      ziggy: {
        url: 'http://localhost:3000',
        port: 3000,
      },
    },
    url: window.location.hash.slice(1) || '/',
    component: '',
  };
}

// router — mock Inertia router
export const router = {
  visit: (url, options) => {
    window.location.hash = url.replace(/^\//, '');
  },
  get: (url, data, options) => {
    window.location.hash = url.replace(/^\//, '');
  },
  post: (url, data, options) => {
    console.log('[Inertia shim] POST', url, data);
  },
  put: (url, data, options) => {
    console.log('[Inertia shim] PUT', url, data);
  },
  delete: (url, options) => {
    console.log('[Inertia shim] DELETE', url);
  },
  reload: (options) => {
    console.log('[Inertia shim] reload');
  },
};

// useForm — mock form helper
export function useForm(initialData = {}) {
  const { useState } = require('react');
  const [data, setDataState] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  return {
    data,
    errors,
    processing,
    setData: (key, value) => {
      if (typeof key === 'object') {
        setDataState((prev) => ({ ...prev, ...key }));
      } else {
        setDataState((prev) => ({ ...prev, [key]: value }));
      }
    },
    post: (url, options) => {
      setProcessing(true);
      console.log('[Inertia shim] form.post', url, data);
      setTimeout(() => {
        setProcessing(false);
        options?.onSuccess?.();
      }, 1000);
    },
    put: (url, options) => {
      setProcessing(true);
      console.log('[Inertia shim] form.put', url, data);
      setTimeout(() => {
        setProcessing(false);
        options?.onSuccess?.();
      }, 1000);
    },
    delete: (url, options) => {
      setProcessing(true);
      console.log('[Inertia shim] form.delete', url);
      setTimeout(() => {
        setProcessing(false);
        options?.onSuccess?.();
      }, 1000);
    },
    reset: (...fields) => {
      if (fields.length === 0) {
        setDataState(initialData);
      } else {
        setDataState((prev) => {
          const next = { ...prev };
          fields.forEach((f) => { next[f] = initialData[f]; });
          return next;
        });
      }
      setErrors({});
    },
    clearErrors: (...fields) => {
      if (fields.length === 0) {
        setErrors({});
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          fields.forEach((f) => delete next[f]);
          return next;
        });
      }
    },
  };
}
