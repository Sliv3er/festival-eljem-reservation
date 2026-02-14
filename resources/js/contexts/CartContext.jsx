import { createContext, useState, useCallback, useMemo } from 'react';

export const CartContext = createContext(null);

const SERVICE_FEE_RATE = 0.05; // 5% service fee

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('eljem_cart');
        return stored ? JSON.parse(stored) : [];
      } catch { return []; }
    }
    return [];
  });

  const persist = (newItems) => {
    setItems(newItems);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eljem_cart', JSON.stringify(newItems));
    }
  };

  const addItem = useCallback((event, ticketType, quantity, unitPrice) => {
    setItems((prev) => {
      const key = `${event.id}-${ticketType.id}`;
      const existing = prev.find((i) => i.key === key);
      let next;
      if (existing) {
        next = prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        next = [
          ...prev,
          {
            key,
            eventId: event.id,
            eventTitle: event.title,
            eventDate: event.date,
            eventImage: event.image,
            ticketTypeId: ticketType.id,
            ticketTypeName: ticketType.name,
            quantity,
            unitPrice,
          },
        ];
      }
      persist(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) => {
      const next = quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i));
      persist(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.key !== key);
      persist(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0), [items]);
  const serviceFees = useMemo(() => Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100, [subtotal]);
  const total = useMemo(() => subtotal + serviceFees, [subtotal, serviceFees]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    serviceFees,
    total,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
