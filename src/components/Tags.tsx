import * as React from "react";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Count by tag.
 * @typedef {Interface} TagCount
 *
 * @public
 * @interface
 */
export interface TagCount {
  [key: string]: number;
}

const tags: TagCount = entries.reduce(
  (reductor: TagCount, record: Entry): TagCount => {
    for (const tag in record.entry.content.tags) {
      if (hasOwnProperty.call(reductor, tag)) {
        reductor[tag]++;
      } else {
        reductor[tag] = 1;
      }
    }
    return reductor;
  },
  {}
);
