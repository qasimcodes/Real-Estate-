import React from 'react'
import {
    MDBFooter, MDBContainer, MDBInput, MDBCol, MDBRow, MDBBtn
} from 'mdb-react-ui-kit';
const Footer = () => {
    return (
        <MDBFooter className='text-center mt-3' color='white' bgColor='dark'>
            <MDBContainer className='p-4'>
                <section className=''>
                    <form action=''>
                        <MDBRow className='d-flex justify-content-center'>
                            <MDBCol size="auto">
                                <p className='pt-2'> <strong>Sign up for our newsletter</strong>  </p>
                            </MDBCol>
                            <MDBCol md='5' start>
                                <MDBInput style={{ width: "300px" }} contrast type='email' className='mb-2' />
                                <MDBBtn outline color='light' type='submit' className='mb-2'>
                                    Subscribe
                                </MDBBtn>
                            </MDBCol>                         
                        </MDBRow>
                    </form>
                </section>
            </MDBContainer>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <h3>ApnaGhar.com – Buy & Sell or Rent Properties </h3>
                <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
        </MDBFooter>

    )
}

export default Footer
