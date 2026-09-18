import { View } from 'react-native';
import { Text } from '../ui';
import { spacing } from '../../design/tokens';
import { CURRENT_USER_ID,otherUserId,useSocialStore } from '../../store/socialStore';
import { FriendAvatars } from './FriendAvatars';
export function useVisibleFriendsGoing(eventId:string){const {attendance,friendships,users}=useSocialStore();const ids=new Set(friendships.filter(f=>f.status==='accepted'&&[f.requesterUserId,f.recipientUserId].includes(CURRENT_USER_ID)).map(otherUserId));return attendance.filter(a=>a.eventId===eventId&&a.visibility==='friends'&&ids.has(a.userId)).map(a=>users.find(u=>u.id===a.userId)!).filter(Boolean)}
export function EventSocialContext({eventId,compact=false}:{eventId:string;compact?:boolean}){const going=useVisibleFriendsGoing(eventId);if(!going.length)return null;return <View style={{flexDirection:'row',alignItems:'center',gap:spacing.sm,marginTop:compact?4:spacing.sm}}><FriendAvatars users={going} size={compact?24:30}/><Text variant={compact?'caption':'bodyBold'} numberOfLines={1} style={{flex:1}}>{going[0].name.split(' ')[0]}{going.length>1?` + ${going.length-1} friend${going.length>2?'s':''}`:''} {going.length===1?'is':'are'} going</Text></View>}
