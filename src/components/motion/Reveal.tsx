import { useEffect, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, type ViewStyle } from 'react-native';

/** A quiet entrance for editorial modules. Honors reduced-motion and runs once
 * per mount so revisiting a rail never turns into a repeated performance. */
export function Reveal({children,delay=0,style}:{children:ReactNode;delay?:number;style?:ViewStyle}){
  const [opacity]=useState(()=>new Animated.Value(0));
  const [y]=useState(()=>new Animated.Value(14));
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{AccessibilityInfo.isReduceMotionEnabled().then(setReduced).catch(()=>{});},[]);
  useEffect(()=>{if(reduced){opacity.setValue(1);y.setValue(0);return;} Animated.parallel([
    Animated.timing(opacity,{toValue:1,duration:430,delay,useNativeDriver:true}),
    Animated.spring(y,{toValue:0,delay,damping:18,stiffness:150,mass:.8,useNativeDriver:true}),
  ]).start();},[delay,opacity,reduced,y]);
  return <Animated.View style={[style,{opacity,transform:[{translateY:y}]}]}>{children}</Animated.View>;
}
