const formatDate = (date: string) => (
  new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' })
)

export default formatDate