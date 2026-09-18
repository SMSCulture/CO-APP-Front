import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventHero } from '../../components/events/EventHero';
import { EventOrganizerCard } from '../../components/events/EventOrganizerCard';
import { SimilarEvents } from '../../components/events/SimilarEvents';
import { MapPinIcon } from '../../components/layout/icons/MenuIcons';
import { TicketTabIcon } from '../../components/layout/icons/TabIcons';
import { EventSocialContext } from '../../components/social/EventSocialContext';
import { InviteFriendsSheet } from '../../components/social/InviteFriendsSheet';
import { Button, Card, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { palette, radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { trackEvent } from '../../lib/analytics';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventPrice } from '../../lib/formatPrice';
import { useEvent, useEventsFeed } from '../../queries/events.queries';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { CURRENT_USER_ID, useSocialStore } from '../../store/socialStore';

function Action({ icon, label, active, onPress }: { icon: string; label: string; active?: boolean; onPress: () => void }) {
  const theme = useAppTheme();
  const [scale] = useState(() => new Animated.Value(1));
  const press = async () => {
    onPress();
    if (await AccessibilityInfo.isReduceMotionEnabled()) return;
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.16, damping: 9, stiffness: 250, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, damping: 12, stiffness: 220, useNativeDriver: true }),
    ]).start();
  };
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={press} style={({pressed})=>({flex:1,minWidth:0,alignItems:'center',gap:6,opacity:pressed?.72:1})}>
    <Animated.View style={{transform:[{scale}]}}><View style={{width:46,height:46,borderRadius:23,alignItems:'center',justifyContent:'center',backgroundColor:active?palette.blueLight:theme.colors.chipBackground,borderWidth:active?1:0,borderColor:palette.blue}}><Text variant="heading" color={active?palette.blueDark:theme.colors.text}>{icon}</Text></View></Animated.View>
    <Text variant="caption" style={{fontSize:12}} color={active?palette.blueDark:theme.colors.text}>{label}</Text>
  </Pressable>;
}

function DetailRow({ icon, title, detail, last=false }: { icon: ReactNode; title: string; detail?: string | null; last?: boolean }) {
  const theme=useAppTheme();
  return <View style={{flexDirection:'row',gap:spacing.md,paddingVertical:spacing.lg,borderBottomWidth:last?0:1,borderBottomColor:theme.colors.border}}>
    <View style={{width:42,height:42,borderRadius:14,backgroundColor:palette.blueLight,alignItems:'center',justifyContent:'center'}}>{icon}</View>
    <View style={{flex:1,justifyContent:'center',gap:2}}><Text variant="bodyBold">{title}</Text>{detail?<Text variant="caption" muted>{detail}</Text>:null}</View>
  </View>;
}

