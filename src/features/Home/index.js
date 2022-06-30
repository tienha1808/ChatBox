import React, { useEffect, useState } from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import clsx from 'clsx'
import styles from './Home.module.scss'

function Home() {

  const [ slide, setSlide ] = useState(true)

  const handleSlide = () => {
    setSlide(!slide)
  }

  useEffect(() => {
    const slideAuto = setInterval(() => setSlide(!slide), 7000)

    return () => clearInterval(slideAuto)
  }, [slide])

  return (
      <React.Fragment>
        <div className='container-fluid w-100 h-100 position-relative overflow-hidden'>
          <div className='row'>
            <Page1 active={slide} />
            <Page2 active={slide} />
            <div className={clsx(styles.wrapbarslide, 'd-flex justify-content-evenly p-0')}>
              <button
                className={clsx('col-6 position-relative', {
                  [styles.activeSlideLeft]: !slide,
                })}
                style={{height: '0.8rem', borderRadius: '0'}}
                onClick={handleSlide}
              >
              </button>
              <button
                className={clsx('col-6 position-relative', {
                  [styles.activeSlideRight]: slide,
                })}
                style={{height: '0.8rem', borderRadius: '0'}}
                onClick={handleSlide}
              >
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}

export default Home