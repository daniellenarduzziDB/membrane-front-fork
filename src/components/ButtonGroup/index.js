import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

//styles
import * as styles from './styles.module.scss';

function ButtonGroup(props) {
  const { items, stylingMode, classes } = props;

  //references
  const tabRef = useRef(null);
  const selectorRef = useRef(null);

  //bind styles
  classnames.bind(styles, classes);

  useEffect(() => {
    setTimeout(() => {
      moveSelector();
    }, 250);

    return () => {};
  }, []);

  const onClick = (e, index) => {
    e.preventDefault();

    Event.preventDoubleClick(e, () => {
      moveSelector(e);

      if (props.onItemClick)
        if (typeof props.onItemClick === 'function') props.onItemClick(index);
    });
  };

  const moveSelector = e => {
    let previous = tabRef.current.querySelector('button');

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
  stylingMode: 'contained' || 'outlined'
};

export default ButtonGroup;
