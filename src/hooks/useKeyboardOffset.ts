import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardOffset(): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) =>
      setOffset(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () => setOffset(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return offset;
}
