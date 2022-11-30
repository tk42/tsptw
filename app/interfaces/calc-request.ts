import Contact from './contact'

type CalcRequest = {
  start_time: string
  start: Contact
  goal: Contact
  waypoints: Contact[]
}

export default CalcRequest
