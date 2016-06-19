/* @flow */
import React from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView,
  Text,
  View
} from 'react-native';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/difference_in_days';

const WIDTH = 320;

function formatDate(date: Date, today: Date): string {
  switch (differenceInDays(date, today)) {
    case 0:
      return 'Today';
    case 1:
      return 'Tomorrow';
    case -1:
      return 'Yesterday';
    default:
      return format(date, 'ddd, MMM D, YYYY');
  }
}

function times(n: number): Array<number> {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
}

type ChangeHandler = (date: Date) => void;

function onScroll(onChange: ChangeHandler, candidates: Array<Date>) {
  return event => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offset / 320);
    // TODO: Call only when the index changes.
    onChange(candidates[index]);
  };
}

type Props = {
  candidates: Array<Date>,
  onChange: ChangeHandler,
  today: Date,
  textStyle: Object
};

export function DateSelector({ candidates, onChange, today, textStyle }: Props) {
  const items = candidates.map((date, i) => (
    <View key={i} style={[styles.item]}>
      <Text style={[styles.text, textStyle]}>{formatDate(date, today)}</Text>
    </View>
  ));
  return <View style={[styles.container]}>
    <ScrollView
      // https://github.com/facebook/react-native/issues/2251
      onMomentumScrollEnd={onScroll(onChange, candidates)}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.scroll]}
      scrollEventThrottle={100}
      alwaysBoundHorizontal={false}
    >
      {items}
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 22
  },
  scroll: {
    width: WIDTH
  }
});