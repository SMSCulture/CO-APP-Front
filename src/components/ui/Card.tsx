import type { ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
interface CardProps {children:ReactNode;onPress?:()=>void;padded?:boolean;style?:ViewStyle;variant?:'glass'|'solid'|'tinted'}
export function Card({children,onPress,padded=true,style,variant='glass'}:CardProps){const theme=useAppTheme();const dark=theme.scheme==='dark';const base:ViewStyle={backgroundColor:variant==='tinted'?(dark?'rgba(61,152,211,.16)':'rgba(227,241,250,.68)'):variant==='solid'?theme.colors.surfaceElevated:(dark?'rgba(39,48,58,.76)':'rgba(255,255,255,.78)'),borderRadius:radius.xl,borderWidth:1,borderColor:dark?'rgba(255,255,255,.12)':'rgba(255,255,255,.9)',overflow:'hidden',...(padded?{padding:spacing.lg}:{}),...shadows.raised,...style};if(onPress)return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed})=>[base,{transform:[{scale:pressed?.985:1}],opacity:pressed?.92:1}]}>{children}</Pressable>;return <View style={base}>{children}</View>}
