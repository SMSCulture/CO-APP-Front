import { Share, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Card, Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';

const inviteCopy = 'Come find our next cultural outing with me on CultureOwl: https://www.cultureowl.com';

export function InviteFriendScreen() {
  const share = () => Share.share({ message: inviteCopy }).catch(() => {});
  return (
    <Screen scroll>
      <DetailScreenHeader title="Invite a friend" fallbackHref="/(tabs)/profile" />
      <View style={{ borderRadius: radius.xl, backgroundColor: palette.blueLight, minHeight: 230, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginHorizontal: -spacing.screenX }}>
        <Text style={{ fontSize: 72 }}>🎁</Text>
        <View style={{ position: 'absolute', top: 26, left: 36 }}><Text color={palette.blue} style={{ fontSize: 28 }}>✦</Text></View>
        <View style={{ position: 'absolute', bottom: 28, right: 42 }}><Text color={palette.orange} style={{ fontSize: 32 }}>✦</Text></View>
      </View>
      <View style={{ paddingTop: spacing.xl, gap: spacing.lg }}>
        <Text variant="title">A friend is a gift</Text>
        <Text variant="body"><Text variant="bodyBold">Earn $X for every friend</Text> you bring to CultureOwl.</Text>
        <Text variant="body">Invite a friend and <Text variant="bodyBold">both of you will receive $X</Text> to use on a future CultureOwl experience.</Text>
        <Text variant="bodyBold" color={palette.blue}>How it works →</Text>
        <Card onPress={share}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <Text style={{ fontSize: 32 }}>◎</Text><View style={{ flex: 1 }}><Text variant="bodyBold">Invite your culture circle</Text><Text variant="caption" muted>Share your invite anywhere</Text></View><Text>›</Text>
          </View>
        </Card>
        <Text variant="caption" muted>Reward amount and eligibility are placeholders pending the friends and referral specification.</Text>
        <Button label="Share the invite" fullWidth onPress={share} />
      </View>
    </Screen>
  );
}
