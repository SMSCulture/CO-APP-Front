import { type ReactNode } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

/** Small native reveal for feed modules. Motion clarifies hierarchy and never blocks interaction. */
export function StaggeredReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <Animated.View entering={FadeInDown.duration(280).delay(delay).springify().damping(22)}>{children}</Animated.View>;
}
