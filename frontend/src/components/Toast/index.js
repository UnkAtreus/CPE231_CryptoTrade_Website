import React from 'react'
import { /*toast as toastify,*/ ToastContainer } from 'react-toastify'
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
//https://www.npmjs.com/package/react-toastify

//import { Offline } from 'react-detect-offline'
//https://www.npmjs.com/package/react-detect-offline

export class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoClose: 5000,
    }
  }

  // internet = {
  //   onChange: (isOnline) => {
  //     if (!isOnline) {
  //       this.setState(
  //         {
  //           autoClose: false,
  //         },
  //         toast.error(MESSAGE.ERROR.INTERNET)
  //       )
  //     } else {
  //       toastify.dismiss()
  //       this.setState({
  //         autoClose: 5000,
  //       })
  //     }
  //   },
  // }

  render() {
    const { autoClose } = this.state
    return (
      <React.Fragment>
        {/* <Offline
          onChange={(e) => {
            this.internet.onChange(e)
          }}
        /> */}
        <ToastContainer
          hideProgressBar
          position='top-center'
          closeButton={false}
          autoClose={autoClose}
        />
      </React.Fragment>
    )
  }
}
