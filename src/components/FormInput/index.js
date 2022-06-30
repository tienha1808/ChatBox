import clsx from 'clsx'
import React, { useState } from 'react'
import Button from '../Button'
import styles from './FormInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

function FormInput ({
  className,
  classNameInput,
  styleInput,
  style,
  type = 'text',
  placeholder,
  forLabel,
  value,
  setValue,
  onFocus,
  disabled,
  required = false,
  setCondition,
  error = false,
  errorText,
}) {

  const [ formRequired, setFormRequired ] = useState(false)

  const handleForm = e => {
    const valueInput = e.target.value
    if (typeof setValue === 'function') {
      setValue(valueInput)
      if (required) {
        if (!(valueInput.length > 0)) {
          setFormRequired(true)
        } else {
          setFormRequired(false)
        }
      }
      if (typeof setCondition === 'function') return setCondition(valueInput)
    } 
  }

  return (
    <div className={clsx('col-12 position-relative', className)} style={style}>    
      <div className={clsx(styles.formBtn, {
        'invisible': !formRequired && !error,
      })}>
        <Button className='w-100 h-100 d-flex align-items-center' disabled={true} style={{cursor: 'pointer'}}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Button>
      </div>
      <div
        className={clsx('fs-4 px-3 py-2 mb-2 bg-warning', styles.formTextError)}
      >
        {formRequired ? 'Required' : errorText}
      </div>
      <input
        type={type}
        className={clsx('col-12', classNameInput, styles.formInput, {
          'border-danger': formRequired || error,
        })}
        style={styleInput}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleForm}
        onFocus={onFocus}
        onBlur={handleForm}
      
      />
      <label className={styles.formLabel} htmlFor={forLabel}>
        {forLabel}
      </label>
    </div>
  )
}

export default FormInput