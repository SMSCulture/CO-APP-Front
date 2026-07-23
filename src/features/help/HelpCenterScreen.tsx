import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { SearchIcon } from '../../components/layout/icons/MenuIcons';
import { Button, Chip, EmptyState, Screen, Text } from '../../components/ui';
import { Input } from '../../components/ui/Input';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { helpTopics, mockHelpArticles } from '../../mock/helpArticles.mock';

/**
 * Help Center — search + browse-by-topic articles, then a "need more help"
 * hand-off to Contact Us (its own screen with the actual contact channels).
 * No backend for articles yet — same mock-data-first pattern used for
 * Restaurants before a real query existed.
 */
export function HelpCenterScreen() {
  const theme = useAppTheme();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockHelpArticles.filter((a) => {
      const matchesTopic = !topic || a.topic === topic;
      const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
      return matchesTopic && matchesQuery;
    });
  }, [query, topic]);

  return (
    <Screen scroll>
      <DetailScreenHeader title="Help Center" />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: radius.full,
          paddingHorizontal: spacing.md,
          marginBottom: spacing.md,
        }}
      >
        <SearchIcon color={String(theme.colors.textMuted)} size={18} />
        <Input
          placeholder="Search articles"
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search help articles"
          style={{ flex: 1, borderWidth: 0, paddingLeft: 0 }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active={topic === null} onPress={() => setTopic(null)} />
        {helpTopics.map((t) => (
          <Chip key={t} label={t} active={topic === t} onPress={() => setTopic((cur) => (cur === t ? null : t))} />
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState title="No matching articles" message="Try a different search term or topic." />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {filtered.map((article) => (
            <View
              key={article.id}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: radius.lg,
                padding: spacing.md,
                gap: 4,
              }}
            >
              <Text variant="bodyBold">{article.title}</Text>
              <Text variant="caption" muted>
                {article.summary}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View
        style={{
          marginTop: spacing.xl,
          alignItems: 'center',
          gap: spacing.sm,
          paddingVertical: spacing.lg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <Text variant="bodyBold">Didn’t find what you needed?</Text>
        <Text variant="caption" muted style={{ textAlign: 'center' }}>
          Our team is a tap away.
        </Text>
        <Button label="Contact us" onPress={() => router.push('/help/contact')} />
      </View>
    </Screen>
  );
}