export function EventDetailScreen({ eventId }: { eventId: string }) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: event, isLoading, isError, refetch } = useEvent(eventId);
  const { data: feed } = useEventsFeed({});
  const { isFavorite: saved, toggle } = useFavoriteToggle('event', event);
  const [inviteOpen, setInviteOpen] = useState(false);
  const { attendance, toggleGoing } = useSocialStore();
  const going = attendance.some((a) => a.userId === CURRENT_USER_ID && a.eventId === eventId && a.sources.includes('manual'));

  if (isLoading) return <Screen><LoadingState rows={1} /></Screen>;
  if (isError || !event) return <Screen><ErrorState message="We couldn’t load this event." onRetry={() => refetch()} /></Screen>;

  const similar = (feed?.events ?? []).filter((e) => e.id !== event.id).slice(0, 4);
  const dateText=formatDateSlot(event.nextEventDate,event.startDate);
  const priceText=formatEventPrice(event);

  return <View style={{flex:1,backgroundColor:theme.colors.background}}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:144}}>
      <EventHero event={event}/>
      <View style={{paddingHorizontal:spacing.screenX,marginTop:spacing['2xl']+10,gap:spacing.xl}}>
        <View style={{gap:spacing.sm}}>
          <View style={{flexDirection:'row',gap:spacing.sm,flexWrap:'wrap'}}>{event.tags.slice(0,2).map(tag=><View key={tag.id} style={{paddingVertical:5,paddingHorizontal:10,borderRadius:radius.full,backgroundColor:palette.blueLight}}><Text variant="label" color={palette.blueDark}>{tag.name}</Text></View>)}</View>
          <Text variant="display" style={{fontSize:30,lineHeight:37}}>{event.title}</Text>
          <Text muted>{event.venueName ?? event.city} · {event.city}</Text>
        </View>

        <View style={{flexDirection:'row',paddingVertical:spacing.sm}}>
          <Action icon={saved?'♥':'♡'} label={saved?'Saved':'Save'} active={saved} onPress={toggle}/>
          <Action icon={going?'✓':'○'} label="Going" active={going} onPress={()=>toggleGoing(event.id)}/>
          <Action icon="＋" label="Invite" onPress={()=>setInviteOpen(true)}/>
          <Action icon="↗" label="Share" onPress={()=>trackEvent('share_event_placeholder',{eventId:event.id})}/>
        </View>

        <Card style={{paddingVertical:0}}>
          <DetailRow icon={<Text variant="heading">◷</Text>} title={dateText} detail={event.eventDates.length>1?`${event.eventDates.length} dates available`:'Add it to your plans'}/>
          <DetailRow icon={<MapPinIcon color={palette.blueDark} size={21}/>} title={event.virtual?'Online event':(event.venueName??event.city)} detail={event.address}/>
          <DetailRow icon={<TicketTabIcon color={palette.blueDark} size={21}/>} title={priceText} detail={event.free?'No ticket price':'Secure checkout in the app'} last/>
        </Card>

        <Card style={{backgroundColor:palette.blueLight,borderColor:'transparent'}}>
          <View style={{gap:spacing.sm}}><Text variant="heading">Friends going</Text><EventSocialContext eventId={event.id}/><Text variant="caption" muted>{going?'You’re going too. Invite someone to join you.':'See who’s in, then make a plan together.'}</Text><Button label="Invite friends" variant="secondary" onPress={()=>setInviteOpen(true)} style={{marginTop:spacing.xs}}/></View>
        </Card>

        <View style={{gap:spacing.md}}><Text variant="title" style={{fontSize:23}}>About this event</Text><Text style={{lineHeight:26}}>{event.description}</Text></View>

        {!event.virtual?<View style={{gap:spacing.md}}><View><Text variant="title" style={{fontSize:23}}>Venue & location</Text><Text variant="caption" muted style={{marginTop:4}}>Everything you need before you go</Text></View><Card padded={false}>
          <View style={{height:116,backgroundColor:'#dcecf3',alignItems:'center',justifyContent:'center'}}><View style={{width:48,height:48,borderRadius:24,backgroundColor:palette.blue,alignItems:'center',justifyContent:'center',...shadows.card}}><MapPinIcon color="#fff" size={24}/></View><Text variant="caption" color={palette.blueDark} style={{marginTop:8}}>Map preview</Text></View>
          <View style={{padding:spacing.lg,gap:4}}><Text variant="subheading">{event.venueName??event.city}</Text>{event.address?<Text variant="caption" muted>{event.address}</Text>:null}</View>
        </Card></View>:null}

        <View style={{gap:spacing.md}}><Text variant="title" style={{fontSize:23}}>Presented by</Text><EventOrganizerCard event={event}/></View>
        <SimilarEvents events={similar}/>
      </View>
    </ScrollView>

    <View style={{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:spacing.lg,paddingTop:spacing.md,paddingBottom:insets.bottom+spacing.md,backgroundColor:theme.colors.surfaceElevated,borderTopWidth:1,borderTopColor:theme.colors.border,flexDirection:'row',alignItems:'center',gap:spacing.lg,...shadows.raised}}>
      <View style={{minWidth:80}}><Text variant="caption" muted>{event.free?'Admission':'Tickets'}</Text><Text variant="heading">{priceText}</Text></View>
      <Button label={event.free?'Get details':'Get tickets'} fullWidth style={{flex:1}} onPress={()=>{trackEvent('get_tickets_tap',{eventId:event.id});router.push(`/checkout/${event.id}`)}}/>
    </View>
    <InviteFriendsSheet eventId={event.id} visible={inviteOpen} onClose={()=>setInviteOpen(false)}/>
  </View>;
}
