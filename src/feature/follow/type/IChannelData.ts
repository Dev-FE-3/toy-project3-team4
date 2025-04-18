interface ChannelData {
  items: {
    snippet: {
      title: string
      thumbnails: {
        default: { url: string }
      }
    }
  }[]
}

export default ChannelData
