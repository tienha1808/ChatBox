import React from 'react'
import Button from '../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function ChangeBtn ({change, setChange, children}) {
  return (
    <div
        className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
            top: '0',
            bottom: '0',
            right: '0',
            left: '0'
        }}
    >
        <div className='col-10 col-lg-6 d-flex flex-column justify-content-center' style={{height: '65px'}}>
                <Button className='d-flex p-0 mb-3'>
                    <Link className='w-100 h-100 p-3' to='/'>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </Button>
                <Button
                    className='p-3'
                    onClick={() => setChange(!change)}
                >
                    {children}
                </Button>
        </div>
    </div>
  )
}

export default ChangeBtn