import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { SearchIcon } from '../../components/layout/icons/MenuIcons';
import { EmptyState, Screen, Text } from '../../components/ui';
import { Input } from '../../components/ui/Input';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { mockHelpArticles } from '../../mock/helpArticles.mock';

const topics = ['Tickets', 'Account', 'Events', 'Restaurants & Places', 'About CultureOwl'];

export function HelpCenterScreen() {
  const theme = useAppTheme(); const { user } = useAuth(); const [query, setQuery] = useState('');
  const filtered = useMemo(() => { const q=query.trim().toLowerCase(); return mockHelpArticles.filter(a=>!q||a.title.toLowerCase().includes(q)||a.summary.toLowerCase().includes(q)); },[query]);
  return <Screen scroll>
    <DetailScreenHeader title="Help Center" />
    <Text variant="title" style={{ marginTop: spacing.md }}>Hi, {user?.firstName ?? 'there'}.</Text><Text variant="heading" style={{ marginBottom: spacing.lg }}>How can we help you?</Text>
    <View style={{ flexDirection:'row',alignItems:'center',gap:spacing.sm,borderWidth:1,borderColor:theme.colors.border,borderRadius:radius.full,paddingHorizontal:spacing.md,marginBottom:spacing.xl }}><SearchIcon color={String(theme.colors.textMuted)} size={18}/><Input placeholder="Search help" value={query} onChangeText={setQuery} style={{flex:1,borderWidth:0,paddingLeft:0}}/></View>
    <Text variant="heading" style={{marginBottom:spacing.md}}>Featured articles</Text>
    {filtered.length ? filtered.slice(0,4).map(a=><Pressable key={a.id} style={{paddingVertical:spacing.md,borderBottomWidth:1,borderBottomColor:theme.colors.border}}><Text variant="body">☷  {a.title}</Text></Pressable>) : <EmptyState title="No matching articles" message="Try another search."/>}
    <Text variant="heading" style={{marginTop:spacing.xl,marginBottom:spacing.md}}>Search by topic</Text>
    {topics.map((topic,i)=><Pressable key={topic} style={{flexDirection:'row',alignItems:'center',padding:spacing.md,marginBottom:spacing.sm,borderRadius:radius.lg,backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.border}}><Text style={{fontSize:20}}>{['🎟','⚙','▣','⌂','ⓘ'][i]}</Text><Text variant="bodyBold" style={{flex:1,marginLeft:spacing.md}}>{topic}</Text><Text>›</Text></Pressable>)}
    <View style={{marginTop:spacing.xl,paddingTop:spacing.lg,borderTopWidth:1,borderTopColor:theme.colors.border,gap:spacing.md}}><Text variant="heading">Need more help?</Text><Pressable onPress={()=>router.push('/help/contact')} style={{padding:spacing.lg,borderRadius:radius.lg,backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.border}}><Text variant="bodyBold">You can contact us  ›</Text></Pressable></View>
  </Screen>;
}
