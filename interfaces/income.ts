export default interface Income {
  _id: string
  date: Date,
  source: string
  amount: number
  createdAt?: Date
}