import React, { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

//styles
import * as styles from './styles.module.scss';

function ButtonGroup(props) {
  const { items, stylingMode, defaultSelected, classes } = props;

  //references
  const tabRef = useRef(null);
  const selectorRef = useRef(null);

  //bind styles
  classnames.bind(styles, classes);

  useEffect(() => {
    setTimeout(() => {
      moveSelector();
    }, 250);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (defaultSelected) moveSelector();
    // eslint-disable-next-line
  }, [defaultSelected]);

  const onClick = (e, index) => {
    e.preventDefault();

    Event.preventDoubleClick(e, () => {
      moveSelector(e);
      if (props.onItemClick) props.onItemClick(index);
    });
  };

  const moveSelector = e => {
    let previous = defaultSelected
      ? tabRef.current.querySelector(`button[data-order='${defaultSelected}']`)
      : tabRef.current.querySelector('button');

    let current = e?.target || previous;
    selectorRef.current.style.left = `${current.offsetLeft}px`;
    selectorRef.current.style.width = `${current.offsetWidth}px`;
  };

  return (
    <nav
      ref={tabRef}
      className={classnames(styles.tabs, styles[stylingMode], classes)}>
      <div
        ref={selectorRef}
        className={classnames(styles.selector, 'selector')}
      />
      {items.map((item, index) => (
        <button
          key={shortid.generate()}
          data-order={index}
          onClick={e => onClick(e, index)}>
          {item?.text || item}
        </button>
      ))}
    </nav>
  );
}

ButtonGroup.defaultProps = {
  items: [],
  defaultSelected: null,
  stylingMode: 'contained' || 'outlined'
};

export default memo(ButtonGroup);
