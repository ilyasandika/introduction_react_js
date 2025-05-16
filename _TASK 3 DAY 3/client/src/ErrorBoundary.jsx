import React from "react"

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    // Update state biar render berikutnya nunjukin UI cadangan
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Catat error ke layanan pelaporan (opsional)
    console.log("Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // UI cadangan kalau ada error
      return <h1>Oops, ada yang salah!</h1>
    }

    // Kalau nggak ada error, render anak-anak seperti biasa
    return this.props.children
  }
}

export default ErrorBoundary