import React from 'react'
import {
  connect,
} from 'react-redux'
import {
  callUserListRedux,
  setUserAuthRedux,
} from 'actions'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {
      setUserAuthRedux,
      callUserListRedux,
    } = this.props
    setUserAuthRedux({
      username: 'aaa',
      password: 'bbb',
    })
    callUserListRedux({
      configService: {
        params: {
          page: 1
        }
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps)
    return null
  }

  render() {
    const {
      userAuthRedux,
      userReduxList,
    } = this.props
    console.log('userAuthRedux', userAuthRedux)
    console.log('userReduxList', userReduxList)
    return (
      userReduxList.data.map((e, i) => {
        return (
          <div
            key={i}
          >
            <img alt=''
              src={e.avatar}
            />
            <span>
              {e.first_name}
            </span>
          </div>
        )
      })
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAuthRedux: state.userAuthRedux,
    userReduxList: state.userReduxList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    callUserListRedux: (data) => dispatch(callUserListRedux(data)),
    setUserAuthRedux: (data) => dispatch(setUserAuthRedux(data)),
  }
}

export const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)