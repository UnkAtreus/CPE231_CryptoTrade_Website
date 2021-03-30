import React from 'react'

export class MainLayout extends React.Component {
  render() {
    const {
      children,
    } = this.props

    return (
      <React.Fragment>
        <div 
          style={{ 
            position: 'relative', 
            zIndex: '99', 
            backgroundColor: '#000000',
            color: '#FFFFFF'
          }}
        >
          Main Container
        </div>
        {children}
      </React.Fragment>
    )
  }
}
