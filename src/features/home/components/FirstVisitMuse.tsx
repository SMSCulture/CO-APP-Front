import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, View } from 'react-native';
import { palette, radius, shadows, spacing } from '../../../design/tokens';
import { Text } from '../../../components/ui';

const KEY='cultureowl.discoverMuseSeen.v1';
/** A one-time welcome, then it gets out of the way. */
export function FirstVisitMuse(){const [visible,setVisible]=useState(false);const [y]=useState(()=>new Animated.Value(-12));const [opacity]=useState(()=>new Animated.Value(0));
useEffect(()=>{let timer:ReturnType<typeof setTimeout>|undefined;AsyncStorage.getItem(KEY).then(async seen=>{if(seen)return;setVisible(true);await AsyncStorage.setItem(KEY,'1');const reduced=await AccessibilityInfo.isReduceMotionEnabled();if(reduced){opacity.setValue(1);y.setValue(0)}else Animated.parallel([Animated.timing(opacity,{toValue:1,duration:350,useNativeDriver:true}),Animated.spring(y,{toValue:0,damping:18,stiffness:170,useNativeDriver:true})]).start();timer=setTimeout(()=>Animated.timing(opacity,{toValue:0,duration:350,useNativeDriver:true}).start(()=>setVisible(false)),3400)}).catch(()=>{});return()=>{if(timer)clearTimeout(timer)}},[opacity,y]);
if(!visible)return null;return <Animated.View accessibilityLiveRegion="polite" style={{opacity,transform:[{translateY:y}],marginBottom:spacing.lg}}><View style={{flexDirection:'row',gap:spacing.md,alignItems:'center',padding:spacing.md,borderRadius:radius.lg,backgroundColor:palette.blueLight,...shadows.card}}><Text style={{fontSize:22}}>✦</Text><View style={{flex:1}}><Text variant="bodyBold">The Owl has an eye on Miami.</Text><Text variant="caption" muted>Hand-picked culture, without the noise.</Text></View></View></Animated.View>}
