import { Image } from 'expo-image';
import { View } from 'react-native';
import { palette } from '../../design/colors';
import { radius } from '../../design/tokens';
import type { SocialUser } from '../../types/social';
export function FriendAvatars({users,size=28}:{users:SocialUser[];size?:number}){return <View style={{flexDirection:'row'}}>{users.slice(0,3).map((u,i)=><Image key={u.id} source={{uri:u.avatarUrl??undefined}} style={{width:size,height:size,borderRadius:radius.full,marginLeft:i?-8:0,borderWidth:2,borderColor:palette.white,backgroundColor:palette.blueLight}}/>)}</View>}
