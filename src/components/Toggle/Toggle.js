import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Toggle.module.scss';

function Toggle({ onChange, options, value }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(options.indexOf(value));
  }, [value]);

  const onClick = useCallback(
    ({ currentTarget }) => {
      onChange(currentTarget.innerText);
    },
    [onChange]
  );

  return (
    <div className={styles.root}>
      {options.map((option, i) => {
        const className = cn(styles.option, { [styles.active]: i === activeIndex });
        return (
          <button className={className} key={i} onClick={onClick}>
            {option}
          </button>
        );
      })}
      <div className={styles.indicator} style={{ transform: `translateX(${activeIndex * 100}%)` }} />
    </div>
  );
}

Toggle.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
};

export default Toggle;
