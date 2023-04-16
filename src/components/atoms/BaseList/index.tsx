import React, { forwardRef, ReactElement } from 'react';
import { FlatList } from 'react-native';
import { TypeCommon, TypeMomentumScrollEnd, TypeViewStyle } from 'types/Common';

export type RenderItemType = {
  item: ItemList;
  index?: number;
  itemCollapse?: ItemList;
  value?: {
    countLike?: number;
    countMail?: number;
    purchaseHistories?: TypeCommon;
  };
};

export type ItemList = TypeCommon;

type Props = {
  data: TypeCommon;
  renderItem: ({ item, index }: RenderItemType) => ReactElement | null;
  keyExtractor?: (item: ItemList, index: number) => string;
  numColumns?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  contentContainerStyle?: TypeViewStyle;
  testID?: string;
  ListHeaderComponent?: () => ReactElement;
  ListFooterComponent?: () => ReactElement;
  horizontal?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onMomentumScrollEnd?: (e: TypeMomentumScrollEnd) => void;
  style?: TypeViewStyle;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  ref?: TypeCommon;
  onScroll?: (event: TypeCommon) => void;
  inverted?: boolean;
  scrollEventThrottle?: number;
  onRefresh?: () => void;
  refreshing?: boolean;
  onScrollToIndexFailed?: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;
  keyboardDismissMode?: 'on-drag' | 'interactive' | 'none' | undefined;
};

const BaseList = forwardRef<TypeCommon, Props>(
  (
    {
      data,
      renderItem,
      numColumns,
      keyExtractor,
      onEndReached,
      onEndReachedThreshold,
      contentContainerStyle,
      ListHeaderComponent,
      ListFooterComponent,
      horizontal,
      testID,
      pagingEnabled,
      scrollEnabled,
      showsHorizontalScrollIndicator,
      onMomentumScrollEnd,
      style,
      showsVerticalScrollIndicator,
      keyboardShouldPersistTaps,
      onScroll,
      inverted,
      scrollEventThrottle,
      onRefresh,
      refreshing,
      onScrollToIndexFailed,
      keyboardDismissMode,
    },
    ref,
  ): ReactElement => (
    <FlatList
      inverted={inverted}
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      horizontal={horizontal}
      pagingEnabled={pagingEnabled}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      onMomentumScrollEnd={onMomentumScrollEnd}
      style={style}
      testID={testID}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      removeClippedSubviews={false}
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onScrollToIndexFailed={onScrollToIndexFailed}
      keyboardDismissMode={keyboardDismissMode}
    />
  ),
);

export { BaseList };
