import { Component } from 'react'

/**
 * Graceful fallback if WebGL / the 3D scene fails to initialize,
 * so the rest of the portfolio always stays usable.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.warn('3D scene unavailable, using fallback:', error, info?.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 60% 30%, rgba(229,9,20,0.28), transparent 60%), radial-gradient(ellipse 50% 45% at 20% 80%, rgba(59,111,255,0.14), transparent 65%), #07070a',
          }}
        />
      )
    }
    return this.props.children
  }
}
